import {
  FormInput,
  FormInputSelect,
  SubmitBtn,
  Note,
} from "../components/index";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import timeZone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timeZone);

const singleJobQuery = (id) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/v1/jobs/${id}`);
      return data;
    },
  };
};

export const editJobLoader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-jobs");
    }
  };

export const editJobAction =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await axios.patch(`/api/v1/jobs/${params.id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job edited successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const userTimezone = dayjs.tz.guess();
  const maxDate = new Date();
  const relativeMaxDate = dayjs(maxDate).tz(userTimezone).format("YYYY-MM-DD");
  //const maxDate = new Date().toISOString().split("T")[0];

  const {
    data: { job },
  } = useQuery(singleJobQuery(id));

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit job</h4>
        <div className="form-center">
          <FormInput type="text" name="position" defaultValue={job.position} />
          <FormInput type="text" name="company" defaultValue={job.company} />
          <FormInput
            type="date"
            name="applicationDate"
            labelText="Application Date"
            defaultValue={job.applicationDate.split("T")[0]}
            max={relativeMaxDate}
          />
          <FormInput
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={job.jobLocation}
          />
          <FormInputSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.JOB_STATUS}
            list={Object.values(JOB_STATUS)}
          />
          <FormInputSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.JOB_TYPE}
            list={Object.values(JOB_TYPE)}
          />
          <Note
            type="text"
            name="applicationNote"
            labelText="Note"
            defaultValue={job.applicationNote}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
