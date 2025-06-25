import Swal from "sweetalert2";

export const globalSwal = {
  title: "Are you sure?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#d33",
  cancelButtonColor: "#007570",
  background: "",
  color: "#333333",
  width: "320px",
  backdrop: "rgba(0, 0, 0, 0.2)",
  customClass: {
    popup: "custom-swal  font-poppins",
    title: "font-light text-sm font-poppins",
    content: "text-sm text-gray-600 font-poppins",
    confirmButton: "bg-red-500 hover:bg-red-600 font-poppins !font-normal !text-sm text-white px-4 py-2 rounded-md",
    cancelButton: "bg-gray-200 hover:bg-gray-300 font-poppins !font-normal !text-sm  text-gray-800 px-4 py-2 rounded-md",
  },
}

// export const globalSwal = Swal.mixin();