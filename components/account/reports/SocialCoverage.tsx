import React from "react";
import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import DataTable, { TableColumn } from "react-data-table-component";
import Image from "next/image";
import { formatNumber } from "@/lib/number";
import AudienceGrowthChart from "./AudienceGrowthChart";

interface SocialCoverageType {
  id: string;
  network: string;
  name: string;
  username: string;
  pictureUrl: string;
  bio: string;
  followers: number;
  score: string;
  engagementRate: string;
  engagementAvg: string;
  avgViews: string;
  activity: string;
  audienceScore: number;
  growthScore: string;
  engagementScore: number;
  viewsScore: number;
  activityScore: number;
  verified: boolean;
}

interface AudienceEvolution {
  network:string
  data: {
    id: string;
    date: string;
    value: number;
    displayedValue: string;
    timestamp: string;
  }[];
}
// interface Scoring {
//   audience: number;
//   growth: number;
//   engagement: number;
//   views: number;
//   activity: number;
// }
// interface WeekDayType {
//   posts: number;
//   ratio: string;
//   day: number;
// }
interface Data {
  networks: SocialCoverageType[];
  networkEvolutionStats : AudienceEvolution[]
  // activity_weekday: WeekDayType[];
}

const SocialCoverage = ({ id }: { id: string }) => {
  const buildQueryString = (): string => {
    const query = `/accounts/social/${id}`;
    return query;
  };

  const fetch = (): Promise<Data> =>
    api.get(buildQueryString()).then((res: AxiosResponse) => res.data);

  const { isLoading, error, data } = useQuery<Data, Error>({
    queryKey: [buildQueryString()],
    queryFn: fetch,
    enabled: !!id,
  });
  if (error) return <Error />;
  if (isLoading) return <Loading />;

  const columns: TableColumn<SocialCoverageType>[] = [
    {
      name: "Social Media",
      sortable: true,
      id: "network",
      selector: (row) => row.network,
      width: "300px",
      cell: (row) => (
        <div className="flex items-center p-3 gap-3">
          <span>
            <Image
              src={`/social-media/${row.network}.png`}
              alt={row.name}
              width={25}
              height={25}
            />
          </span>
          <span>
            <img
              src={`${row.pictureUrl}`}
              style={{ borderRadius: "50%" }}
              alt={row.name}
              width={35}
              height={35}
            />
          </span>
          <div>
            <h6>{row.name}</h6>
            <p className="text-sm">@{row.username}</p>
          </div>
          {row.verified ? (
            <span>
              <Image
                src={`/social-media/verified.png`}
                alt={row.name}
                width={15}
                height={15}
              />
            </span>
          ) : (
            <></>
          )}
        </div>
      ),
    },
    {
      name: "Influence Score",
      sortable: true,
      id: "influenceScore.score",
      selector: (row) => row.score,
      width: "140px",
      cell(row) {
        return (
          <>
            {row.score && (
              <div
                className={`flex gap-1 items-center high dark:bg-[#21BA4526] bg-green-400 text-white px-3 py-2 rounded-md`}
              >
                <span className={`circle high`}></span>
                {Number(row.score).toFixed(2)} / 100
              </div>
            )}
          </>
        );
      },
    },
    {
      name: "Followers",
      width: "150px",
      sortable: true,
      id: "follower_Count",
      selector: (row) => row.followers,
      cell(row) {
        return <p>{formatNumber(Number(row.followers))}</p>;
      },
    },

    {
      name: "Activity",
      width: "200px",
      sortable: true,
      id: "growth",
      cell(row) {
        return <p>{row.activity}</p>;
      },
    },

    {
      name: "Engage. Rate",
      sortable: true,
      id: "rate",
      width: "150px",
      cell(row) {
        return (
          <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span className={`circle h-2 w-2 bg-green-500 rounded-full`}></span>{" "}
            {row.engagementRate}
          </p>
        );
      },
    },
    {
      name: "Growth (last 30 days)",
      sortable: true,
      id: "growth_last_month",
      width: "200px",
      cell(row) {
        return (
          <div>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "0px",
              }}
            >
              <span
                className={`circle h-2 w-2 bg-green-500 rounded-full`}
              ></span>{" "}
              {row.growthScore} %
            </p>
            <p className="text-sm">{formatNumber(Number(row.growthScore))}</p>
          </div>
        );
      },
    },
    {
      name: "Avg. Engage.",
      sortable: true,
      id: "avg_engage",
      width: "150px",
      cell(row) {
        return (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginBottom: "0px",
            }}
          >
            <span className={`circle h-2 w-2 bg-green-500 rounded-full`}></span>{" "}
            {formatNumber(Number(row.engagementAvg))}
          </p>
        );
      },
    },
    {
      name: "Avg. Views",
      sortable: true,
      id: "abg_views",
      cell(row) {
        return (
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginBottom: "0px",
            }}
          >
            <span className={`circle h-2 w-2 bg-green-500 rounded-full`}></span>{" "}
            {formatNumber(Number(row.avgViews))}
          </p>
        );
      },
    },
  ];

  return (
    <div className="my-5 flex flex-col gap-5">
      {data && (
        <>
          <DataTable
            className={`dark-datatable w-full border-gray-200 bg-white shadow-md`}
            columns={columns}
            data={data.networks}
          />
          <div className="grid grid-cols-3 gap-5">
            {data.networkEvolutionStats.map((item) => (
                <AudienceGrowthChart key={item.network} network={item.network} data={item} />
            ))}
          </div>

          {/* <div className="grid grid-cols-3 gap-5">
            {data.accounts.map(item => (
              
              <ScoringTab key={item.id} scoring={item.scoring} label={`${item.network} Score`} network={item.network} />
            ))}
          </div> */}
        </>
      )}
    </div>
  );
};

export default SocialCoverage;
