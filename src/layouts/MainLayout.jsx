import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration, useLocation } from "react-router";

import {motion, useScroll} from 'framer-motion'

function MainLayout() {

  const {scrollYProgress} = useScroll();
  const {pathname} = useLocation();
  console.log(location.pathname);

  return (
    <div className="font-inter relative bg-[#F9FBF9]">
      <ScrollRestoration />
      <Outlet />
      <Toaster />
     {
       pathname === '/' &&  <motion.div style={{scaleX: scrollYProgress}} className="bg-primary01 h-2 left-0  sticky  z-[999] bottom-0"></motion.div>
     }
    </div>
  );
}

export default MainLayout;
