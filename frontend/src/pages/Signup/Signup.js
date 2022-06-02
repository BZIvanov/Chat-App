import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { SIGNUP_USER } from './gql';
import { signinAction } from '../../redux/features/user/user-slice';
import { SignupForm } from '../../components/SignupForm';

const Signup = () => {
  const dispatch = useDispatch();

  const [signup, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      // store the signin token in redux which will also store it in localStorage
      dispatch(signinAction(data.signup.token));
    },
  });

  return <SignupForm signup={signup} loading={loading} error={error} />;
};

export default Signup;
