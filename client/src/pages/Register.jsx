import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormInput } from "../components/index";
import axios from "axios";

export const resgisterAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); //returns an object from an array of arrays
  try {
    await axios.post("/api/v1/auth/register", data); //make req back to server
    return redirect("/login");
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormInput type="text" name="name" defaultValue="Vic" />
        <FormInput
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue="Per"
        />
        <FormInput
          type="text"
          name="location"
          labelText="Location"
          defaultValue="earth"
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
      </Form>
    </Wrapper>
  );
};
export default Register;
