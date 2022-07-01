import { useMediaQuery } from "../../hooks"
import { currencyFormatter } from "../../helpers/currencyFormatter"

export default function AccSummary({ accounts }) {
  const matches = useMediaQuery('(min-width: 800px)')
  return (
    matches
        ?
          <div className="flex justify-between mb-5 gap-5 dark:text-white">
              <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-dark-bg-700">
                <h1 className="font-bold text-2xl">{accounts?.shares?.balance}</h1>
                <h1 className="font-semibold">Shares</h1>
              </div>
              <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-dark-bg-700">
                <h1 className="font-bold text-2xl">{accounts?.savings?.balance}</h1>
                <h1 className="font-semibold">Savings</h1>
              </div>
              <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-dark-bg-700">
                <h1 className="font-bold text-2xl">{accounts?.mwana?.balance}</h1>
                <h1 className="font-semibold">Mwana</h1>
              </div>
              <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-dark-bg-700">
                <h1 className="font-bold text-2xl">{currencyFormatter(accounts?.fixed?.balance)}</h1>
                <h1 className="font-semibold">Fixed</h1>
              </div>
          </div>
        :
          <div className="flex flex-col gap-5  dark:text-white">
            <div className="flex gap-5">
              <div className="bg-white dark:bg-dark-bg-700  w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
                <h1 className="font-bold text-2xl">{accounts?.shares?.balance}</h1>
                <h1 className="font-semibold">Shares</h1>
              </div>
              <div className="bg-white dark:bg-dark-bg-700 w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
                <h1 className="font-bold text-2xl">{accounts?.savings?.balance}</h1>
                <h1 className="font-semibold">Savings</h1>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="bg-white dark:bg-dark-bg-700 w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
                <h1 className="font-bold text-2xl">{accounts?.mwana?.balance}</h1>
                <h1 className="font-semibold">Mwana</h1>
              </div>
              <div className="bg-white dark:bg-dark-bg-700 w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
                <h1 className="font-bold text-2xl">{currencyFormatter(accounts?.fixed?.balance)}</h1>
                <h1 className="font-semibold">Fixed</h1>
              </div>
            </div>
          </div>
  )
}
