// PageNotFound Component
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="text-center mt-35">
      <h1 className="text-2xl font-bold ">404 - Page Not Found</h1>
      <p className="mt-5">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-5 text-blue-500">
        Go back to Home
      </Link>
    </div>
  );
}
