"use client";

import Link from "next/link";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const AnalyticsPage = () => {
  return (
    <div>
      <header className="h-[--navh] border-b flex items-center p-[3rem]">
        <Link className="" href="/">
          BUDGET BUDDY
        </Link>
      </header>
      <div className="w-4/5 h-full flex flex-col gap-[2rem]">
        <div className="title">
          <h3>YOUR DATA IN NUMBERS</h3>
          <h3>CHARTS</h3>
          <h3>AND DIAGRAMS</h3>
        </div>
      </div>
      <Doughnut
        className="doughout"
        data={{
          labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "My First Dataset",
              data: [300, 50, 100],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        }}
      />
    </div>
  );
};

export default AnalyticsPage;
