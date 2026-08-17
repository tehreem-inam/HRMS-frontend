const stats = [
  {
    title: "Employees",
    value: 245,
  },
  {
    title: "Departments",
    value: 12,
  },
  {
    title: "Leave Requests",
    value: 18,
  },
  {
    title: "Attendance",
    value: "96%",
  },
];

const Dashboard = () => {
  return (
    <>
    
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <p className="text-gray-500">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {item.value}
            </h2>
          </div>
        ))}

      </div>
    </>
  );
};

export default Dashboard;