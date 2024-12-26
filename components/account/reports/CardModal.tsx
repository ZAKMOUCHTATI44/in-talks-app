import { BASE_URL } from "@/lib/hepler";
import React, { useState } from "react";
import ReportAccount from "../ReportAccount";

const CardModal = ({ account }: { account: Account }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <ReportAccount id={account.id} open={open} setOpen={setOpen}>
        <div onClick={() => setOpen(true)} className="flex items-center gap-2">
          <div
            className="rounded-full h-11 w-11 flex justify-start"
            style={{
              background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
            }}
          >
            <div
              className="rounded-full mx-auto w-10 h-10 bg-contain p-0.5"
              style={{
                backgroundImage: `url(${BASE_URL}/media/account?id=${account.picture})`,
              }}
            ></div>
          </div>
          <p className="text-sm">{account.name}</p>
        </div>
      </ReportAccount>
    </div>
  );
};

export default CardModal;
