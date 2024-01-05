import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const { data } = useAllJobsContext();
  const { numOfPages, currentPage } = data;

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    //_ indicates were are accessing index if undefined value
    return index + 1;
  });

  return (
    <Wrapper>
      <button className="btn prev-btn">
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-container">
        {pages.map((pgNum) => {
          return (
            <button
              key={pgNum}
              className={`btn page-btn ${pgNum === currentPage && "active"}`}
            >
              {pgNum}
            </button>
          );
        })}
      </div>
      <button className="btn next-btn">
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
