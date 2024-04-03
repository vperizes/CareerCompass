import React from "react";

//importing icons from react icons
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

const profileLinks = [
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default profileLinks;
