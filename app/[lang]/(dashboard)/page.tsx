// "use client";
// import SocialCard from "@/components/dashbord/SocialCard";
// import Error from "@/components/utils/Error";
// import Loading from "@/components/utils/Loading";
// import api from "@/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import { AxiosResponse } from "axios";
// import React from "react";
// import "@/app/css/slide.css";
// import Circle from "@/components/dashbord/Circle";

// interface Pagination {
//   data: Account[];
//   cursor: {
//     total: number;
//     page: number;
//     count: number;
//   };
// }

// const Page = () => {
//   const queryBuilder = () => {
//     const query = "creators/ranking?limit=12&sort=rank";

//     return query;
//   };

//   const fetch = (): Promise<Pagination> =>
//     api.get(queryBuilder()).then((res: AxiosResponse) => res.data);

//   const { isLoading, error, data } = useQuery<Pagination, Error>({
//     queryKey: ["creators-ranking", queryBuilder()],
//     queryFn: fetch,
//   });

//   if (error) return <Error />;

//   if (isLoading) return <Loading />;

//   return (
//     <>
//      <div className="">
//      <div className=" absolute">
//         <div className="slider-container overflow-hidden relative my-12">
//           <div className="slider-track grid grid-cols-3 gap-3">
//             {data &&
//               data.data
//                 .slice(0, 10)
//                 .map((account) => (
//                   <SocialCard key={account.id} account={account} />
//                 ))}
//             {/* Repeat items for seamless sliding */}
//             {data &&
//               data.data
//                 .slice(0, 10)
//                 .map((account) => (
//                   <SocialCard key={account.id + "-copy"} account={account} />
//                 ))}
//           </div>
//         </div>
//       </div>

//      </div>
//       <div className="w-full relative mt-[600px]">
//         <Circle />
//       </div>
//     </>
//   );
// };

// export default Page;
import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
