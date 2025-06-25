
import { motion } from 'framer-motion';

const OurServicecard = ({title,svg,description}) => {
  return (
    <motion.div  initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 2 }}
    viewport={{ once: true, amount: 0.3 }} className="py-7 px-5 border border-[#007570] rounded-[16px] bg-[#F8FFFE] cursor-pointer hover:-translate-y-2 duration-300 ease-in-out hover:shadow-lg flex flex-col items-center justify-center  max-w-[400px]">
      <div className="flex justify-center scale-75 md:scale-80 xl:scale-100">
       {svg}
      </div>
      <h4 className="text-xl xl:text-[24px] text-center font-semibold text-[#007570] font-nunito pt-[14px] pb-[6px]">
        {title}
      </h4>
      <p className="xl:text-[18px] font-normal font-nunito text-[#071431] text-center">
        {description}
      </p>
    </motion.div>
  );
};

export default OurServicecard;
