import axios from 'axios';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/SaleSum';
import { BASE_URL } from 'utils/requests';

type ChartData = {
  labels: string[];
  series: number[];
};

const DonutChart = () => {

  let chartData: ChartData = {labels: [], series: []};

  axios.get(`${BASE_URL}/sales/amount-by-seller`)
    .then((response) => {
      const data = response.data as SaleSum[];
      const labels = data.map(saleSum => saleSum.sellerName);
      const series = data.map(saleSum => saleSum.sum);

      chartData = { labels, series};
      console.log(chartData);
    });

  const options = {
      legend: {
          show: true
      }
  }

  return (
    <Chart
      options={{ ...options, labels: chartData.labels }}
      series={ chartData.series }
      type="donut"
      height="240"
    />
  );
}

export default DonutChart;
