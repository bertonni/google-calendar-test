import { IAlertProps } from "../@types/types";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const variants: Variants = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { y: 30, opacity: 0, transition: { duration: 0.3 } },
};

const Alert = ({ message, close }: IAlertProps) => {
  const [tooltipStatus, setTooltipStatus] = useState<number>(0);

  const text =
    message?.type === "erro"
      ? "text-red-500"
      : message?.type === "successo"
      ? "text-green-500"
      : "text-yellow-500";

  const bg =
    message?.type === "erro"
      ? "bg-red-200"
      : message?.type === "successo"
      ? "bg-green-200"
      : "bg-yellow-200";

  const bg2 =
    message?.type === "erro"
      ? "bg-red-500"
      : message?.type === "successo"
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
          className="fixed bottom-8 left-0 right-0 ml-auto mr-auto max-w-xl"
        >
          <div className="flex items-center justify-center px-4 sm:px-0">
            <div
              id="alert"
              className={`lg:w-10/12 transition duration-150 ease-in-out ${bg} shadow
            rounded-md  md:flex justify-between items-center  top-0 mt-12 mb-8 py-4 px-4`}
            >
              <div className="sm:flex items-center">
                <div className="flex items-center">
                  <div className={`mr-2 mt-0.5 sm:mt-0 ${text}`}>
                    {message.type === "successo" ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    ) : message.type === "erro" ? (
                      <XCircleIcon className="h-6 w-6 text-red-500" />
                    ) : (
                      <InformationCircleIcon className="h-6 w-6 text-yellow-500" />
                    )}
                  </div>
                  <p className={`mr-2 text-base font-bold ${text} capitalize`}>
                    {message?.type}
                  </p>
                </div>
                <p className={`text-base ${text}`}>{message?.text}</p>
              </div>
              <div className="flex justify-end mt-4 md:mt-0 md:pl-4 lg:pl-0">
                <div
                  className={`text-sm mr-4 font-bold relative ${text}`}
                  onMouseEnter={() => setTooltipStatus(1)}
                  onMouseLeave={() => setTooltipStatus(0)}
                >
                  {tooltipStatus === 1 && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        variants={variants}
                        className="mx-auto container px-4 py-4 bg-sky-400 rounded absolute h-fit -top-32 w-[200px] cursor-default"
                      >
                        <div className="flex gap-2">
                          <p className="text-sm font-semibold leading-none text-white">
                            Possíveis causas
                          </p>
                        </div>
                        <div className="flex flex-col justify-center gap-2 text-xs leading-none text-gray-50 pt-2 pb-2">
                          {message.code === 401 && (
                            <>
                              <span>Você não tem permissão para criar eventos</span>
                              <span>Sua sessão expirou. Faça o logout e o login</span>
                            </>
                            )}
                        </div>
                        <svg
                          className="absolute z-10 bottom-[-10px]"
                          width={16}
                          height={10}
                          viewBox="0 0 16 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 10L0 0L16 1.41326e-06L8 10Z"
                            fill="#38BDF8"
                          />
                        </svg>
                      </motion.div>
                    </AnimatePresence>
                  )}
                  
                  {message.code === 401 && <span className="cursor-pointer">Detalhes</span>}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
