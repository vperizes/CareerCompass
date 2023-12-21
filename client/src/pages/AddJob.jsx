import { FormInput, FormInputSelect } from "../components/index";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const createJobAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.post("api/v1/jobs", data);
    toast.success("Job Added");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormInput type="text" name="position" />
          <FormInput type="text" name="company" />
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
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
