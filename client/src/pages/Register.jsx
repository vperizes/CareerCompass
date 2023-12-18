import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormInput } from "../components/index";
import axios from "axios";
import { toast } from "react-toastify";

export const resgisterAction = async ({ request }) => {
  const formData = await request.formData(); //provides interface
  console.log([...formData.entries()]);
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
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
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
