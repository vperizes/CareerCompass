import { Form, Link, useSubmit } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormInput, FormInputSelect, SubmitBtn } from ".";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from "../../../utils/constants";

const SearchContainer = () => {
  const submit = useSubmit();
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormInput
            type="search"
            name="search"
            onChange={(event) => {
              submit(event.currentTarget.form);
            }}
          />
          <FormInputSelect
            name="jobStatus"
            labelText="job status"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue="all"
            onChange={(event) => {
              submit(event.currentTarget.form);
            }}
          />
          <FormInputSelect
            name="jobType"
            labelText="job type"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue="all"
            onChange={(event) => {
              submit(event.currentTarget.form);
            }}
          />
          <FormInputSelect
            name="sort"
            list={Object.values(JOB_SORT_BY)}
            defaultValue="newest"
            onChange={(event) => {
              submit(event.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset search values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
