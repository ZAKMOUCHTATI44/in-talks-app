import React from "react";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/number";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ChartData {
  name: string;
  label: string;
  value: number;
  color: string;
  icon: string; // URL to the icon
}

const FollowersDisptach = ({ data }: { data: Network[] }) => {
  const dataChart: ChartData[] = [
    {
      name: "YouTube",
      value: data.find((network) => network.network === "youtube")?.followers || 0,
      label:
        data
          .find((network) => network.network === "youtube")
          ?.followers?.toString() || "",
      color: "url(#color-youtube)",
      icon: "/social-media/youtube.png",
    },
    {
      name: "Instagram",
      value: data.find((network) => network.network === "instagram")?.followers || 0,
      label:
        data
          .find((network) => network.network === "instagram")
          ?.followers?.toString() || "",
      color: "url(#color-instagram)",
      icon: "/social-media/instagram.png",
    },
    {
      name: "TikTok",
      value: data.find((network) => network.network === "tiktok")?.followers || 0,
      label:
        data
          .find((network) => network.network === "tiktok")
          ?.followers?.toString() || "",
      color: "url(#color-tiktok)",
      icon: "/social-media/tiktok.png",
    },
    {
      name: "Twitter",
      value: data.find((network) => network.network === "twitter")?.followers || 0,
      label:
        data
          .find((network) => network.network === "twitter")
          ?.followers?.toString() || "",
      color: "url(#color-twitter)",
      icon: "/social-media/twitter.png",
    },
    {
      name: "LinkedIn",
      value: data.find((network) => network.network === "linkedin")?.followers || 0,
      label:
        data
          .find((network) => network.network === "linkedin")
          ?.followers?.toString() || "",
      color: "url(#color-linkedin)",
      icon: "/social-media/LD.png",
    },
  ];

  return (
    <div className="flex flex-col gap-5  border-l-2 dark:border-gray-600 border-gray-200 pl-12">
      <Label >Followers Dispatch</Label>
      <div className="chart-container flex items-center gap-5 ">
        <ResponsiveContainer width={108} height={108}>
          <PieChart>
            <defs>
              <linearGradient id="color-youtube" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff0000" />
              </linearGradient>
              <linearGradient id="color-tiktok" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#000" />
              </linearGradient>
              <linearGradient id="color-instagram" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4f5bd5" />
                <stop offset="25%" stopColor="#962fbf" />
                <stop offset="50%" stopColor="#d62976" />
                <stop offset="75%" stopColor="#fa7e1e" />
                <stop offset="100%" stopColor="#feda75" />
              </linearGradient>
              <linearGradient id="color-twitter" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1DA1F2" />
              </linearGradient>
              <linearGradient id="color-linkedin" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0077B5" />
                <stop offset="100%" stopColor="#005582" />
              </linearGradient>
            </defs>
            <Pie
              data={dataChart}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={50}
              stroke="transparent"
              fill="#8884d8"
              paddingAngle={0}
            >
              {dataChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="legend">
          {dataChart.map(
            (entry, index) =>
              entry.label && (
                <div
                  key={`legend-item-${index}`}
                  className="legend-item flex items-center gap-2"
                >
                  <Image
                    src={entry.icon}
                    alt={`${entry.name} icon`}
                    width={17}
                    height={17}
                  />
                  <span>{formatNumber(Number(entry.label))}</span>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersDisptach;
