"use client";

import Link from "next/link";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const AnalyticsPage = () => {
  const donutStyle = {
    width: 400,
    height: 400,
  };

  const lineStyle = {
    width: 800,
    height: 400,
  };

  return (
    <div className="p-[--spacing]">
      <div className="text-lg w-full h-full flex flex-col gap-[2rem]">
        <div className="title">
          <p>OVERVIEW</p>
        </div>
      </div>
      <div className="mx-[32px] my-[64px] flex gap-[2rem] flex-wrap justify-around pr-[120px] items-center">
        <div
          className="chart-container flex flex-col items-center"
          style={lineStyle}
        >
          <p>Spending for the Past 6 Months</p>
          <Line
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  label: "Doughnut Chart",
                  data: [802.44, 604.21, 1403.47, 920.11, 1103.01, 1389.42],
                  backgroundColor: [
                    "#FFC75F",
                    "rgb(54, 162, 235)",
                    "#FF8066",
                    "#845EC2",
                    "#FF6F91",
                    "#B0A8B9",
                  ],
                },
              ],
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-[10px]">Spending in the last month</p>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Spending
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Groceries</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  430.53 $
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Transportation</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  122.74 $
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Restaurant</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  92.13 $
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Clothing</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  57.85 $
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Medical</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  10.26 $
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Other</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  70.43 $
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="chart-container flex flex-col items-center"
          style={donutStyle}
        >
          <p>Doughnut Chart</p>
          <Doughnut
            options={{ maintainAspectRatio: false }}
            data={{
              labels: [
                "Groceries",
                "Transportation",
                "Restaurant",
                "Clothing",
                "Medical",
                "Other",
              ],
              datasets: [
                {
                  label: "Doughnut Chart",
                  data: [430.53, 122.74, 92.13, 57.85, 10.26, 70.43],
                  backgroundColor: [
                    "#FFC75F",
                    "rgb(54, 162, 235)",
                    "#FF8066",
                    "#845EC2",
                    "#FF6F91",
                    "#B0A8B9",
                  ],
                },
              ],
            }}
          />
        </div>
        <div className="w-2/5">
          <p>
            <b>Your Budget This Month: </b>
          </p>
          <p>757.13$/1000$</p>
          <div className="h-4 w-full bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `75%` }}
            ></div>
          </div>
          <p className="mt-[10px] text-[1.2rem]">Congratulations!!</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
