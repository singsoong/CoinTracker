import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { useEffect, useState } from "react";
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

export default function Price() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["candlestick", coinId],
    () => fetchCoinHistory(coinId)
  );
  const [chartData, setChartData] = useState<
    Array<{ x: Date; y: Array<string> }>
  >([]);

  useEffect(() => {
    if (data !== undefined && data.length > 0) {
      let inputData: Array<{ x: Date; y: Array<string> }> = [];
      data.map((item) => {
        inputData.push({
          x: new Date(item.time_open),
          y: [item.open, item.high, item.low, item.close],
        });
      });
      setChartData(inputData);
    }
  }, [data]);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data: chartData,
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              background: "transparent",
            },
            xaxis: {
              labels: {
                show: false,
              },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            theme: {
              mode: "dark",
            },
          }}
        />
      )}
    </div>
  );
}
