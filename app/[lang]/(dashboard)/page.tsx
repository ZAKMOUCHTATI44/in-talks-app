// "use client";
// import React from "react";
// import Error from "@/components/utils/Error";
// import api from "@/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import { AxiosResponse } from "axios";
// import "@/app/css/creator-netwrok.css";
// import Loading from "@/components/utils/Loading";

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
//     const query = "creators/search?limit=12";

//     return query;
//   };

//   const fetch = (): Promise<Pagination> =>
//     api.get(queryBuilder()).then((res: AxiosResponse) => res.data);

//   const { isLoading, error, data } = useQuery<Pagination, Error>({
//     queryKey: ["creators-search", queryBuilder()],
//     queryFn: fetch,
//   });

//   if (error) return <Error />;

//   if (isLoading) return <Loading />;

//   return (
//     <div>
//       <div className="min-h-[85vh] bg-darkColor">
//         <BoxCreators
//           size={220}
//           duration={30}
//           data={data?.data.slice(0, 4).map((item) => String(item.insights.top.id))}
//         />
//         {/* <BoxCreators
//           size={330}
//           duration={40}
//           data={data.mentions.in.slice(4, 8)}
//         />
//         <BoxCreators
//           size={430}
//           duration={55}
//           data={data.mentions.in.slice(8, 12)}
//         /> */}
//         <MiddleElement />
//       </div>
//     </div>
//   );
// };

// const BoxCreators = ({
//   size,
//   duration,
//   data,
// }: {
//   size: number;
//   duration: number;
//   data: string[];
// }) => {
//   return (
//     <div
//       className="box-network"
//       style={
//         {
//           "--size": `${size}px`,
//           "--duration": `${duration}s`,
//           height: `${size}px`,
//           width: `${size}px`,
//           border: "0.3px solid #EFEFEF",
//         } as React.CSSProperties
//       }
//     >
//       {data.map((item, index) => (
//         <div className={`group-icon `} key={item} style={{ zIndex: "99px" }}>
//           <div className={`box-${index} children-container `}>
//             <img
//               src={item}
//               style={{
//                 width: "55px",
//                 height: "55px",
//                 borderRadius: "50%",
//               }}
//               alt=""
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const MiddleElement = () => {
//   return (
//     <div
//       style={{
//         inset: "50%",
//         width: "75px",
//         height: "75px",
//         zIndex: 199,
//         translate: " -50% -50%",
//         position: "absolute",
//       }}
//     >
//       <img
//         src="https://api.inflauditor.ma/media/account?id=StVDrkoqyoxN2yb1TyyTno"
//         width={75}
//         height={75}
//         style={{
//           borderRadius: "50%",
//         }}
//         alt=""
//       />
//     </div>
//   );
// };

// export default Page;

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
