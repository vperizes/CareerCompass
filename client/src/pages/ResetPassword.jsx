import { FormInput, Logo, SubmitBtn } from "../components";
import { Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";

const ResetPassword = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <FormInput type="password" name="new password" />
        <FormInput type="password" name="confirm new password" />
        <SubmitBtn />
      </Form>
    </Wrapper>
  );
};
export default ResetPassword;
