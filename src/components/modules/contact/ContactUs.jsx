import Container from "../../../Shared/Container"

import WhatsappIcon from '../../../Assets/Images/whatsapp.png'
import { Link } from "react-router" 
import MapImage from '../../../Assets/Images/icon/map_image.jpg'
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import useAxiosSecure from "../../../hooks/api-hooks/useAxiosSecure"
import { Loader } from "lucide-react"
import toast from "react-hot-toast"

function ContactUs() {

    const axiosSecure = useAxiosSecure()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();


      const {mutate, isPending} = useMutation({
        mutationFn: async (contactData) => {
            const response = await axiosSecure.post('/contact/send', contactData);
            return response.data.message
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
      })
    
      const onSubmit = (data) => {
        mutate(data)
      }



  return (
    <div className="max-w-[1320px] mx-auto">
        <Container>
        <h3 className="text-3xl md:text-4xl lg:text-[45px]  text-center  text-primary01 font-medium  pb-14">Contact Us</h3>
        <div className="flex flex-col lg:flex-row  border border-primary01 rounded-lg gap-10  p-8">
            <div className="flex h-[400px] text-white relative flex-1  p-10 rounded-lg  flex-col gap-2 ">
                <div className="relative z-10">
                <h3 className="text-4xl font-semibold pb-8 text-white ">Get in Touch</h3>
                <h4 className="   text-lg flex items-center gap-1"><span className=" font-medium ">Email: </span>Info@conmap.co.uk</h4>
                <h4 className="  flex items-center gap-1 text-lg "><span className=" font-medium ">Phone: </span>07308 660410</h4>
                <h4 className="  flex items-center gap-1 text-lg "><span className=" font-medium ">Tel: </span> 02034 887875</h4>
                <Link to={'https://www.whatsapp.com'} className=" bg-white rounded-full w-fit">
                <div className="w-full cursor-pointer bg-primary01/80 hover:bg-primary01 transition-all duration-200 gap-4  p-1 rounded-lg flex items-center justify-center mt-20">
                    <img className="size-10 cursor-pointer" src={WhatsappIcon} alt="" />
                    <h4 className="text-white font-medium ">Whatsapp</h4>
                </div>
                </Link>
                </div>
                <div className="absolute z-1 top-0 left-0 w-full h-full">
                    <img  className="w-full blur-sm rounded-lg h-full" src={MapImage} alt="" />
                </div>
                <div className="w-full h-full z-[5] bg-black/40 absolute top-0 left-0 rounded-lg">
                </div>
            </div>
            <div className="flex-1 px-0 lg:px-8">
                <form onSubmit={handleSubmit(onSubmit)} action="" className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="">Name</label>
                        <input {...register("name", {required: true})} className="border px-4 py-2.5 rounded-md border-primary01" placeholder="Enter you name" type="text" name="name" id=""  />
                    </div>
                    {errors.name && <span className="text-xs text-red-400 font-light ">This field is required</span>}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="">Email</label>
                        <input {...register("email", {required: true})} className="border px-4 py-2.5 rounded-md border-primary01" placeholder="Enter your email" type="email" name="email" id="" />
                    </div>
                    {errors.email && <span className="text-xs text-red-400 font-light ">This field is required</span>}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="">Message</label>
                        <textarea {...register("message", {required: true})} className="border px-4 py-2.5 h-28 rounded-md border-primary01" placeholder="Write message" name="message" id=""></textarea>
                    </div>
                    {errors.message && <span className="text-xs text-red-400 font-light ">This field is required</span>}
                    <div className=" h-full  ">
                        <button type="submit" className="w-60 flex justify-center py-3 rounded-md bg-primary01 text-white"> {isPending ? <Loader size={24} className="animate-spin "/> : 'Submit'}</button>
                    </div>
                   
                </form>
            </div>
        </div>
        </Container>

        
    </div>
  )
}

export default ContactUs