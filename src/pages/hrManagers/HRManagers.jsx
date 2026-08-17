import { useEffect, useMemo, useState } from "react";
import {
  HiPlus,
  HiUsers,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHRManagers , createHRManager ,   changeHRManagerStatus } from "../../store/slices//hrManagerSlice";

import Search from "../../components/common/Search";
import Table from "../../components/common/Table";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";

import HRManagerForm from "./HRManagerForm";


const HRManagers = () => {
  const dispatch = useDispatch();

  const {
    hrManagers,
    total,
    isLoading,
    error,
  } = useSelector((state) => state.hrManager);

  const [search, setSearch] = useState("");

const [isModalOpen, setIsModalOpen] =
  useState(false);
  useEffect(() => {
    dispatch(getHRManagers());
  }, [dispatch]);

  const filteredHRManagers = useMemo(() => {
    const keyword = search.toLowerCase();

    return hrManagers.filter((manager) =>
      manager.first_name
        .toLowerCase()
        .includes(keyword) ||
      manager.email
        .toLowerCase()
        .includes(keyword) ||
      manager.employee_code
        .toLowerCase()
        .includes(keyword)
    );
  }, [hrManagers, search]);

const activeCount = hrManagers.filter(
  (m) => m.status === "active"
).length;

const inactiveCount = hrManagers.filter(
  (m) => m.status === "inactive"
).length;

const onLeaveCount = hrManagers.filter(
  (m) => m.status === "on_leave"
).length;

const terminatedCount = hrManagers.filter(
  (m) => m.status === "terminated"
).length;

const cards = [
  {
    title: "Total HR Managers",
    value: total,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Active",
    value: activeCount,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Inactive",
    value: inactiveCount,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "On Leave",
    value: onLeaveCount,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Terminated",
    value: terminatedCount,
    color: "bg-red-100 text-red-600",
  },
];

  const columns = [
    {
      header: "Employee",

      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <HiUsers size={22} />
          </div>

          <div>
            <p className="font-semibold">
              {row.first_name}
            </p>

            <p className="text-sm text-gray-500">
              {row.employee_code}
            </p>
          </div>
        </div>
      ),
    },

    {
      header: "Email",

      accessor: "email",
    },

    {
      header: "Joining Date",

      accessor: "joining_date",
    },

{
  header: "Status",

  render: (row) => (
    <select
      value={row.status}
      onChange={(e) =>
        handleStatusChange(
          row.employee_id,
          e.target.value
        )
      }
      className="
        rounded-lg
        border
        px-3
        py-2
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    >
      <option value="active">
        Active
      </option>

      <option value="inactive">
        Inactive
      </option>

      <option value="on_leave">
        On Leave
      </option>

      <option value="terminated">
        Terminated
      </option>
    </select>
  ),
},

    {
      header: "Actions",

render: (row) => (
  <Link
    to={`/hr-managers/${row.employee_id}`}
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
),
    },
  ];
const handleCreate = async (data) => {
  try {
    await dispatch(
      createHRManager(data)
    ).unwrap();

    setIsModalOpen(false);

    dispatch(getHRManagers());
  } catch (error) {
    console.error(error);
  }
};
const handleStatusChange = async (
  employeeId,
  status
) => {
  try {
    await dispatch(
      changeHRManagerStatus({
        employeeId,
        status,
      })
    ).unwrap();

    dispatch(getHRManagers());
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
            HR Managers
          </h1>

          <p className="mt-2 text-gray-500">
            Manage company HR Managers
          </p>
        </div>

<button
  onClick={() => setIsModalOpen(true)}
  className="
    flex items-center gap-2
    rounded-xl
    bg-black
    px-6 py-3
    font-semibold
    text-white
    hover:bg-gray-900
  "
>
  <HiPlus />
  Add HR Manager
</button>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

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

      <div className="rounded-2xl border bg-white p-6">

        <Search
          value={search}
          onChange={setSearch}
          placeholder="Search HR Managers..."
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
              data={filteredHRManagers}
              loading={false}
            />
          )}

        </div>

      </div>
<Modal
  open={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Create HR Manager"
  size="md"
>
  <HRManagerForm
    loading={isLoading}
    onSubmit={handleCreate}
  />
</Modal>
    </div>
  );
};

export default HRManagers;