import Loader from "./Loader";
import EmptyState from "./EmptyState";

const Table = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found.",
  rowKey = "id",
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader />
      </div>
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title={emptyMessage}
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="min-w-full">

        <thead className="bg-gray-50">

          <tr>

            {columns.map((column) => (
              <th
                key={column.accessor || column.header}
                className="
                  px-6
                  py-3
                  text-left
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                {column.header}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {data.map((row) => (
            <tr
              key={row[rowKey]}
              className="border-t hover:bg-gray-50"
            >
              {columns.map((column) => (
                <td
                  key={
                    column.accessor ||
                    column.header
                  }
                  className="
                    px-6
                    py-4
                    text-sm
                    text-gray-700
                  "
                >
                  {column.render
                    ? column.render(row)
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
};

export default Table;

// //usage
// const columns = [
//   {
//     header: "Name",
//     accessor: "name",
//   },

//   {
//     header: "Email",
//     accessor: "email",
//   },

//   {
//     header: "Status",

//     render: (row) => (
//       <Badge
//         variant={
//           row.status === "Active"
//             ? "success"
//             : "danger"
//         }
//       >
//         {row.status}
//       </Badge>
//     ),
//   },

//   {
//     header: "Actions",

//     render: (row) => (
//       <button>Edit</button>
//     ),
//   },
// ];

// <>
//   <Table
//     columns={columns}
//     data={companies}
//     loading={loading}
//   />

//   <div className="mt-4">
//     <Pagination
//       currentPage={page}
//       totalPages={totalPages}
//       onPageChange={setPage}
//     />
//   </div>
// </>