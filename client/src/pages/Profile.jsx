import { Form, useNavigation, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormInput } from "../components";

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select image file (max 0.5 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormInput type="text" name="name" defaultValue={name} />
          <FormInput
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormInput type="email" name="email" defaultValue={email} />
          <FormInput type="text" name="location" defaultValue={location} />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
