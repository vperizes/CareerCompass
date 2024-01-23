import { Form, Link, useActionData } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormInput, Logo, SubmitBtn } from "../components";
import axios from "axios";
import { toast } from "react-toastify";

export const forgotPasswordAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await axios.post("/api/v1/auth/forgot-password", data);
      toast.success(`An email has been sent to ${data.email}`);
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const ForgotPassword = () => {
  // const data = useActionData();
  // console.log({ data });

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h5>Forgot your password?</h5>
        <p>
          Enter your email address and we'll send you instructions to reset your
          password.
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
export default ForgotPassword;
