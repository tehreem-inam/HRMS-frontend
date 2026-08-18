import { useEffect, useMemo, useState } from "react";
import {
  HiPlus,
  HiUsers,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import usePermission from "../../hooks/usePermission";

import {
  getEmployees, createEmployee , updateEmployeeProfile , getEmployeeById
} from "../../store/slices/employeeSlice";

import Search from "../../components/common/Search";
import Table from "../../components/common/Table";
import Loader from "../../components/common/Loader";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";

import EmployeeForm from "./EmployeeForm";

export default function Employees() {
  const dispatch = useDispatch();

  const { isHR } = usePermission();

  const {
    employees,
    total,
    isLoading,
    error,
  } = useSelector(
    (state) => state.employee
  );
const [isModalOpen, setIsModalOpen] =
  useState(false);
  const [selectedEmployee, setSelectedEmployee] =
  useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const filteredEmployees = useMemo(() => {
    const keyword = search
      .toLowerCase()
      .trim();

    if (!keyword) {
      return employees;
    }

    return employees.filter(
      (employee) => {
        const fullName = [
          employee.first_name,
          employee.last_name,
        ]
          .filter(Boolean)
          .join(" ");

        const department =
          employee.department?.name || "";

        const designation =
          employee.designation?.title || "";

        const managerName = [
          employee.manager?.first_name,
          employee.manager?.last_name,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          fullName
            .toLowerCase()
            .includes(keyword) ||
          employee.employee_code
            ?.toLowerCase()
            .includes(keyword) ||
          department
            .toLowerCase()
            .includes(keyword) ||
          designation
            .toLowerCase()
            .includes(keyword) ||
          managerName
            .toLowerCase()
            .includes(keyword)
        );
      }
    );
  }, [employees, search]);

  const activeEmployees =
    employees.filter(
      (employee) =>
        employee.status === "active"
    ).length;

  const inactiveEmployees =
    employees.filter(
      (employee) =>
        employee.status === "inactive"
    ).length;

  const terminatedEmployees =
    employees.filter(
      (employee) =>
        employee.status === "terminated"
    ).length;
const handleSave = async (data) => {
  try {
    if (selectedEmployee) {
      await dispatch(
        updateEmployeeProfile({
          employeeId: selectedEmployee.id,
          profileData: data,
        })
      ).unwrap();
    } else {
      await dispatch(
        createEmployee(data)
      ).unwrap();
    }

    dispatch(getEmployees());

    setSelectedEmployee(null);
    setIsModalOpen(false);
  } catch (error) {
    console.error(error);
  }
};
const handleEdit = async (employee) => {
  try {
    const employeeDetails = await dispatch(
      getEmployeeById(employee.id)
    ).unwrap();

    setSelectedEmployee(employeeDetails);
    setIsModalOpen(true);
  } catch (error) {
    console.error("Failed to fetch employee:", error);
  }
};
const closeModal = () => {
  setSelectedEmployee(null);
  setIsModalOpen(false);
};
  const cards = [
    {
      title: "Total Employees",
      value: total,
      color:
        "bg-blue-100 text-blue-600",
    },
    {
      title: "Active",
      value: activeEmployees,
      color:
        "bg-green-100 text-green-600",
    },
    {
      title: "Inactive",
      value: inactiveEmployees,
      color:
        "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Terminated",
      value: terminatedEmployees,
      color:
        "bg-red-100 text-red-600",
    },
  ];

  const getEmployeeName = (
    employee
  ) => {
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

  const columns = [
    {
      header: "Employee",

      render: (row) => (
        <div>
          <p className="font-semibold">
            {getEmployeeName(row)}
          </p>

          <p className="text-sm text-gray-500">
            {row.employee_code}
          </p>
        </div>
      ),
    },

    {
      header: "Department",

      render: (row) => (
        <span>
          {row.department?.name ||
            "Not Assigned"}
        </span>
      ),
    },

    {
      header: "Designation",

      render: (row) => (
        <span>
          {row.designation?.title ||
            "Not Assigned"}
        </span>
      ),
    },

    {
      header: "Manager",

      render: (row) => (
        <span>
          {getManagerName(row.manager)}
        </span>
      ),
    },

    {
      header: "Status",

      render: (row) => {
        let variant = "success";

        if (row.status === "inactive") {
          variant = "warning";
        }

        if (row.status === "terminated") {
          variant = "danger";
        }

        return (
          <Badge variant={variant}>
            {row.status
              .charAt(0)
              .toUpperCase() +
              row.status.slice(1)}
          </Badge>
        );
      },
    },

{
  header: "Actions",

  render: (row) => (
    <div className="flex items-center gap-2">
      <Link
        to={`/employees/${row.id}`}
        className="
          rounded-lg
          border
          px-4
          py-2
          hover:bg-gray-100
        "
      >
        View
      </Link>

      {isHR && (
        <button
          onClick={() => handleEdit(row)}
          className="
            rounded-lg
            border
            px-4
            py-2
            hover:bg-gray-100
          "
        >
          Edit
        </button>
      )}
    </div>
  ),
},
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Employees
          </h1>

          <p className="mt-2 text-gray-500">
            Manage company employees
          </p>
        </div>

        {isHR && (
<button
  onClick={() => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  }}
  className="
    flex
    items-center
    gap-2
    rounded-xl
    bg-black
    px-6
    py-3
    font-semibold
    text-white
    hover:bg-gray-900
  "
>
  <HiPlus />
  Add Employee
</button>
        )}
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="
              rounded-2xl
              border
              bg-white
              p-6
            "
          >
            <div
              className={`
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                ${card.color}
              `}
            >
              <HiUsers size={24} />
            </div>

            <h2 className="text-3xl font-bold">
              {card.value}
            </h2>

            <p className="text-gray-500">
              {card.title}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}

      <div
        className="
          rounded-2xl
          border
          bg-white
          p-6
        "
      >
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Search employees..."
        />

        <div className="mt-6">
          {error && (
            <p className="mb-4 text-red-500">
              {error}
            </p>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <Table
              columns={columns}
              data={filteredEmployees}
              loading={false}
            />
          )}
        </div>
      </div>
<Modal
  open={isModalOpen}
  onClose={closeModal}
  title={
    selectedEmployee
      ? "Update Employee"
      : "Create Employee"
  }
  size="md"
>
  <EmployeeForm
    employee={selectedEmployee}
    loading={isLoading}
    onSubmit={handleSave}
  />
</Modal>
    </div>
  );
}