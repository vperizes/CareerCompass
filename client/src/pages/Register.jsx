import { Form, redirect, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormInput, SubmitBtn } from "../components/index";
import axios from "axios";
import { toast } from "react-toastify";

export const resgisterAction = async ({ request }) => {
  const formData = await request.formData(); //provides interface
  const data = Object.fromEntries(formData); //returns an object from an array of arrays
  try {
    await axios.post("/api/v1/auth/register", data); //make req back to server
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormInput type="text" name="name" />
        <FormInput type="text" name="lastName" labelText="Last Name" />
        <FormInput type="text" name="location" labelText="Location" />
        <FormInput type="email" name="email" />
        <FormInput type="password" name="password" />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
