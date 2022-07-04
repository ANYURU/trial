import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useMediaQuery } from "../../hooks";
import { RegistrationModal } from "../../components";
import { useOutletContext } from "react-router-dom";
import { chartColors } from "../../components/Charts/colors";
import { AccSummary } from "../../components";
import { useEffect, useState } from "react";
import { supabase } from "../../helpers/supabase";
import SuperAdDashboard from "./SuperAdDashboard";
import { Spinner } from "../../components";

export default function Dashboard() {
  const matches = useMediaQuery("(min-width: 800px)");
  const [profile] = useOutletContext();
  const [myShares, setMyShares] = useState(0);
  const [saccosShares, setSaccosShares] = useState(0);
  const [weeklyShares, setWeeklyShares] = useState({
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  });

  useEffect(() => {
    document.title = "Dashboard - Bweyogere tuberebumu";

    get_total_shares()
      .then((shares) => setSaccosShares(shares))
      .catch((error) => console.log(error));
    get_weekly_shares()
      .then((weekly_shares) => setWeeklyShares(weekly_shares))
      .catch((error) => console.log(error));

    // Realtime
    const mySubscription = supabase
      .from("transactions")
      .on("*", async (payload) => {
        console.log(payload);
        await get_total_shares()
          .then((shares) => setSaccosShares(shares))
          .catch((error) => console.log(error));
        await get_weekly_shares()
          .then((weekly_shares) => setWeeklyShares(weekly_shares))
          .catch((error) => console.log(error));
      })
      .subscribe();

    return () => supabase.removeSubscription(mySubscription);
  }, []);

  const get_total_shares = async () => {
    const { data, error } = await supabase.rpc("fetch_total_shares");
    if (error) throw error;
    // console.log(data);
    return data;
  };

  const get_weekly_shares = async () => {
    const { data, error } = await supabase.rpc("fetch_weekly_shares");
    if (error) throw error;
    // console.log(data);
    let obj = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    if (data?.length > 0) {
      for (let deposit of data) {
        if (deposit && deposit?.shares) {
          obj[deposit.day] += deposit.shares;
        }
      }
    }

    return obj;
  };

  const data = {
    maintainAspectRatio: true,
    responsive: true,
    datasets: [
      {
        data: [saccosShares, myShares],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
    labels: ["Total Shares", "My Shares"],
  };

  const data2 = {
    labels: Object.keys(weeklyShares),
    datasets: [
      {
        label: "Performance",
        data: Object.values(weeklyShares),
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

  // document.body.style.position = 'fixed'

  if (profile.roles) {
    if (!profile?.roles.includes("super_admin")) {
      return (
        <div
          className={`mx-5 mb-2 my-2 md:h-[calc(100vh-70px)] ${
            matches && "overflow-y-hidden"
          }`}
        >

          {Object.keys(profile).length > 0 && !profile?.fullname && (
            <RegistrationModal />
          )}
          <div className="">
            <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
              Dashboard
            </h1>
            <AccSummary setMyShares={setMyShares} />
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
    } else {
      return <SuperAdDashboard />;
    }
  }
  else {
    if(profile?.error) {
      return (
        <div
          className={`mx-5 mb-2 my-2 md:h-[calc(100vh-70px)] ${
            matches && "overflow-y-hidden"
          }`}
        >

          {Object.keys(profile).length > 0 && !profile?.fullname && (
            <RegistrationModal />
          )}
          <div className="">
            <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
              Dashboard
            </h1>
            <AccSummary setMyShares={setMyShares} />
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
    } else {
      return <Spinner />;
    }
  }
}
