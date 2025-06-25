import { Link } from "react-router";

function Error() {
  return (
    <div className="h-screen w-full flex justify-center flex-col items-center gap-4">
      <h3 className="text-3xl font-semibold">Page Not Found 404</h3>
      <Link to={"/"}>
        <button className="px-6 py-2.5 rounded-md bg-primary font-medium text-white ">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

export default Error;
