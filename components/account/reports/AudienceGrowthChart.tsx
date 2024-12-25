"use client";

import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import Image from "next/image";

// Chargement dynamique de ReactApexcharts pour s'assurer qu'il est exécuté uniquement côté client
const ReactApexcharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Data = {
  date: string;
  value: string;
  displayedValue: string;
  timestamp: number;
};

const AudienceGrowthChart = ({
  network,
  data,
}: {
  network: string;
  data: Data[];
}) => {
  const [chartOptions, setChartOptions] = useState<ApexOptions | null>(null);
  const [chartSeries, setChartSeries] = useState<{ data: number[] }[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && data?.length > 0) {
      const socialMediaColors = [
        { platform: "TW", color: "#1DA1F2" },
        { platform: "IG", color: "#E4405F" },
        { platform: "LK", color: "#0077B5" },
        { platform: "YT", color: "#FF0000" },
        { platform: "TK", color: "#000000" },
      ];

      const currentColor =
        socialMediaColors.find((platform) => platform.platform === network)
          ?.color || "#000";

      setChartOptions({
        chart: {
          parentHeightOffset: 0,
          toolbar: { show: false },
          sparkline: { enabled: true },
        },
        tooltip: { enabled: false },
        dataLabels: { enabled: false },
        stroke: {
          width: 2.5,
          curve: "smooth",
        },
        grid: {
          show: false,
          padding: {
            top: 2,
            bottom: 0,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityTo: 0,
            opacityFrom: 1,
            shadeIntensity: 1,
            stops: [0, 100],
            colorStops: [
              [
                {
                  offset: 0,
                  opacity: 0.4,
                  color: currentColor,
                },
                {
                  offset: 100,
                  opacity: 0.1,
                  color: currentColor,
                },
              ],
            ],
          },
        },
        theme: {
          monochrome: {
            enabled: true,
            shadeTo: "light",
            shadeIntensity: 1,
            color: currentColor,
          },
        },
        xaxis: {
          labels: { show: false },
          axisTicks: { show: false },
          axisBorder: { show: false },
        },
        yaxis: { show: false },
      });

      setChartSeries([
        { data: data.map((item) => Number(item.value)) },
      ]);
    }
  }, [data, network]);

  if (!chartOptions || chartSeries.length === 0) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="mt-5 bg-darkColor pt-5 rounded-lg">
      <div className="flex px-5 gap-2 pb-10">
        <Image
          src={`/social-media/${network}.png`}
          alt={`${network} icon`}
          width={25}
          height={25}
        />
        <p className="capitalize">{network} Audience</p>
      </div>
      <div className="flex justify-between px-2">
        <div className="text-start">
          <p className="text-sm">{data[0]?.displayedValue || "N/A"}</p>
          <p className="text-xs">{data[0]?.date || "N/A"}</p>
        </div>
        <div className="text-end">
          <p className="text-sm">
            {data[data.length - 1]?.displayedValue || "N/A"}
          </p>
          <p className="text-xs">{data[data.length - 1]?.date || "N/A"}</p>
        </div>
      </div>
      <ReactApexcharts
        type="area"
        height={110}
        options={chartOptions}
        series={chartSeries}
      />
    </div>
  );
};

export default AudienceGrowthChart;
