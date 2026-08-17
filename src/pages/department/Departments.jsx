import { useEffect, useMemo, useState } from "react";
import {
  HiPlus,
  HiBuildingOffice2,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import usePermission from "../../hooks/usePermission";
import { getDepartments , createDepartment , updateDepartment , changeDepartmentStatus } from "../../store/slices/departmentSlice";

import Search from "../../components/common/Search";
import Table from "../../components/common/Table";
import Loader from "../../components/common/Loader";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";

import DepartmentForm from "./DepartmentForm";


export default function Departments() {
  const dispatch = useDispatch();
const { isHR } = usePermission();

const [isModalOpen, setIsModalOpen] =
  useState(false);
  const [selectedDepartment, setSelectedDepartment] =
  useState(null);
    const {
    departments,
    total,
    isLoading,
    error,
  } = useSelector((state) => state.department);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const filteredDepartments = useMemo(() => {
    const keyword = search.toLowerCase();

    return departments.filter(
      (department) =>
        department.name
          .toLowerCase()
          .includes(keyword) ||
        department.description
          .toLowerCase()
          .includes(keyword)
    );
  }, [departments, search]);

  const activeDepartments =
    departments.filter(
      (department) => department.is_active
    ).length;

  const inactiveDepartments =
    total - activeDepartments;

  const cards = [
    {
      title: "Total Departments",
      value: total,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active",
      value: activeDepartments,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Inactive",
      value: inactiveDepartments,
      color: "bg-red-100 text-red-600",
    },
  ];

  const columns = [
    {
      header: "Department",

      render: (row) => (
        <div>
          <p className="font-semibold">
            {row.name}
          </p>

          <p className="text-sm text-gray-500">
            {row.description}
          </p>
        </div>
      ),
    },

{
  header: "Status",

  render: (row) => (
    <button
      onClick={() =>
        handleStatusChange(row)
      }
    >
      <Badge
        variant={
          row.is_active
            ? "success"
            : "danger"
        }
      >
        {row.is_active
          ? "Active"
          : "Inactive"}
      </Badge>
    </button>
  ),
},

    {
      header: "Actions",

render: (row) => (
  <div className="flex items-center gap-2">
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

    <Link
      to={`/departments/${row.id}`}
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
  </div>
),
    },
  ];
const handleSave = async (data) => {
  try {
    if (selectedDepartment) {
      await dispatch(
        updateDepartment({
          departmentId: selectedDepartment.id,
          departmentData: data,
        })
      ).unwrap();
    } else {
      await dispatch(
        createDepartment(data)
      ).unwrap();
    }

    dispatch(getDepartments());

    setSelectedDepartment(null);
    setIsModalOpen(false);
  } catch (error) {
    console.error(error);
  }
};
const handleEdit = (department) => {
  setSelectedDepartment(department);
  setIsModalOpen(true);
};
const closeModal = () => {
  setSelectedDepartment(null);
  setIsModalOpen(false);
};
const handleStatusChange = async (
  department
) => {
  try {
    await dispatch(
      changeDepartmentStatus({
        departmentId: department.id,
        isActive: !department.is_active,
      })
    ).unwrap();
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Departments
          </h1>

          <p className="mt-2 text-gray-500">
            Manage company departments
          </p>
        </div>

{isHR && (
  <button
onClick={() => {
  setSelectedDepartment(null);
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
    Add Department
  </button>
)}
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border bg-white p-6"
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
              <HiBuildingOffice2 size={24} />
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

      <div className="rounded-2xl border bg-white p-6">
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Search departments..."
        />

        <div className="mt-6">
          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <Table
              columns={columns}
              data={filteredDepartments}
              loading={false}
            />
          )}
        </div>
      </div>
<Modal
  open={isModalOpen}
  onClose={closeModal}
  title={
    selectedDepartment
      ? "Update Department"
      : "Create Department"
  }
  size="md"
>
  <DepartmentForm
    department={selectedDepartment}
    loading={isLoading}
    onSubmit={handleSave}
  />
</Modal>
    </div>
  );
}