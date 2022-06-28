import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../helpers/supabase";


function AdminInfo() {
  const { id } = useParams();

  useEffect(() => {
    getAdmin();
  }, []);

  const [ admin, setAdmin ] = useState(null)
  const getAdmin = async () => {
    const { error, data } = await supabase
      .from("_admin_profiles")
      .select()
      .eq("id", id);
    setAdmin(data[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
            <p className="col-span-2">admin ID:</p>
            <p className="font-bold col-span-3">{admin.id}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
            <p className="col-span-2">Email:</p>
            <p className="font-bold col-span-3">{admin.email_address}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
            <p className="col-span-2">Phone Number:</p>
            <p className="font-bold col-span-3">{admin.phone_number}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
            <p className="col-span-2">admin Status:</p>
            <p className="font-bold col-span-3">
                <span className={` py-1 px-2 rounded-xl text-white ${admin.admin_status === "active" ? "bg-green-400" : "bg-red-400"}`}>
                {admin.admin_status}
                </span>
            </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
            <p className="col-span-2">Marital Status:</p>
            <p className="font-bold col-span-3">{admin.marital_status}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
            <p className="col-span-2">Gender:</p>
            <p className="font-bold col-span-3">{admin.gender}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
            <p className="col-span-2">NIN/passport:</p>
            <p className="font-bold col-span-3">{admin.id_passport_number}</p>
        </div>
    </div>
  )
}

export default AdminInfo