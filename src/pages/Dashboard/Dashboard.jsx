import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useMediaQuery } from "../../hooks";
import { RegistrationModal } from "../../components";
import { useOutletContext } from "react-router-dom";
import { chartColors } from "../../components/Charts/colors";
import { AccSummary } from "../../components";
import { useEffect, useState } from "react";
import { supabase } from "../../helpers/supabase";

export default function Dashboard() {
  const matches = useMediaQuery("(min-width: 800px)");
  const [profile] = useOutletContext();
  const [accounts, setAccounts] = useState({})

  useEffect(() => {
    document.title = "Dashboard - Bweyogere tuberebumu";
    get_account_information()
      .then((data) => {
        if (data) {
          setAccounts(data);
          // setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(accounts)

  const get_account_information = async () => {
    const { data, error } = await supabase.rpc("get_accounts_information", {});
    if (error) throw error;
    return data;
  };

  const data = {
    maintainAspectRatio: true,
    responsive: true,
    datasets: [
      {
        data: [300, 50],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
    labels: ["Total Shares", "My Shares"],
  };

  const data2 = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Performance",
        data: [33, 53, 85, 41, 44, 65, 34],
        fill: false,
        borderColor: "#27427A",
      },
    ],
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: true,
    animation: {
      easing: "easeInOutQuad",
      duration: 520,
    },
    legend: {
      display: false,
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    cutoutPercentage: 25,
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      easing: "easeInOutQuad",
      duration: 520,
    },
    legend: {
      display: false,
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    cutoutPercentage: 25,
  };

  return (
    <div className={`flex flex-col ${matches && "overflow-y-hidden"}`}>
      {/* Account Summaries */}
      {Object.keys(profile).length > 0 && !profile?.fullname && <RegistrationModal />}
      <div className="">
        <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
          Dashboard
        </h1>
        <AccSummary accounts={accounts} />
      </div>
      <div className="flex flex-col flex-grow mt-5 mb-5 overflow-x-hidden">
        <h1 className="text-center font-semibold mb-5 dark:text-secondary-text">
          Member Performance
        </h1>
        <div
          className={`flex gap-5 flex-grow ${
            !matches && "flex-col w-full justify-center"
          }`}
        >
          <div
            className={`bg-white dark:bg-dark-bg-700 lg:w-6/12 md:w-6/12 sm:w-12/12  flex flex-col px-2 py-5 rounded-md justify-center items-center`}
          >
            <div>
              <Line data={data2} options={options2} />
            </div>
          </div>
          <div
            className={`bg-white dark:bg-dark-bg-700 lg:w-6/12 md:w-6/12 sm:w-12/12  flex flex-col px-2 py-5 rounded-md justify-center items-center`}
          >
            <div>
              <Doughnut data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
