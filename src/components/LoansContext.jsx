import { useNavigate, useOutletContext } from "react-router-dom";
import { MdPayments, MdInfo } from "react-icons/md";

export default function LoansContext({
  index,
  activeIndex,
  show,
  id,
  setLoanModal,
}) {
  const [user, profile, setProfile] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      <ul
        className={`absolute right-0 w-48 py-2 mt-2 z-50 bg-white shadow-lg ease-in-out duration-300 dark:bg-dark-bg-700 ${
          index === activeIndex && show ? "" : "hidden"
        }`}
      >
        {!profile.roles.includes("super_admin") && (
          <li
            className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
            onClick={() => {
              navigate(`/loans/payment/${id}`);
            }}
          >
            <MdPayments /> Payment
          </li>
        )}
        <li
          className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
          onClick={() => {
            setLoanModal(true);
          }}
        >
          <MdInfo /> Details
        </li>
      </ul>
    </>
  );
}
