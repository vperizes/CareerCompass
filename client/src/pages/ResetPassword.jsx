import { Form, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormInput, Logo, SubmitBtn } from "../components";

const ResetPassword = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h5>Forgot your password?</h5>
        <p>
          Enter your email address and we will send you instructions to reset
          your password.
        </p>
        <FormInput type="email" name="email" />
        <SubmitBtn />
        <p>
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default ResetPassword;
