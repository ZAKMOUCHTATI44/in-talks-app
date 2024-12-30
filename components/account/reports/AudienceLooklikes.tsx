import React from "react";

type Lookalike = {
  username: string;
  full_name: string;
  picture_url: string;
  url: string;
};

const AudienceLooklikes = ({ data }: { data: Lookalike[] }) => {
  return (
    <div className="dark:bg-darkColor dark:text-whiteColor border border-gray-200 shadow-md p-5 rounded-md">
      <h5 className="text-base font-semibold mb-5 text-center">
        Audience Looklikes
      </h5>

      <div className="grid grid-cols-2 gap-2">
        {data.map((item) => (
          <div key={item.username} className="py-2 flex items-center gap-2">
            <img src={item.picture_url} alt={item.username} width={45} height={45} className=" rounded-full" />
            <p className="text-wrap">
                {item.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudienceLooklikes;
