
import { CrossIcon } from "../../Assets/Images/icon/Icon"
import DataTable from "../Reusablecomponents/DataTable"


function PinnedView({pinnedView, setPinnedView}) {
  return (
    <div
    className={`p-2 md:p-4 z-30 rounded-2xl mr-5 bg-[#81C1B5] absolute left-5 lg:left-[392px] top-5  transition-all duration-1000  ${
        pinnedView ? "translate-x-0" : "-translate-x-[2000px]"
    }`}
  >
    <div
      className=" absolute top-0 right-0 cursor-pointer bg-[#81C1B5] p-2.5 rounded-md rounded-tr-3xl lg:hidden"
      onClick={() => setPinnedView(false)}
    >
      <CrossIcon fill="fill-white" />
    </div>
    <div className="bg-white xl:w-[800px] md:p-8 rounded-2xl">
      <div
        className=" flex justify-end cursor-pointer rounded-md  "
        onClick={() => setPinnedView(false)}
      >
        <CrossIcon />
      </div>
      <div className="mb-5 pt-4 px-4">
        <h3 className="text-[#0D0E10] text-xl md:text-2xl lg:text-3xl font-semibold mb-1">
          Companies
        </h3>
        <p className="md:text-lg lg:text-xl font-medium">
         All of your pinned projects here.
        </p>
      </div>
      <div className="pb-4">
        <DataTable pinnedView={pinnedView} />
      </div>
    </div>
  </div>
  )
}

export default PinnedView