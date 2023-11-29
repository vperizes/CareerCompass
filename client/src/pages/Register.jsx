import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormInput } from "../components/index";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormInput type="text" name="name" defaultValue="Vic" />
        <FormInput
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue="Per"
        />
        <FormInput type="email" name="email" defaultValue="vic@gmail.com" />
        <FormInput type="password" name="password" defaultValue="strongpass" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
