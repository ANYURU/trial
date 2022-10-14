import { useEffect, useState } from "react";
import { useMediaQuery } from "../../hooks";
import { Spinner, Transactions } from "../../components";
import { supabase } from "../../helpers/supabase";
import { useNavigate } from "react-router-dom";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import { useAuth } from "../../auth/AuthContext";

function SuperAdDashboard() {
  const matches = useMediaQuery("(min-width: 800px)");
  const { user } = useAuth()

  useEffect(() => {
    getMembers();
    getDeposits();
    getLoans();
    getWithdraws();

    const mySubscription = supabase
      .from('*')
      .on('*', async payload => {
        await getDeposits()
        await getMembers()
        await getLoans()
        await getWithdraws()
      })
      .subscribe()

      document.title = "Dashboard - Bweyogere tuberebumu";

      return () => supabase.removeSubscription(mySubscription) 
  }, []);

  const navigate = useNavigate();

  const [admins, setAdmins] = useState([]);
  const [members, setMembers] = useState(0);
  const [deposits, setDeposits] = useState(0);
  const [loans, setLoans] = useState(0);
  const [withdraws, setWithraws] = useState(0);

  const getDeposits = async () => {
    const { data } = await supabase
      .from("transactions")
      .select()
      .eq("_type", "deposit");
    setDeposits(data.length);
  };

  const getLoans = async () => {
    const { data } = await supabase.from("loans").select();
    setLoans(data.length);
  };

  const getWithdraws = async () => {
    const { error, data } = await supabase
      .from("transactions")
      .select()
      .eq("_type", "withdraw");
    setWithraws(data.length);
  };

  const getMembers = async () => {
    const { data } = await supabase.from("new_members").select().not('id', 'eq', user.id);

    const dataArray = data.filter(
      (member) => member.roles && member?.roles.includes("admin")
    );
    dataArray.length === 0 ? setAdmins(null) : setAdmins(dataArray);
    setMembers(data.length - dataArray.length);
  };

  return (
    <div
      className={`mx-5 mb-2 my-2 md:h-[calc(100vh-70px)] ${
        matches && "overflow-y-hidden"
      }`}
    >
      <div className="">
        <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
          Dashboard
        </h1>
      </div>
      <div className="flex flex-col pb-10 m-1 md:h-full mt-5 mb-5 overflow-x-hidden">
        <Transactions
          members={members}
          deposits={deposits}
          loans={loans}
          withdraws={withdraws}
        />
        <h1 className="text-center font-semibold mb-5 dark:text-secondary-text">
          Transactions Summary
        </h1>
        <div
          className={`flex gap-5 flex-grow m-1 dark:text-secondary-text ${
            !matches && "flex-col w-full justify-center"
          }`}
        >
          <div
            className={`bg-white dark:bg-dark-bg-700 lg:w-6/12 md:w-6/12 sm:w-12/12  flex flex-col h-[calc(100%-50px)] mr-2 md:mr-0 px-2 py-5 shadow rounded-md items-center`}
          >
            {admins && admins.length > 0 ? (
              <>
                <table className="w-full">
                  <thead>
                    <th className="text-left py-2">Administrators</th>
                    <th className="text-left py-2">Phone Number</th>
                  </thead>
                  <tbody>
                    {admins?.map((admin, index) => (
                      <tr className="text-left">
                        <td className="py-2 px-1">{admin.fullname}</td>
                        <td>{admin.phone_number}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <span
                  className="text-primary cursor-pointer flex items-center gap-1"
                  onClick={() => navigate("/admins")}
                >
                  See more <HiOutlineChevronDoubleRight />
                </span>
              </>
            ) : (
              <Spinner />
            )}
          </div>
          <div
            className={`bg-white dark:bg-dark-bg-700 lg:w-6/12 md:w-6/12 sm:w-12/12  flex flex-col px-2 py-5 rounded-md items-center h-[calc(100%-50px)] w-full shadow mr-2 md:mr-0`}
          >
            <h1>Accounts Summary</h1>
            <table className="w-full">
              <thead>
                <th className="text-left py-2">Account type</th>
                <th className="text-left py-2">Totals</th>
              </thead>
              <tbody>
                <tr>
                  <td>Savings</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Shares</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Fixed</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Mwana</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdDashboard;
