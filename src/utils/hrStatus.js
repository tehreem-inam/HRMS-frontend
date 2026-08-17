export const HR_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  ON_LEAVE: "on_leave",
  TERMINATED: "terminated",
};

export const STATUS_OPTIONS = [
  {
    label: "Active",
    value: HR_STATUS.ACTIVE,
  },
  {
    label: "Inactive",
    value: HR_STATUS.INACTIVE,
  },
  {
    label: "On Leave",
    value: HR_STATUS.ON_LEAVE,
  },
  {
    label: "Terminated",
    value: HR_STATUS.TERMINATED,
  },
];

export const STATUS_COLORS = {
  active: "success",
  inactive: "secondary",
  on_leave: "warning",
  terminated: "danger",
};