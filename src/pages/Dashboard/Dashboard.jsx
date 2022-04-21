import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import { useMediaQuery } from "../../hooks";
import { RegistrationModal } from "../../components";
import { useOutletContext } from "react-router-dom";
import { data, data2, options } from "../../helpers/utilites";
import { AccSummary } from "../../components";

export default function Dashboard() {
  const matches = useMediaQuery('(min-width: 800px)')
  const { user } = useOutletContext()
  
  
  return (
    <div className={`flex flex-col ${matches && 'overflow-y-hidden'}`}>
      {user?.name === undefined && <RegistrationModal />}
      <div>
        <h1 className="mb-5 mt-2 font-bold uppercase">Dashboard</h1>
        <AccSummary />
      </div>
      <div className="flex flex-col flex-grow mt-5">
        <h1 className="text-center font-semibold mb-5">Member Performance</h1>
        <div className={`flex gap-5 flex-grow ${!matches && 'flex-col w-full justify-center'}`}>
          <div className={`bg-white lg:w-6/12 sm:w-11/12  flex flex-col px-2 py-5 rounded-md justify-center items-center ${!matches && ''} `}>
            <Line data={data2} />
          </div>
          <div className={`bg-white lg:w-6/12 sm:w-11/12  flex flex-col px-2 py-5 rounded-md justify-center items-center ${!matches && ''} `}>
            <div className="p-4">
              <Doughnut data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}