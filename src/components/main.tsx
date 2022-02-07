import Router from 'preact-router';

import LoginForm from './login-form';
import RegisterForm from './register-form';

export default function Main() {
  return (
    <Router>
      <LoginForm path="/" />
      <RegisterForm path="/register" />
    </Router>
  );
}
