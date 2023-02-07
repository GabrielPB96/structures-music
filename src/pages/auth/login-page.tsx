import Login from "../../components/pure/form/login-form";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div className="auth-page">
      <h1>Login</h1>
      <Link to="/">Back</Link>
      <Login />
    </div>
  );
};

export default LoginPage;
