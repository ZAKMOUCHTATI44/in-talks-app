import React from "react";

const CardModal = ({ account }: { account: Account }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          className="rounded-full h-11 w-11 flex justify-start"
          style={{
            background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
          }}
        >
          <div
            className="rounded-full mx-auto w-10 h-10 bg-contain p-0.5"
            style={{
              backgroundImage: `url(${account.pictureUrl})`,
            }}
          ></div>
        </div>
        <p className="text-sm">{account.name}</p>
      </div>
    </div>
  );
};

export default CardModal;
