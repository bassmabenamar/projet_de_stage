export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mt-4">

        <div className="bg-white p-4 rounded shadow">
          Students: 120
        </div>

        <div className="bg-white p-4 rounded shadow">
          Subjects: 10
        </div>

        <div className="bg-white p-4 rounded shadow">
          Teachers: 8
        </div>

      </div>

    </div>
  );
}