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
  const today = new Date();

  const matches = useMediaQuery("(min-width: 800px)");
  const [user, profile] = useOutletContext();
  const [myShares, setMyShares] = useState(0);
  const [saccosShares, setSaccosShares] = useState(0);
  const [monthlyShares, setMonthlyShares] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(today.getFullYear().toString());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard - Bweyogere tuberebumu";

    get_total_shares()
      .then((shares) => setSaccosShares(shares))
      .catch((error) => console.log(error));
    get_monthly_shares()
      .then((monthly_shares) => setMonthlyShares(monthly_shares))
      .catch((error) => console.log(error));

    // Realtime
    const mySubscription = supabase
      .from("transactions")
      .on("*", async (payload) => {
        await get_total_shares()
          .then((shares) => setSaccosShares(shares))
          .catch((error) => console.log(error));
        await get_monthly_shares()
          .then((monthly_shares) => setMonthlyShares(monthly_shares))
          .catch((error) => console.log(error));
      })
      .subscribe();

    return () => supabase.removeSubscription(mySubscription);
  }, [year]);

  const get_total_shares = async () => {
    const { data, error } = await supabase.rpc("fetch_total_shares");
    if (error) throw error;
    return data;
  };

  const get_monthly_shares = async () => {
    const { data, error } = await supabase.rpc("get_performance");

    if (error) {
      setLoading(false);
      throw error;
    }

    setLoading(false);
    const { transactions, years } = data;
    const sorted_years = (years && years.sort((a, b) => b - a)) ?? [];
    setYears(sorted_years);

    const filtered_transactions =
      (await (transactions &&
        transactions.filter((transaction) => transaction?.year === year))) ??
      [];

    let obj = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    if (filtered_transactions?.length > 0) {
      for (let deposit of filtered_transactions) {
        if (deposit && deposit?.shares) {
          obj[deposit.month] += deposit.shares;
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
    labels: Object.keys(monthlyShares),
    datasets: [
      {
        label: "Performance",
        data: Object.values(monthlyShares),
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

  if (profile?.roles) {
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
                  <label
                    htmlFor="year"
                    className="capitalize text-base font-medium"
                  >
                    year
                    <select
                      name="year"
                      id="year"
                      onChange={(event) => {
                        setYear(event.target.value);
                      }}
                      className="ring-2 ring-primary mx-1 rounded"
                    >
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="w-full h-full p-4">
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
  } else {
    if (profile?.fullname) {
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
      return loading && <Spinner />;
    }
  }
}
