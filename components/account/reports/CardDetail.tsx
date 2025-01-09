import React from "react";


const CardDetail = ({ account }: { account: Account }) => {
  return (
    <div className="dark:bg-darkColor dark:text-whiteColor bg-white shadow-md py-5 px-2 rounded-md">
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2">
          <div className="h-[75px] w-[75px]">
            <div
              className="rounded-full h-[75px] w-[75px]  mx-auto flex justify-start"
              style={{
                background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
              }}
            >
              <img src={account.pictureUrl} width={74} height={74}  className="rounded-full mx-auto w-[74px] h-[74px] bg-contain p-0.5" alt="" />
            </div>
          </div>

          <div className="w-full">
            <h2 className="font-semibold text-xl">{account.name}</h2>
            <p className="text-xs font-medium capitalize">{account.title}</p>
            <div className="w-full justify-start flex gap-2">
              {account.networks.length > 0 &&
                account.networks.map((item) => (
                  <div key={item.id} className="flex items-center gap-5 py-2">
                    <div
                      className="h-4 w-4 bg-contain bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${`/social-media/${item.network}.png`})`,
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <p className="text-sm">{account.description}</p>
      </div>
      {/* <button onClick={() => generatePDF("pdf-content")}>Export to PDF</button>
      <Button  className="w-full my-5 bg-mainColor flex justify-center gap-2 items-center">
        Download pdf 
        <Download /> */}
      {/* </Button> */}
    </div>
  );
};

export default CardDetail;
