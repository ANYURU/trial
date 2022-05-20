import { useMediaQuery } from "../../hooks"

export default function AccSummary() {
  const matches = useMediaQuery('(min-width: 800px)')
  return (
    matches
        ?
          <div className="flex justify-between mb-5 gap-5 dark:text-white">
              <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-gray-900">
                <h1 className="font-bold text-2xl">0</h1>
                <h1 className="font-semibold">Shares</h1>
              </div>
              <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-gray-900">
                <h1 className="font-bold text-2xl">0</h1>
                <h1 className="font-semibold">Savings</h1>
              </div>
              <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-gray-900">
                <h1 className="font-bold text-2xl">0</h1>
                <h1 className="font-semibold">Mwana</h1>
              </div>
              <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-gray-900">
                <h1 className="font-bold text-2xl">0</h1>
                <h1 className="font-semibold">Fixed</h1>
              </div>
          </div>
        :
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="bg-white w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
                <h1 className="font-bold text-2xl">0</h1>
                <h1 className="font-semibold">Shares</h1>
              </div>
              <div className="bg-white w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
                <h1 className="font-bold text-2xl">0</h1>
                <h1 className="font-semibold">Savings</h1>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="bg-white w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
                <h1 className="font-bold text-2xl">0</h1>
                <h1 className="font-semibold">Mwana</h1>
              </div>
              <div className="bg-white w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
                <h1 className="font-bold text-2xl">0</h1>
                <h1 className="font-semibold">Fixed</h1>
              </div>
            </div>
          </div>
  )
}
