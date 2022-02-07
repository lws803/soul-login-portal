import Router from 'preact-router';
import LoggingIn from './logging-in';

import LoginForm from './login-form';
import RegisterForm from './register-form';

export default function Main() {
  return (
    <Router>
      <LoginForm path="/" />
      <RegisterForm path="/register" />
      <LoggingIn path="/logging-in" />
    </Router>
  );
}
