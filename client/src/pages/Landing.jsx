import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Logo } from "../components/index";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div>
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Welcome to Career Compass – Your Ultimate Job Search Organizer!{" "}
            <br />
            In the competitive landscape of job hunting, staying organized is
            the key to success. Our user-friendly app helps you keep a
            meticulous record of every position you apply for, the corresponding
            company details, and the current status of your application – all in
            one place.
          </p>
          <Link to="/register" className="btn register-link">
            register
          </Link>
          <Link to="/login" className="btn">
            Login/Demo User
          </Link>
        </div>
        <img src={main} alt="main image" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
