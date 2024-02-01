import {
  FormInput,
  FormInputSelect,
  SubmitBtn,
  Note,
} from "../components/index";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import dayjs from "dayjs";
import timeZone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(utc);
dayjs.extend(timeZone);
dayjs.extend(advancedFormat);

export const createJobAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await axios.post("/api/v1/jobs", data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job Added");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext();
  const userTimezone = dayjs.tz.guess();
  const maxDate = new Date();
  const relativeMaxDate = dayjs(maxDate).tz(userTimezone).format("YYYY-MM-DD");

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormInput type="text" name="position" />
          <FormInput type="text" name="company" />
          <FormInput
            type="date"
            name="applicationDate"
            labelText="Application Date"
            max={relativeMaxDate}
          />
          <FormInput type="text" name="jobLocation" labelText="Job Location" />
          <FormInputSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={JOB_STATUS.response_pending}
            list={Object.values(JOB_STATUS)}
          />
          <FormInputSelect
            name="jobType"
            labelText="job type"
            defaultValue={JOB_TYPE.full_time}
            list={Object.values(JOB_TYPE)}
          />
          <Note type="text" name="applicationNote" labelText="Note" />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
