import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

export default function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["line", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Price($)",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#add4b3"],
                stops: [0, 100],
              },
            },
            colors: ["#44bd32"],
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            xaxis: {
              tickAmount: 10,
              categories: data?.map(
                (date) =>
                  `${
                    new Date(date.time_close * 1000).getMonth() + 1
                  }/${new Date(date.time_close * 1000).getDate()}`
              ),
              labels: {
                style: {
                  fontSize: "12px",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
