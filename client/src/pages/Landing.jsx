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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            mollitia accusantium sapiente, deserunt excepturi quod nesciunt
            ducimus perferendis. Aliquam et at aut asperiores odio consectetur
            quibusdam impedit sunt vero vel!
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
