import { Link } from "react-router";

function UpgradePlan() {
  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-red-500 text-sm">Please upgrade your plan</h3>{" "}
      <Link to={"/pricing"}>
        <button className="px-4 py-2 rounded-lg bg-primary01 text-white text-sm ">
          Buy Plan
        </button>
      </Link>
    </div>
  );
}

export default UpgradePlan;
