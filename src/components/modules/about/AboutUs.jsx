import Container from "../../../Shared/Container";
import ReactHtmlParser from 'react-html-parser';
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/api-hooks/useAxiosCommon";
function AboutUs() {
  const axiosCommon = useAxiosCommon();

  const { data: aboutData = [] } = useQuery({
    queryKey: ["about-us"],
    queryFn: async () => {
      const result = await axiosCommon.get("/about-us");
      return result?.data?.data;
    },
  });

  console.log("about-us", aboutData);

  return (
    <div className="lg:py-24 py-10 max-w-[1340px] mx-auto">
      <Container>
        <div>
          <h3 className="text-primary01 pb-16 text-center text-3xl md:text-4xl lg:text-[45px] font-medium">
            About Us
          </h3>
          <div className="flex flex-col gap-4 lg:gap-8">
            {aboutData.map((  about, index) => (
              <motion.div
                key={about.id}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex bg-white p-6 rounded-lg gap-4"
              >
                <div>
                  <img className={`w-6 ${index === 1 ? 'w-6' : ''} mt-1`} src={`https://jamesnorgate.softvencefsd.xyz/${about?.icon}`} alt="" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-primary01">
                    {about?.title}
                  </h3>
                  <div className="text-[#3C3535] text-sm lg:text-base">{ ReactHtmlParser(about?.description) }</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AboutUs;
