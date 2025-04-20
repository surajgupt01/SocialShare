import Drive from "./drive";
import LinkedIn from "./linkedin";
import Notion from "./notion";
import Twitter from "./twitter";
import Youtube from "./youtube";
import { motion } from "motion/react";
import Lock from "./lock";

function Tiles() {
  return (
    <>
      <div className=" sm:flex sm:flex-row flex-col justify-center items-center p-4  gap-2  " id="explore">
        <div className="flex md:flex-col flex-row justify-center items-center  gap-2 text-shadow-md  ">
        <motion.div
              initial={{ y: -90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              whileHover={{
                scale:0.95
                
                
              }}
              
            >
          <div className="border-1 border-gray-100 sm:w-60 w-50 sm:h-40 h-30 rounded-lg bg-gray-100 flex flex-col items-center justify-center cursor-pointer shadow-sm shadow-gray-300">
       
              <p className="font-semibold text-2xl ">Seamless</p>
              <p className="font-semibold text-4xl">Integration</p>
          </div>
          </motion.div>

          <motion.div className="border border-gray-100 sm:w-60 w-50 sm:h-80 h-65 rounded-lg bg-gray-100 flex flex-col gap-4 items-center justify-center shadow-sm shadow-gray-300">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale:0.8
                
                
              }}
              className="flex flex-col items-center gap-2"


            >
              <div className="flex gap-2">
                <Youtube />
                <Drive />
                <Twitter />
              </div>
              <div className="flex gap-2">
                <LinkedIn />
                <Notion />
              </div>
            </motion.div>

            <motion.p
              className="font-semibold mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale:0.8
                
                
              }}
            >
              Your <br /> favourite platforms
            </motion.p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-2 text-shadow-md justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale:0.95
              
              
            }}
          >
            <div className="border-1 border-gray-100 md:w-120 w-100 h-90 md:mt-0 mt-2 rounded-lg bg-gray-300 relative overflow-hidden shadow-gray-300 shadow-sm">
              <p className="text-2xl font-semibold m-4">
                Cross Platform Sync <br></br> Real Time Collaboration
              </p>
              <img
                src="/assets/Screenshot-2025-04-19-230957.png"
                className="absolute rounded-lg ml-20 mt-10 h-60 bottom-5 shadow-xl"
              ></img>
            </div>
          </motion.div>

          <motion.div
            className="border-1 border-gray-100 md:w-110 w-100 h-30 rounded-lg bg-gray-100 font-semibold text-lg  flex items-center relative shadow-sm shadow-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            <p className="ml-5">
              Share embeds with your <span className="text-3xl">Friends</span>
            </p>
            <img
              src="/assets/istockphoto-1355902675-612x612.jpg"
              className="w-70 h-30 rounded-lg "
            ></img>
          </motion.div>
        </div>
        <div className="flex md:flex-col flex-row md:mt-0 mt-2  md:gap-2 gap-4 text-shadow-md relative justify-center items-center">
          <motion.div
            className="relative border-1 border-gray-100 w-50 h-70 rounded-lg bg-gray-100 font-semibold text-2xl overflow-hidden shadow-sm shadow-gray-300"
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="mt-10 text-2xl">User friendly</p>
            <p className="text-3xl">Responsive</p>
            <p className="text-xl ml-22">Design</p>

            <img
              src="/assets/User-friendly-and-Responisve-Design.png"
              className="absolute rounded-lg mix-blend-multiply ml-15"
            ></img>
          </motion.div>

          <div className="border-1 border-gray-100 w-50 h-50 rounded-lg bg-gray-100 font-semibold text-xl p-4 shadow-sm shadow-gray-300 ">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            whileHover={{
              scale:0.95
              
              
            }}
              
            >
              <Lock></Lock>
              <p className="">
                Manage Your Library <br></br>
                Privacy Controls
              </p>
            </motion.div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Tiles;
