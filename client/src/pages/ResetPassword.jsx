import { FormInput, Logo, SubmitBtn } from "../components";
import { Form, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import axios from "axios";
import { toast } from "react-toastify";

export const resetPasswordAction =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await axios.post(
        `/api/v1/auth/reset-password/${params.id}/${params.token}`,
        data
      );
      queryClient.invalidateQueries(["user"]); //need to invalidate user data
      toast.success("Password reset successful!");
      return redirect("/login");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const ResetPassword = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <FormInput
          type="password"
          name="newPassword"
          labelText="new password"
        />
        <FormInput
          type="password"
          name="confirmNewPassword"
          labelText="confirm new password"
        />
        <SubmitBtn />
      </Form>
    </Wrapper>
  );
};
export default ResetPassword;
