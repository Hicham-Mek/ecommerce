import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-6xl font-bold">404</h1>

    <p className="text-gray-500 my-4">Page not found.</p>

    <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded">
      Go Home
    </Link>
  </div>
);

export default NotFound;
