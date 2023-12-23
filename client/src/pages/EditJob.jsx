import { FormInput, FormInputSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const editJobLoader = async ({ params }) => {
  try {
    const { data } = await axios.get(`/api/v1/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-jobs");
  }
};

export const editJobAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await axios.patch("/api/v1/jobs/:id", data);
    toast.success("Job editted");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.request?.data?.msg);
    return error;
  }
};

const EditJob = () => {
  const { job } = useLoaderData();
  console.log(job);

  return <h1>EditJob</h1>;
};
export default EditJob;
