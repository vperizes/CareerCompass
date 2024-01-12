import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const deleteJobAction =
  (queryClient) =>
  async ({ params }) => {
    try {
      await axios.delete(`/api/v1/jobs/${params.id}`);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job deleted");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/dashboard/all-jobs");
  };
