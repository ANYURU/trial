import { TiTick } from "react-icons/ti";
import { steps } from "../helpers/loanSteps";
import { Fragment } from "react";
import { useMediaQuery } from "../hooks";

export default function Stepper({ pageNumber }) {
  const matches = useMediaQuery("(min-width: 500px)");
  return (
    <div className="flex justify-between w-full py-4 px-2 mb-2 items-center">
      {steps.map((step, index) => (
        <Fragment key={index}>
          <div className={`relative flex flex-col items-center`}>
            <span
              className={`w-10 h-10 flex justify-center items-center  rounded-full mb-1  ${
                pageNumber >= step.number
                  ? "bg-primary text-white"
                  : "outline outline-1 text-gray-400  outline-gray-400"
              }  `}
            >
              {pageNumber > step.number ? <TiTick /> : step.number}
            </span>
            {matches && (
              <span
                className={`text-xs absolute top-0 mt-10 text-center ${
                  pageNumber === step.number ? "text-primary" : "text-gray-400"
                } `}
              >
                {step.title}
              </span>
            )}
          </div>
          {index !== 5 && (
            <div
              className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                pageNumber >= step.number ? "border-primary" : "border-gray-300"
              } `}
            ></div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
