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

  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pgNum) => {
    const searchParams = new URLSearchParams(search); //get back instance
    searchParams.set("page", pgNum); //add page query to returned instance
    navigate(`${pathname}?${searchParams.toString()}`); //navigate to instance + page query
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPg = currentPage - 1;
          if (prevPg < 1) prevPg = numOfPages;
          handlePageChange(prevPg);
        }}
      >
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-container">
        {pages.map((pgNum) => {
          return (
            <button
              key={pgNum}
              className={`btn page-btn ${pgNum === currentPage && "active"}`}
              onClick={() => {
                handlePageChange(pgNum);
              }}
            >
              {pgNum}
            </button>
          );
        })}
      </div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPg = currentPage + 1;
          if (nextPg > numOfPages) nextPg = 1;
          handlePageChange(nextPg);
        }}
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
