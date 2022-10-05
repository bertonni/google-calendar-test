import { IAlertProps } from "../@types/types";
import { motion, Variants, AnimatePresence } from "framer-motion";

const variants: Variants = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { y: 30, opacity: 0, transition: { duration: 0.3 } },
};

const Alert = ({ message, close }: IAlertProps) => {
  const text =
    message?.type === "error"
      ? "text-red-500"
      : message?.type === "success"
      ? "text-green-500"
      : "text-yellow-500";

  const bg =
    message?.type === "error"
      ? "bg-red-200"
      : message?.type === "success"
      ? "bg-green-200"
      : "bg-yellow-200";

  const bg2 =
    message?.type === "error"
      ? "bg-red-500"
      : message?.type === "success"
      ? "bg-green-500"
      : "bg-yellow-500";

  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          variants={variants}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          key={"alert"}
          className="fixed bottom-8 left-0 right-0 ml-auto mr-auto"
        >
          <div className="flex items-center justify-center px-4 sm:px-0">
            <div
              id="alert"
              className={`lg:w-10/12 transition duration-150 ease-in-out ${bg} shadow
            rounded-md  md:flex justify-between items-center  top-0 mt-12 mb-8 py-4 px-4`}
            >
              <div className="sm:flex items-center">
                <div className="flex items-end">
                  <div className={`mr-2 mt-0.5 sm:mt-0 ${text}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={22}
                      height={22}
                      fill="currentColor"
                    >
                      <path
                        className="heroicon-ui"
                        d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 9a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                      />
                    </svg>
                  </div>
                  <p className={`mr-2 text-base font-bold ${text} capitalize`}>
                    {message?.type}
                  </p>
                </div>
                <div
                  className={`h-1 w-1 ${bg2} rounded-full mr-2 hidden xl:block`}
                />
                <p className={`text-base ${text}`}>{message?.message}</p>
              </div>
              <div className="flex justify-end mt-4 md:mt-0 md:pl-4 lg:pl-0">
                <span
                  className={`text-sm mr-4 font-bold cursor-pointer ${text}`}
                >
                  Details
                </span>
                <span
                  onClick={close}
                  className={`text-sm cursor-pointer ${text}`}
                >
                  Close
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    // <div className={`absolute bottom-20 left-0 right-0 ml-auto mr-auto h-fit py-3 px-6 flex items-center
    //   justify-center border rounded w-fit ${colors}`}>
    //   <span onClick={close} className="absolute right-1 top-0 p-1 cursor-pointer hover:brightness-125">
    //     x
    //   </span>
    //   <p>{message}</p>
    // </div>
  );
};

export default Alert;
