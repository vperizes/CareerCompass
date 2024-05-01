import { Form, redirect, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormInput, SubmitBtn } from "../components";
import axios from "axios";
import { toast } from "react-toastify";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { TbCameraPlus } from "react-icons/tb";
import { useState } from "react";

export const updateUserAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("avatar");

    if (file && file.size > 5000000) {
      toast.error("image size too large");
      return null;
    }

    try {
      await axios.patch("/api/v1/users/update-user", formData);
      queryClient.invalidateQueries(["user"]); //only invalidate cached user data when updating user -> specified in DashboardLayout.jsx
      toast.success("Profile updated");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return null;
    }
  };

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location, avatar } = user;

  const [previewAvatar, setPreviewAvatar] = useState(avatar);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="imgupdate-center">
          <div>
            {avatar ? (
              <img src={previewAvatar} alt="avatar" className="avatar-img" />
            ) : (
              <GiPlagueDoctorProfile className="avatar-img" />
            )}
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
            <label htmlFor="avatar">
              <TbCameraPlus className="img-update" />
            </label>
          </div>

          <p className="form-label">Select image file (max 0.5 MB)</p>
        </div>
        <div className="form-center">
          <FormInput type="text" name="name" defaultValue={name} />
          <FormInput
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormInput type="email" name="email" defaultValue={email} />
          <FormInput type="text" name="location" defaultValue={location} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
