import { useMemo } from "react";
import { useSelector } from "react-redux";

const usePermission = () => {
  const { user } = useSelector((state) => state.auth);

  const role = useMemo(
    () => user?.role?.name ?? null,
    [user]
  );

  const hasRole = (...roles) => {
    return roles.includes(role);
  };

  const hasAnyRole = (roles = []) => {
    return roles.includes(role);
  };

  return {
    user,
    role,

    hasRole,
    hasAnyRole,

    isSuperAdmin: role === "SUPER_ADMIN",
    isCompanyOwner: role === "COMPANY_OWNER",
    isHR: role === "HR",
  };
};

export default usePermission;