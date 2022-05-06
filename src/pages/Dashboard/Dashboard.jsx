import { Doughnut, Line } from "react-chartjs-2";
import { chartColors } from "../../components/Charts/colors"; 
import Chart from 'chart.js/auto'
import { useMediaQuery } from "../../hooks";
import { RegistrationModal } from "../../components";
import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const matches = useMediaQuery('(min-width: 800px)')
  const [ profile ] = useOutletContext()

  const data = {
    maintainAspectRatio: true,
    responsive: true,
    datasets: [
      {
        data: [300, 50],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ],
    labels: ["Company Shares", "My Shares"]
  };

  const data2 = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Performance",
        data: [33, 53, 85, 41, 44, 65, 34],
        fill: false,
        borderColor: "#27427A"
      }
    ]
  };

  const options = {
    legend: {
      display: false,
      position: "right"
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };
  
  return (
    <div className={`flex flex-col ${matches && 'overflow-y-hidden'}`}>
      {/* Account Summaries */}
      {profile?.fullname === null && <RegistrationModal />}
      <div>
        <h1 className="mb-5 mt-2 font-bold uppercase">Dashboard</h1>
        <div>
          {matches
          ?
            <div className="flex justify-between mb-5 gap-5">
                <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center">
                  <h1 className="font-bold text-2xl">0</h1>
                  <h1 className="font-semibold">Shares</h1>
                </div>
                <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center">
                  <h1 className="font-bold text-2xl">0</h1>
                  <h1 className="font-semibold">Savings</h1>
                </div>
                <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center">
                  <h1 className="font-bold text-2xl">0</h1>
                  <h1 className="font-semibold">Mwana</h1>
                </div>
                <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center">
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
          }
        </div>
      </div>
      {/* Member Performance */}
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