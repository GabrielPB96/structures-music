import Register from "../../components/pure/form/register-form";
import { Link } from "react-router-dom";
const RegisterPage = () => {
  return (
    <div className="auth-page">
      <h1>Register</h1>
      <Link to="/">Back</Link>
      <Register />
    </div>
  );
};

export default RegisterPage;
