import { useEffect, useMemo, useState } from "react";
import {
  HiPlus,
  HiBriefcase,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import usePermission from "../../hooks/usePermission";

import {
  getDesignations,
  createDesignation,
  updateDesignation,
} from "../../store/slices/designationSlice";
import { getDepartments } from "../../store/slices/departmentSlice";

import Search from "../../components/common/Search";
import Table from "../../components/common/Table";
import Loader from "../../components/common/Loader";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";

import DesignationForm from "./DesignationForm";

export default function Designations() {
  const dispatch = useDispatch();
  const { isHR } = usePermission();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDesignation, setSelectedDesignation] =
    useState(null);

const {
  designations,
  total,
  isLoading,
  error,
} = useSelector(
  (state) => state.designation
);
  const { departments } = useSelector(
    (state) => state.department
  );

useEffect(() => {
  dispatch(getDesignations());
  dispatch(getDepartments());
}, [dispatch]);

  const departmentMap = useMemo(() => {
  return (departments || []).reduce(
    (acc, department) => {
      acc[department.id] =
        department.name;
      return acc;
    },
    {}
  );
}, [departments]);

const filteredDesignations = useMemo(() => {
  const keyword = search.toLowerCase();

  return designations.filter((designation) => {
    const departmentName =
      departmentMap[
        designation.department_id
      ] || "";

    return (
      designation.title
        .toLowerCase()
        .includes(keyword) ||
      departmentName
        .toLowerCase()
        .includes(keyword)
    );
  });
}, [
  designations,
  departmentMap,
  search,
]);
  const activeDesignations =
    designations.filter(
      (designation) => designation.is_active
    ).length;

 const inactiveDesignations =
  designations.filter(
    (designation) =>
      !designation.is_active
  ).length;
  const cards = [
    {
      title: "Total Designations",
      value: total,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active",
      value: activeDesignations,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Inactive",
      value: inactiveDesignations,
      color: "bg-red-100 text-red-600",
    },
  ];

  const handleSave = async (data) => {
    try {
      if (selectedDesignation) {
        await dispatch(
          updateDesignation({
            designationId: selectedDesignation.id,
            designationData: data,
          })
        ).unwrap();
      } else {
        await dispatch(
          createDesignation(data)
        ).unwrap();
      }

      dispatch(getDesignations());

      setSelectedDesignation(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (designation) => {
    setSelectedDesignation(designation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDesignation(null);
    setIsModalOpen(false);
  };



  const columns = [
    {
      header: "Designation",

      render: (row) => (
        <p className="font-semibold">
          {row.title}
        </p>
      ),
    },

    {
      header: "Department",

      render: (row) => (
        <span>
          {departmentMap[row.department_id] ??
            "-"}
        </span>
      ),
    },

  {
  header: "Status",

  render: (row) => (
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
  ),
},
    {
      header: "Created",

      render: (row) => (
        <span>
          {new Date(
  row.created_at
).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}
        </span>
      ),
    },

    {
      header: "Actions",

      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              handleEdit(row)
            }
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
            to={`/designations/${row.id}`}
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

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Designations
          </h1>

          <p className="mt-2 text-gray-500">
            Manage company designations
          </p>
        </div>

        {isHR && (
          <button
            onClick={() => {
              setSelectedDesignation(null);
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
            Add Designation
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
              <HiBriefcase size={24} />
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
          placeholder="Search designations..."
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
              data={filteredDesignations}
              loading={false}
            />
          )}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={
          selectedDesignation
            ? "Update Designation"
            : "Create Designation"
        }
        size="md"
      >
        <DesignationForm
          designation={selectedDesignation}
          loading={isLoading}
          onSubmit={handleSave}
        />
      </Modal>
    </div>
  );
}