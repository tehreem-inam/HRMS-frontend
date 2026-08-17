import {
  MdDashboard,
  MdBusiness,
  MdPeople,
  MdApartment,
  MdWork,
  MdBadge,
  MdEventAvailable,
  MdFactCheck,
  MdPayments,
  MdSettings,
} from "react-icons/md";

import { ROLE_ACCESS } from "./roles";

export const SIDEBAR_MENU = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: MdDashboard,
    roles: ROLE_ACCESS.ALL,
  },
  {
    title: "Companies",
    path: "/companies",
    icon: MdBusiness,
    roles: ROLE_ACCESS.ADMIN_ONLY,
  },
  {
    title: "HR Managers",
    path: "/hr-managers",
    icon: MdPeople,
    roles: ROLE_ACCESS.ADMIN_AND_OWNER,
  },
  {
    title: "Departments",
    path: "/departments",
    icon: MdApartment,
    roles: ROLE_ACCESS.OWNER_AND_HR,
  },
  {
    title: "Designations",
    path: "/designations",
    icon: MdWork,
    roles: ROLE_ACCESS.OWNER_AND_HR,
  },
  {
    title: "Employees",
    path: "/employees",
    icon: MdBadge,
    roles: ROLE_ACCESS.OWNER_AND_HR,
  },
  {
    title: "Leave",
    path: "/leave",
    icon: MdEventAvailable,
    roles: ROLE_ACCESS.OWNER_AND_HR,
  },
  {
    title: "Attendance",
    path: "/attendance",
    icon: MdFactCheck,
    roles: ROLE_ACCESS.OWNER_AND_HR,
  },
  {
    title: "Payroll",
    path: "/payroll",
    icon: MdPayments,
    roles: ROLE_ACCESS.OWNER_AND_HR,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: MdSettings,
    roles: ROLE_ACCESS.ALL,
  },
];