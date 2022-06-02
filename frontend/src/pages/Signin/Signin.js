import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { SIGNIN_USER } from './gql';
import { signinAction } from '../../redux/features/user/user-slice';
import { SigninForm } from '../../components/SigninForm';

const Signin = () => {
  const dispatch = useDispatch();

  const [signin, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      // store the signin token in redux which will also store it in localStorage
      dispatch(signinAction(data.signin.token));
    },
  });

  return <SigninForm signin={signin} loading={loading} error={error} />;
};

export default Signin;
