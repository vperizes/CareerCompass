import { useRouteError, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import errorLogo from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  const { status, statusText } = error;
  if (status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={errorLogo} alt="not found" />
          <h3>Ohh! Page not found</h3>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
