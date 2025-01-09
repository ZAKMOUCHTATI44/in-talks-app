import Link from "next/link";
import React from "react";

const FeedCard = ({ data }: { data: WebMention }) => {
  return (
    <div className="bg-darkColor py-5 rounded-md flex items-center gap-2 px-5">
      <div className="h-[75px] w-[75px]">
            <div
              className="rounded-full h-[75px] w-[75px]  mx-auto flex justify-start"
              style={{
                background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
              }}
            >
              <img src={`${data.picture}`} width={74} height={74}  className="rounded-full mx-auto w-[74px] h-[74px] bg-contain p-0.5" alt="" />
              {/* <div
              className="rounded-full mx-auto w-[72px] h-[72px] bg-contain p-0.5"
              style={{
                backgroundImage: `url(${BASE_URL}/media/account?id=${account.accounts[0].id})`,
              }}
            ></div> */}
            </div>
          </div>

      <div className="col-span-3">
      <p>{data.link.title}</p>
        <Link href={data.link.url} className="text-sm">
          {data.domain}
        </Link>
       
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          suscipit inventore, sunt nam animi harum nemo quam mollitia quas
          quibusdam!
        </p>
      </div>
    </div>
  );
};

export default FeedCard;
