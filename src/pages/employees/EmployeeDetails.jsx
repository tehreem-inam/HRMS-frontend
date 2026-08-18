import { useEffect, useMemo, useState } from "react";
import {
  HiArrowLeft,
  HiUser,
  HiBuildingOffice2,
  HiBriefcase,
  HiUserGroup,
} from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import usePermission from "../../hooks/usePermission";

import {
  getEmployeeById,
  getEmployees,
  assignDepartment,
  assignDesignation,
  assignManager,
  getEmployeeManager,
  getEmployeeSubordinates
} from "../../store/slices/employeeSlice";

import { getDepartments } from "../../store/slices/departmentSlice";
import { getDesignations } from "../../store/slices/designationSlice";

import Badge from "../../components/common/Badge";
import Loader from "../../components/common/Loader";
import Select from "../../components/common/Select";

export default function EmployeeDetails() {
  const { employeeId } = useParams();

  const dispatch = useDispatch();

  const { isHR } = usePermission();

  const {
    selectedEmployee,
    employeeManager,
    subordinates = [],
    totalSubordinates = 0,
    employees = [],
    isLoading,
    error,
  } = useSelector(
    (state) => state.employee
  );

  const {
    departments = [],
  } = useSelector(
    (state) => state.department
  );

  const {
    designations = [],
  } = useSelector(
    (state) => state.designation
  );

  const [
    selectedDepartmentId,
    setSelectedDepartmentId,
  ] = useState("");

  const [
    selectedDesignationId,
    setSelectedDesignationId,
  ] = useState("");

  const [
    selectedManagerId,
    setSelectedManagerId,
  ] = useState("");

  /*
   * Load employee details,
   * employees,
   * departments,
   * and designations.
   */
useEffect(() => {
  dispatch(
    getEmployeeById(employeeId)
  );

  dispatch(
    getEmployeeManager(employeeId)
  );

  dispatch(
    getEmployees()
  );

  dispatch(
    getDepartments()
  );

  dispatch(
    getDesignations()
  );
  dispatch(
  getEmployeeSubordinates(employeeId)
);
}, [
  dispatch,
  employeeId,
]);
  /*
   * Set current assignments
   * whenever employee details change.
   */
  useEffect(() => {
    if (!selectedEmployee) {
      return;
    }

    setSelectedDepartmentId(
      selectedEmployee.department?.id
        ? String(
            selectedEmployee.department.id
          )
        : ""
    );

    setSelectedDesignationId(
      selectedEmployee.designation?.id
        ? String(
            selectedEmployee.designation.id
          )
        : ""
    );

    setSelectedManagerId(
      selectedEmployee.manager?.id
        ? String(
            selectedEmployee.manager.id
          )
        : ""
    );
  }, [selectedEmployee]);

  /*
   * Only designations belonging
   * to the selected department.
   */
  const availableDesignations =
    useMemo(() => {
      if (!selectedDepartmentId) {
        return [];
      }

      return designations.filter(
        (designation) => {
          /*
           * Depending on your designation
           * API response, department can be
           * represented in different ways.
           */

          const departmentId =
            designation.department?.id ??
            designation.department_id;

          return (
            String(departmentId) ===
            String(
              selectedDepartmentId
            )
          );
        }
      );
    }, [
      designations,
      selectedDepartmentId,
    ]);

  /*
   * Only active employees can be
   * selected as managers.
   *
   * Current employee cannot be
   * assigned as their own manager.
   */
  const availableManagers =
    useMemo(() => {
      return employees.filter(
        (employee) =>
          employee.status ===
            "active" &&
          String(employee.id) !==
            String(employeeId)
      );
    }, [
      employees,
      employeeId,
    ]);

  const getEmployeeName = (
    employee
  ) => {
    if (!employee) {
      return "Unknown";
    }

    return [
      employee.first_name,
      employee.last_name,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const getManagerName = (
    manager
  ) => {
    if (!manager) {
      return "Not Assigned";
    }

    return [
      manager.first_name,
      manager.last_name,
    ]
      .filter(Boolean)
      .join(" ");
  };

  /*
   * Department assignment
   */
  const handleDepartmentAssignment =
    async () => {
      if (!selectedDepartmentId) {
        return;
      }

      try {
        await dispatch(
          assignDepartment({
            employeeId,
            departmentId:
              Number(
                selectedDepartmentId
              ),
          })
        ).unwrap();

        /*
         * Department changed, therefore
         * currently selected designation
         * may no longer be valid.
         */
        setSelectedDesignationId("");

        await dispatch(
          getEmployeeById(employeeId)
        ).unwrap();

        await dispatch(
          getEmployees()
        ).unwrap();
      } catch (error) {
        console.error(
          "Failed to assign department:",
          error
        );
      }
    };

  /*
   * Designation assignment
   */
  const handleDesignationAssignment =
    async () => {
      if (
        !selectedDesignationId ||
        !selectedDepartmentId
      ) {
        return;
      }

      /*
       * Extra frontend protection:
       * make sure the selected designation
       * actually belongs to the selected
       * department.
       */
      const designationExists =
        availableDesignations.some(
          (designation) =>
            String(designation.id) ===
            String(
              selectedDesignationId
            )
        );

      if (!designationExists) {
        return;
      }

      try {
        await dispatch(
          assignDesignation({
            employeeId,
            designationId:
              Number(
                selectedDesignationId
              ),
          })
        ).unwrap();

        await dispatch(
          getEmployeeById(employeeId)
        ).unwrap();

        await dispatch(
          getEmployees()
        ).unwrap();
      } catch (error) {
        console.error(
          "Failed to assign designation:",
          error
        );
      }
    };

  /*
   * Manager assignment
   */
const handleManagerAssignment = async () => {
  if (!selectedManagerId) {
    return;
  }

  try {
    await dispatch(
      assignManager({
        employeeId: Number(employeeId),
        managerId: Number(selectedManagerId),
      })
    ).unwrap();

    // Refresh employee details
    await dispatch(
      getEmployeeById(employeeId)
    ).unwrap();

    // Refresh manager information
    await dispatch(
      getEmployeeManager(employeeId)
    ).unwrap();

    // Refresh employee list
    await dispatch(
      getEmployees()
    ).unwrap();

    // Refresh subordinates because
    // manager relationships have changed
    await dispatch(
      getEmployeeSubordinates(employeeId)
    ).unwrap();

    // Clear selection after successful assignment
    setSelectedManagerId("");
  } catch (error) {
    console.error(
      "Failed to assign/change manager:",
      error
    );
  }
};

  if (isLoading && !selectedEmployee) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-600">
          {error}
        </p>
      </div>
    );
  }

  if (!selectedEmployee) {
    return null;
  }

  let statusVariant = "success";

  if (
    selectedEmployee.status ===
    "inactive"
  ) {
    statusVariant = "warning";
  }

  if (
    selectedEmployee.status ===
    "terminated"
  ) {
    statusVariant = "danger";
  }

  return (
    <div className="space-y-8">

      {/* Page Header */}

 <div>

        <Link
          to="/employees"
          className="
            mb-4
            inline-flex
            items-center
            gap-2
            text-gray-600
            hover:text-black
          "
        >
          <HiArrowLeft />

          Back to Employees
        </Link>

        <div
          className="
            flex
            flex-col
            justify-between
            gap-5
            md:flex-row
            md:items-center
          "
        >

          <div className="flex items-center gap-5">

            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-2xl
                bg-blue-100
                text-blue-600
              "
            >
              <HiUser size={42} />
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {getEmployeeName(
                  selectedEmployee
                )}
              </h1>

              <p className="mt-1 text-gray-500">
                {
                  selectedEmployee.employee_code
                }
              </p>

            </div>

          </div>

          {isHR && (
            <button
              onClick={() =>
                setIsEditModalOpen(true)
              }
              className="
                rounded-xl
                bg-black
                px-6
                py-3
                font-semibold
                text-white
                hover:bg-gray-900
              "
            >
              Edit Employee
            </button>
          )}

        </div>

      </div>

      {/* Employee Header Card */}
{/* 
      <div className="rounded-2xl border bg-white p-8">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-5">

            <div
              className="
                flex
                h-20
                w-20
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-blue-100
                text-blue-600
              "
            >
              <HiUser size={40} />
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                {getEmployeeName(
                  selectedEmployee
                )}
              </h2>

              <p className="mt-1 text-gray-500">
                {
                  selectedEmployee.employee_code
                }
              </p>

            </div>

          </div>

          <Badge
            variant={statusVariant}
          >
            {selectedEmployee.status
              ?.charAt(0)
              .toUpperCase() +
              selectedEmployee.status?.slice(
                1
              )}
          </Badge>

        </div>

      </div> */}

      {/* Basic Information */}

      <div className="rounded-2xl border bg-white p-8">

        <div className="mb-6 flex items-center gap-3">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-blue-100
              text-blue-600
            "
          >
            <HiUser size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Personal Information
            </h2>

            <p className="text-sm text-gray-500">
              Employee personal and employment information
            </p>
          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Employee Code
            </p>

            <p className="mt-1 font-semibold">
              {
                selectedEmployee.employee_code
              }
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              First Name
            </p>

            <p className="mt-1 font-semibold">
              {
                selectedEmployee.first_name ||
                "Not Provided"
              }
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Last Name
            </p>

            <p className="mt-1 font-semibold">
              {
                selectedEmployee.last_name ||
                "Not Provided"
              }
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Gender
            </p>

            <p className="mt-1 font-semibold capitalize">
              {
                selectedEmployee.gender ||
                "Not Provided"
              }
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Date of Birth
            </p>

            <p className="mt-1 font-semibold">
              {
                selectedEmployee.date_of_birth ||
                "Not Provided"
              }
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Joining Date
            </p>

            <p className="mt-1 font-semibold">
              {
                selectedEmployee.joining_date ||
                "Not Provided"
              }
            </p>
          </div>

          <div className="rounded-xl border p-5 md:col-span-2 lg:col-span-3">
            <p className="text-sm text-gray-500">
              Employment Type
            </p>

            <p className="mt-1 font-semibold capitalize">
              {
                selectedEmployee.employment_type
                  ? selectedEmployee.employment_type.replace(
                      "_",
                      " "
                    )
                  : "Not Provided"
              }
            </p>
          </div>

        </div>

      </div>

      {/* Organization */}

      <div className="rounded-2xl border bg-white p-8">

        <div className="mb-6">

          <h2 className="text-xl font-bold">
            Organization
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage department, designation and manager assignments
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {/* Department */}

          <div className="rounded-xl border p-5">

            <div className="mb-4 flex items-center gap-3">

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  text-blue-600
                "
              >
                <HiBuildingOffice2
                  size={22}
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Department
                </p>

                <p className="font-semibold">
                  {
                    selectedEmployee.department
                      ?.name ||
                    "Not Assigned"
                  }
                </p>
              </div>

            </div>

            {isHR && (
              <div className="space-y-3">

                <Select
                  value={
                    selectedDepartmentId
                  }
                  onChange={(e) => {
                    setSelectedDepartmentId(
                      e.target.value
                    );

                    /*
                     * Clear designation whenever
                     * department changes because
                     * designation must belong to
                     * selected department.
                     */
                    setSelectedDesignationId(
                      ""
                    );
                  }}
                >
                  <option value="">
                    Select Department
                  </option>

                  {departments.map(
                    (department) => (
                      <option
                        key={
                          department.id
                        }
                        value={
                          department.id
                        }
                      >
                        {department.name}
                      </option>
                    )
                  )}
                </Select>

                <button
                  type="button"
                  onClick={
                    handleDepartmentAssignment
                  }
                  disabled={
                    isLoading ||
                    !selectedDepartmentId
                  }
                  className="
                    w-full
                    rounded-lg
                    bg-black
                    px-4
                    py-2
                    font-semibold
                    text-white
                    hover:bg-gray-900
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {isLoading
                    ? "Assigning..."
                    : selectedEmployee
                        .department
                    ? "Change Department"
                    : "Assign Department"}
                </button>

              </div>
            )}

          </div>

          {/* Designation */}

          <div className="rounded-xl border p-5">

            <div className="mb-4 flex items-center gap-3">

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-100
                  text-purple-600
                "
              >
                <HiBriefcase
                  size={22}
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Designation
                </p>

                <p className="font-semibold">
                  {
                    selectedEmployee
                      .designation?.title ||
                    "Not Assigned"
                  }
                </p>
              </div>

            </div>

            {isHR && (
              <div className="space-y-3">

                <Select
                  value={
                    selectedDesignationId
                  }
                  onChange={(e) =>
                    setSelectedDesignationId(
                      e.target.value
                    )
                  }
                  disabled={
                    !selectedDepartmentId
                  }
                >
                  <option value="">
                    {selectedDepartmentId
                      ? "Select Designation"
                      : "Select Department First"}
                  </option>

                  {availableDesignations.map(
                    (designation) => (
                      <option
                        key={
                          designation.id
                        }
                        value={
                          designation.id
                        }
                      >
                        {
                          designation.title
                        }
                      </option>
                    )
                  )}
                </Select>

                <button
                  type="button"
                  onClick={
                    handleDesignationAssignment
                  }
                  disabled={
                    isLoading ||
                    !selectedDepartmentId ||
                    !selectedDesignationId
                  }
                  className="
                    w-full
                    rounded-lg
                    bg-black
                    px-4
                    py-2
                    font-semibold
                    text-white
                    hover:bg-gray-900
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {isLoading
                    ? "Assigning..."
                    : selectedEmployee
                        .designation
                    ? "Change Designation"
                    : "Assign Designation"}
                </button>

              </div>
            )}

          </div>

          {/* Manager */}

{/* Manager */}

<div className="rounded-xl border p-5">

  <div className="mb-5 flex items-center gap-3">

    <div
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        bg-green-100
        text-green-600
      "
    >
      <HiUserGroup size={22} />
    </div>

    <div>
      <p className="text-sm text-gray-500">
        Manager
      </p>

      <p className="font-semibold">
        {employeeManager
          ? getManagerName(employeeManager)
          : "Not Assigned"}
      </p>
    </div>

  </div>

  {employeeManager && (
    <div className="mb-4 space-y-3">

      <div className="rounded-lg bg-gray-50 p-3">

        <p className="text-xs text-gray-500">
          Manager Name
        </p>

        <p className="mt-1 font-medium">
          {getManagerName(
            employeeManager
          )}
        </p>

      </div>

      <div className="rounded-lg bg-gray-50 p-3">

        <p className="text-xs text-gray-500">
          Employee Code
        </p>

        <p className="mt-1 font-medium">
          {
            employeeManager.employee_code
          }
        </p>

      </div>

      <Link
        to={`/employees/${employeeManager.id}`}
        className="
          block
          w-full
          rounded-lg
          border
          px-4
          py-2
          text-center
          font-medium
          hover:bg-gray-100
        "
      >
        View Manager Details
      </Link>

    </div>
  )}

  {isHR && (
    <div className="space-y-3">

      <Select
        value={selectedManagerId}
        onChange={(e) =>
          setSelectedManagerId(
            e.target.value
          )
        }
      >
        <option value="">
          {employeeManager
            ? "Select New Manager"
            : "Select Manager"}
        </option>

        {availableManagers.map(
          (manager) => (
            <option
              key={manager.id}
              value={manager.id}
            >
              {getEmployeeName(manager)} (
              {manager.employee_code})
            </option>
          )
        )}
      </Select>

      <button
        type="button"
        onClick={
          handleManagerAssignment
        }
        disabled={
          isLoading ||
          !selectedManagerId
        }
        className="
          w-full
          rounded-lg
          bg-black
          px-4
          py-2
          font-semibold
          text-white
          hover:bg-gray-900
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isLoading
          ? "Assigning..."
          : employeeManager
          ? "Change Manager"
          : "Assign Manager"}
      </button>

    </div>
  )}

</div>

        </div>

      </div>
      {/* Subordinates */}

      <div className="rounded-2xl border bg-white p-8">

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-green-100
                text-green-600
              "
            >
              <HiUserGroup size={22} />
            </div>

            <div>

              <h2 className="text-xl font-bold">
                Subordinates
              </h2>

              <p className="text-sm text-gray-500">
                Employees reporting directly to this employee
              </p>

            </div>

          </div>

          <div
            className="
              flex
              h-10
              min-w-10
              items-center
              justify-center
              rounded-xl
              bg-gray-100
              px-3
              font-semibold
              text-gray-700
            "
          >
            {totalSubordinates}
          </div>

        </div>

        {totalSubordinates === 0 ? (

          <div
            className="
              rounded-xl
              border
              border-dashed
              bg-gray-50
              p-8
              text-center
            "
          >

            <div
              className="
                mx-auto
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-gray-100
                text-gray-400
              "
            >
              <HiUserGroup size={28} />
            </div>

            <h3 className="font-semibold text-gray-700">
              No Subordinates
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              No employees are currently reporting to this employee.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b text-left">

                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                    Employee
                  </th>

                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                    Employee Code
                  </th>

                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {subordinates.map(
                  (subordinate) => {

                    let subordinateStatusVariant =
                      "success";

                    if (
                      subordinate.status ===
                      "inactive"
                    ) {
                      subordinateStatusVariant =
                        "warning";
                    }

                    if (
                      subordinate.status ===
                      "terminated"
                    ) {
                      subordinateStatusVariant =
                        "danger";
                    }

                    return (
                      <tr
                        key={
                          subordinate.id
                        }
                        className="
                          border-b
                          last:border-b-0
                          hover:bg-gray-50
                        "
                      >

                        {/* Employee */}

                        <td className="px-4 py-4">

                          <div className="flex items-center gap-3">

                            <div
                              className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-100
                                text-blue-600
                              "
                            >
                              <HiUser
                                size={20}
                              />
                            </div>

                            <div>

                              <p className="font-semibold">
                                {getEmployeeName(
                                  subordinate
                                )}
                              </p>

                              <p className="text-sm text-gray-500">
                                Employee
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Employee Code */}

                        <td className="px-4 py-4">

                          <span className="font-medium">
                            {
                              subordinate.employee_code
                            }
                          </span>

                        </td>

                        {/* Status */}

                        <td className="px-4 py-4">

                          <Badge
                            variant={
                              subordinateStatusVariant
                            }
                          >
                            {subordinate.status
                              ?.charAt(0)
                              .toUpperCase() +
                              subordinate.status?.slice(
                                1
                              )}
                          </Badge>

                        </td>

                        {/* Action */}

                        <td className="px-4 py-4 text-right">

                          <Link
                            to={`/employees/${subordinate.id}`}
                            className="
                              inline-flex
                              rounded-lg
                              border
                              px-4
                              py-2
                              text-sm
                              font-medium
                              hover:bg-gray-100
                            "
                          >
                            View Details
                          </Link>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>
      {/* Current Status */}

      <div className="rounded-2xl border bg-white p-8">

        <h2 className="mb-5 text-xl font-bold">
          Employment Status
        </h2>

        <div className="flex items-center gap-4">

          <Badge
            variant={statusVariant}
          >
            {selectedEmployee.status
              ?.charAt(0)
              .toUpperCase() +
              selectedEmployee.status?.slice(
                1
              )}
          </Badge>

          <span className="text-sm text-gray-500">
            Current employee status
          </span>

        </div>

      </div>

    </div>
  );
}