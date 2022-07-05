import ConfirmModal from "./ConfirmModal";
import { useState, useEffect } from "react";
import { supabase } from "../../helpers/supabase";
import { toast } from "react-toastify";

function PromoteModal({ setPromoteModal, member }) {
  const promoteMember = async () => {
    const { error, data } = await supabase
      .from("new_members")
      .update({"roles": ["member", "admin"]})
      .eq("id", member.id);

    if (error){
      toast.error(`Promotion Failed.`, { position: "top-center" });
    }
    else {
      toast.success(`Promoted ${member.fullname}.`, { position: "top-center" });
    }
  };

  return (
    <ConfirmModal setPopUp={setPromoteModal}>
      <h1 className="font-bold">Are you sure?</h1>
      <p>
        {member.fullname.toUpperCase()} will be promote to an Administrator.
      </p>
      <div className="flex justify-end gap-3 mt-3">
        <button
          className="px-3 py-1 outline outline-1 outline-gray-500 rounded-md text-gray-500"
          onClick={() => {
            setPromoteModal(false);
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            promoteMember();
            setPromoteModal(false);
          }}
          className="bg-primary px-3 py-1 outline outline-1 outline-primary  rounded-md text-white"
        >
          Promote
        </button>
      </div>
    </ConfirmModal>
  );
}

export default PromoteModal;
