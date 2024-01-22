import { Form, Link, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormInput, Logo, SubmitBtn } from "../components";
import axios from "axios";
import { toast } from "react-toastify";

export const loginAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await axios.post("/api/v1/auth/login", data);
      queryClient.invalidateQueries(); //invalidating all queries on login so data from other users is not cached
      toast.success("Login Successful");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Login = () => {
  const navigate = useNavigate();

  const demoUserLogin = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123$",
    };
    try {
      await axios.post("/api/v1/auth/login", data);
      toast.success("Demo started! Test out application");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormInput type="email" name="email" />
        <FormInput type="password" name="password" />
        <p>
          <Link to="/forgot-password" className="member-btn">
            Forgot Password?
          </Link>
        </p>
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={demoUserLogin}>
          Explore the App
        </button>
        <p>
          Not a Memeber?{" "}
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
