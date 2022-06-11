import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Chat } from './pages/Chat';
import { MessagesAreaOutlet } from './pages/MessagesAreaOutlet';
import { ProtectedRoute } from './components/ProtectedRoute';

const App = () => {
  const user = useSelector((state) => state.user.token);

  return (
    <Routes>
      <Route index={true} element={<Home />} />
      <Route element={<ProtectedRoute isAllowed={Boolean(!user)} />}>
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route path="chat" element={<Chat />}>
          <Route path=":id" element={<MessagesAreaOutlet />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
