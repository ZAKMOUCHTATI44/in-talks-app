import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import Image from "next/image";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Scoring {
  audience: number;
  growth: number;
  engagement: number;
  views: number;
  activity: number;
}

const ScoringTab = ({
  scoring,
  label,
  network,
}: {
  scoring: Scoring;
  label: string;
  network: string;
}) => {
  const data = {
    labels: [
      `Audience (${scoring.audience})`,
      `Growth (${scoring.growth})`,
      `Engagement (${scoring.engagement})`,
      `Views (${scoring.views})`,
      `Activity (${scoring.activity})`,
    ],
    datasets: [
      {
        label: "Instagram Score",
        data: [
          scoring.audience,
          scoring.growth,
          scoring.engagement,
          scoring.views,
          scoring.activity,
        ],
        backgroundColor: "rgba(255, 87, 235, 0.1)", 
        borderColor: "#ff55e3",
        borderWidth: 2,
        pointBackgroundColor: "#ff55e3", 
        pointBorderColor: "#ffffff",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          display: false,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", 
        },
        pointLabels: {
          color: "#12b5de",
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#000000", 
        titleColor: "#0000", 
        bodyColor: "#0000", 
        borderColor: "#ff55e3",
        borderWidth: 1,
      },
      legend: {
        display: false, // Hide legend
        labels: {
          color: "#000", // White color for legend text
        },
      },
    },
  };

  return (
    <div className="flex flex-col px-5 pt-5 pb-2 rounded-md justify-center dark:bg-gray-800 bg-white">
      <div className="flex gap-2 justify-center items-center">
        <Image
          src={`/social-media/${network}.png`}
          alt={`${network} logo`}
          width={25}
          height={25}
          className="rounded-full"
        />
        <p className="capitalize text-lg font-semibold dark:text-white text-gray-900">
          {label}
        </p>
      </div>
      <Radar data={data} options={options} />
    </div>
  );
};

export default ScoringTab;
