import { useEffect, useMemo, useState } from "react";
import {
  HiPlus,
  HiBuildingOffice2,
  HiPencilSquare,
  HiTrash,
  HiEye,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  changeCompanyStatus,
} from "../../store/slices/companySlice";

import Search from "../../components/common/Search";
import Table from "../../components/common/Table";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";

import CompanyForm from "./CompanyForm";

const Companies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies, isLoading, error } = useSelector((state) => state.company);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [deleteCompanyId, setDeleteCompanyId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);
  const handleCreate = () => {
    setSelectedCompany(null);

    setIsModalOpen(true);
  };
  const handleEdit = (company) => {
    setSelectedCompany(company);

    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedCompany(null);

    setIsModalOpen(false);
  };
  const handleSave = async (data) => {
    try {
      if (selectedCompany) {
        await dispatch(
          updateCompany({
            id: selectedCompany.id,

            data: {
              ...selectedCompany,
              ...data,
            },
          }),
        ).unwrap();
      } else {
        await dispatch(
          createCompany({
            id: 0,

            is_deleted: false,

            ...data,
          }),
        ).unwrap();
      }

      closeModal();

    } catch (error) {
      console.log(error);
    }
  };
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const keyword = search.toLowerCase();

      return (
        company.name.toLowerCase().includes(keyword) ||
        company.email.toLowerCase().includes(keyword)
      );
    });
  }, [companies, search]);

  const totalCompanies = companies.length;
  const activeCompanies = companies.filter(
    (company) => company.is_active,
  ).length;
  const inactiveCompanies = totalCompanies - activeCompanies;


  const handleStatusChange = async (company) => {
    try {
      await dispatch(
        changeCompanyStatus({
          companyId: company.id,
          isActive: !company.is_active,
        }),
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
    const handleDeleteClick = (companyId) => {
    setDeleteCompanyId(companyId);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteCompany(deleteCompanyId)).unwrap();

      setIsDeleteOpen(false);
      setDeleteCompanyId(null);
    } catch (error) {
      console.error(error);
    }
  };
  const cards = [
    {
      title: "Total Companies",
      value: totalCompanies,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active",
      value: activeCompanies,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Inactive",
      value: inactiveCompanies,
      color: "bg-red-100 text-red-600",
    },
  ];

  const columns = [
    {
      header: "Company",

      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <HiBuildingOffice2 size={24} />
          </div>

          <div>
            <p className="font-semibold">{row.name}</p>

            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },

    {
      header: "Status",

      render: (row) => (
        <div className="flex items-center gap-3">
          <span
            className={`
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold
          ${
            row.is_active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
        `}
          >
            {row.is_active ? "Active" : "Inactive"}
          </span>

          <button
            onClick={() => handleStatusChange(row)}
            className={`
          relative
          h-6
          w-11
          rounded-full
          transition
          ${row.is_active ? "bg-green-500" : "bg-gray-300"}
        `}
          >
            <span
              className={`
            absolute
            top-0.5
            left-0.5
            h-5
            w-5
            rounded-full
            bg-white
            transition-transform
            ${row.is_active ? "translate-x-5" : ""}
          `}
            />
          </button>
        </div>
      ),
    },

    {
      header: "Actions",

      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/companies/${row.id}`)}
            className="
        flex items-center gap-2
        rounded-lg
        border
        px-3 py-2
        hover:bg-gray-100
      "
          >
            <HiEye />
            View
          </button>

          <button
            onClick={() => handleEdit(row)}
            className="
        flex items-center gap-2
        rounded-lg
        border
        px-3 py-2
        hover:bg-gray-100
      "
          >
            <HiPencilSquare />
            Edit
          </button>

          <button
            onClick={() => handleDeleteClick(row.id)}
            className="
        flex items-center gap-2
        rounded-lg
        border
        border-red-300
        px-3 py-2
        text-red-600
        hover:bg-red-50
      "
          >
            <HiTrash />
            Delete
          </button>
        </div>
      ),
    },
  ];



  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Companies</h1>

          <p className="mt-2 text-gray-500">Manage all registered companies</p>
        </div>

        <button
          onClick={handleCreate}
          className="
            flex items-center gap-2
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
          Add Company
        </button>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-3">
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
              <HiBuildingOffice2 size={24} />
            </div>

            <h2 className="text-3xl font-bold">{card.value}</h2>

            <p className="text-gray-500">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Table */}

      <div className="rounded-2xl border bg-white p-6">
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Search companies..."
        />

        <div className="mt-6">
          {error && <p className="text-red-500">{error}</p>}

          {isLoading ? (
            <Loader />
          ) : (
            <Table columns={columns} data={filteredCompanies} loading={false} />
          )}
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={selectedCompany ? "Update Company" : "Create Company"}
        size="md"
      >
        <CompanyForm
          company={selectedCompany}
          loading={isLoading}
          onSubmit={handleSave}
        />
      </Modal>
      <ConfirmDialog
        open={isDeleteOpen}
        title="Delete Company"
        message="Are you sure you want to delete this company? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={isLoading}
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteCompanyId(null);
          setIsDeleteOpen(false);
        }}
      />
    </div>
  );
};

export default Companies;
