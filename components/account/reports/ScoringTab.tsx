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
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderColor: "#ff55e3",
        borderWidth: 2,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#ff55e3",
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
          display: false, // Hides the ticks in the center
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Set grid color to white with transparency
        },
        pointLabels: {
          color: "#FF56E3", // Set label color to white
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          //   label: function (tooltipItem: any ) {
          //     return `${tooltipItem.label}: ${tooltipItem.raw}`;
          //   },
        },
        backgroundColor: "#000000",
        borderWidth: 1,
      },
      legend: {
        display: false,
        labels: {
        },
      },
    },
  };

  return (
    <div className="flex flex-col px-5 pt-5 pb-2 rounded-md justify-center dark:bg-darkColor">
      <div className="flex gap-2 justify-center">
        <Image
          src={`/social-media/${network}.png`}
          alt=""
          width={25}
          height={25}
        />
        <p className=" capitalize">{label}</p>
      </div>
      <Radar data={data} options={options} />
    </div>
  );
};

export default ScoringTab;
