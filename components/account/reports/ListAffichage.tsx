import React from "react";

interface Props {
  title: string;
  data: {
    key: string;
    value: number;
    image?: string;
  }[];
}
const ListAffichage = ({ props }: { props: Props }) => {
  return (
    <div className="dark:bg-darkColor bg-white shadow-md dark:text-whiteColor  border border-gray-200 p-5 rounded-md">
      <h5 className="text-base font-semibold mb-5 text-center">
        {props.title}
      </h5>
      <div className="flex flex-col gap-3">
        {props.data.map((item) => (
          <div key={item.key}>
            <div className="flex gap-2 items-center">
              {item.image && (
                <div className="w-6">
                  <img
                    src={item.image}
                    alt={item.key}
                    height="15"
                  
                  />
                </div>
              )}
              <div
                style={{
                  width: "-webkit-fill-available",
                }}
              >
                <div className="flex justify-between">
                  <p className="capitalize">{item.key}</p>
                  <p className="text-sm">{item.value} %</p>
                </div>
                <span
                  className={`h-1.5 bg-blue-600 w-[${item.value.toFixed(
                    0
                  )}%] w-[22%] block rounded-md`}
                  style={{
                    width: `${item.value}%`,
                  }}
                ></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAffichage;
