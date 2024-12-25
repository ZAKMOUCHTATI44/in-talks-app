import React from "react";
import Error from "@/components/utils/Error";
import Loading from "@/components/utils/Loading";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import DataTable, { TableColumn } from "react-data-table-component";
import Image from "next/image";
import { BASE_URL } from "@/lib/hepler";
import { formatNumber } from "@/lib/number";
import AudienceGrowthChart from "./AudienceGrowthChart";
import ScoringTab from "./ScoringTab";

interface SocialCoverageType {
  id: string;
  name: string;
  network: string;
  handle: string;
  bio: string;
  verified: boolean;
  insights: {
    subscribers: number;
    score: number;
    activity: string;
    engagement_average: string;
    engagement_rate: number;
    growth: number;
    growth_rate: number;
    views_average: number;
  };
  audience: {
    history: {
      data: {
        date: string;
        value: string;
        displayedValue: string;
        timestamp: number;
      }[];
      title: string;
      network: string;
    };
  };
  scoring: Scoring;
}

interface Scoring {
  audience: number;
  growth: number;
  engagement: number;
  views: number;
  activity: number;
}
interface WeekDayType {
  posts: number;
  ratio: string;
  day: number;
}
interface Data {
  accounts: SocialCoverageType[];
  activity_weekday: WeekDayType[];
}

const SocialCoverage = ({ id }: { id: string }) => {
  const buildQueryString = (): string => {
    return `/creators/${id}/social-coverage`;
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
              src={`${BASE_URL}/media/account?id=${row.id}`}
              style={{ borderRadius: "50%" }}
              alt={row.name}
              width={35}
              height={35}
            />
          </span>
          <div>
            <h6>{row.name}</h6>
            <p className="text-sm">@{row.handle}</p>
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
      selector: (row) => row.insights.score,
      width: "140px",
      cell(row) {
        return (
          <>
            {/* className={`growth ${row.influenceScore?.comment === 'low' ? 'lower' : 'high'}`} */}
            {row.insights.score && (
              <div
                className={`flex gap-1 items-center high bg-[#21BA4526] text-white px-3 py-2 rounded-md`}
              >
                <span className={`circle high`}></span>
                {row.insights.score} / 100
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
      selector: (row) => row.insights.subscribers,
      cell(row) {
        return <p>{formatNumber(Number(row.insights.subscribers))}</p>;
      },
    },

    {
      name: "Activity",
      width: "200px",
      sortable: true,
      id: "growth",
      cell(row) {
        return <p>{row.insights.activity}</p>;
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
            {(row.insights.engagement_rate * 100).toFixed(2)} %
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
              {row.insights.growth_rate} %
            </p>
            <p className="text-sm">{formatNumber(row.insights.growth)}</p>
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
            {formatNumber(Number(row.insights.engagement_average))}
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
            {formatNumber(row.insights.views_average)}
          </p>
        );
      },
    },
  ];

  return (
    <div className="my-12">
      {data && (
        <>
          <DataTable
            className={`dark-datatable w-full`}
            columns={columns}
            data={data.accounts}
          />
          <div className="grid grid-cols-3 gap-5">
            {data.accounts.map((item) => (
                <AudienceGrowthChart key={item.network} network={item.network} data={item.audience.history.data} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5 my-5">
            {data.accounts.map(item => (
              <ScoringTab key={item.id} scoring={item.scoring} label={`${item.network} Score`} network={item.network} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SocialCoverage;
