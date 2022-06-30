import { useMediaQuery } from "../../hooks"

export default function Transactions({ members, deposits, loans, withdraws }) {
  const matches = useMediaQuery('(min-width: 800px)')
  return (
    matches
        ?
          <div className="flex justify-between mb-5 gap-5 dark:text-white">
              <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-dark-bg-700">
                <h1 className="font-bold text-2xl">{deposits}</h1>
                <h1 className="font-semibold">Deposits</h1>
              </div>
              <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-dark-bg-700">
                <h1 className="font-bold text-2xl">{loans}</h1>
                <h1 className="font-semibold">Loans</h1>
              </div>
              <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-dark-bg-700">
                <h1 className="font-bold text-2xl">{withdraws}</h1>
                <h1 className="font-semibold">Withdraws</h1>
              </div>
              <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-dark-bg-700">
                <h1 className="font-bold text-2xl">{members}</h1>
                <h1 className="font-semibold">Members</h1>
              </div>
          </div>
        :
          <div className="flex flex-col gap-5 mb-5  dark:text-white">
            <div className="flex gap-5">
              <div className="bg-white dark:bg-dark-bg-700  w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
                <h1 className="font-bold text-2xl">{deposits}</h1>
                <h1 className="font-semibold">Deposits</h1>
              </div>
              <div className="bg-white dark:bg-dark-bg-700 w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
                <h1 className="font-bold text-2xl">{loans}</h1>
                <h1 className="font-semibold">Loans</h1>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="bg-white dark:bg-dark-bg-700 w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
                <h1 className="font-bold text-2xl">{withdraws}</h1>
                <h1 className="font-semibold">Withdraws</h1>
              </div>
              <div className="bg-white dark:bg-dark-bg-700 w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
                <h1 className="font-bold text-2xl">{members}</h1>
                <h1 className="font-semibold">Members</h1>
              </div>
            </div>
          </div>
  )
}
