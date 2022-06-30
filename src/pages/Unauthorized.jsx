import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdStopScreenShare } from "react-icons/md";

function Unauthorized() {
  const navigate = useNavigate();
  const [navigateBack, setNavigateBack] = useState(false);

  useEffect(() => {
    if (navigateBack) {
      navigate(-1);
    }
  }, [navigateBack, navigate]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center dark:text-secondary-text">
      <MdStopScreenShare size={70} color={`"#5e5e5e"`} />
      <p className="dark:text-secondary-text">
        You are not authorized to view this page.
        
      </p>
      <span className="dark:text-secondary-text">
          Click to{" "}
          <button
            onClick={() => setNavigateBack(true)}
            className="text-primary font-semibold"
          >
            Go back
          </button>
        </span>
    </div>
  );
}

export default Unauthorized;
