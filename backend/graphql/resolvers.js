import { PrismaClient } from '@prisma/client';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SUBSCRIPTIONS } from '../constants/index.js';

const prisma = new PrismaClient();

const pubsub = new PubSub();

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      const { userId } = context;
      if (!userId) {
        throw new ForbiddenError('Access denied');
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      return user;
    },
    users: async (parent, args, context) => {
      const { userId } = context;
      if (!userId) {
        throw new ForbiddenError('Access denied');
      }

      const users = await prisma.user.findMany({
        orderBy: { firstName: 'asc' },
        where: { id: { not: userId } },
      });

      return users;
    },
    userMessages: async (parent, args, context) => {
      const { receiverId } = args;
      const { userId } = context;
      if (!userId) {
        throw new ForbiddenError('Access denied');
      }

      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId },
            { senderId: receiverId, receiverId: userId },
          ],
        },
        orderBy: { createdAt: 'asc' },
      });

      return messages;
    },
  },
  Mutation: {
    signup: async (parent, args, context) => {
      const {
        formData: { firstName, lastName, email, password },
      } = args;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new AuthenticationError('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { firstName, lastName, email, password: hashedPassword },
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      pubsub.publish(SUBSCRIPTIONS.USER_CREATED, {
        createUser: user,
      });

      return { token };
    },
    signin: async (parent, args, context) => {
      const {
        formData: { email, password },
      } = args;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        throw new AuthenticationError('Invalid credentials');
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: existingUser.id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return { token };
    },
    sendMessage: async (parent, args, context) => {
      const { receiverId, text } = args;
      const { userId } = context;
      if (!userId) {
        throw new ForbiddenError('Access denied');
      }

      const message = await prisma.message.create({
        data: { text, receiverId, senderId: userId },
      });

      pubsub.publish(SUBSCRIPTIONS.MESSAGE_POSTED, {
        postMessage: message, // this key should match the key in Subscription
      });

      return message;
    },
  },
  Subscription: {
    createUser: {
      subscribe: () => pubsub.asyncIterator([SUBSCRIPTIONS.USER_CREATED]),
    },
    postMessage: {
      subscribe: () => pubsub.asyncIterator([SUBSCRIPTIONS.MESSAGE_POSTED]),
    },
  },
};

export default resolvers;
