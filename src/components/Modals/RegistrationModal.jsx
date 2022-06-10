import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function RegistrationModal({ passed, setPopUp, children }) {
  const navigate = useNavigate();
  const { darkMode } = useAuth()


  return ReactDOM.createPortal(
    <div className={`bg-black bg-opacity-40 w-screen h-screen absolute top-0 left-0 right-0 bottom-0 flex justify-center z-20 items-center ${darkMode ? "dark" : ""}`}>
      <div
        className="bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-10 rounded-md shadow-md flex flex-col justify-center items-center"
        ref={passed}
      >
        {/* {children} */}
        <h1 className="text-2xl font-bold m-2 dark:text-white">WELCOME</h1>
        <p className="m-2 text-lg">
          Please register for membership to get full access to the system
        </p>
        <button
          className="bg-primary rounded-md text-white px-3 py-1 font-bold text-lg m-2"
          onClick={() => {
            navigate("/application");
          }}
        >
          Register
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
