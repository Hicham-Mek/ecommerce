const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-xl p-6">
    <h3 className="text-gray-500">{title}</h3>

    <p className="text-3xl font-bold mt-3">{value}</p>
  </div>
);

export default StatCard;
