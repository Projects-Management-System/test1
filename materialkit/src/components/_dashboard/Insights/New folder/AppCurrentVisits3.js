import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from './formatNumber';
//
import { BaseOptionChart } from '../../../charts';

// -project completion pie chart in the dash board-----------------------------------------

const CHART_HEIGHT = 330;
const LEGEND_HEIGHT = 100;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------
export default function AppCurrentVisits3({ commissioningData }) {
  const theme = useTheme();
  // const [commissioningData, setData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://pms-mobitel.herokuapp.com/vendorProjectsDatabases')
  //     .then((res) => {
  //       setData(res.data.commissioningDataForFrontEnd);
  //       // console.log(res.data.commissioningDataForFrontEnd);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // --------- Assigning Data To Graph ----------------------------------

  const CHART_DATA = commissioningData;
  // console.log(sarData);

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.error.main,

      theme.palette.info.main
    ],
    labels: ['Completed', 'Pending', 'Hold'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Commisioning" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={250} />
      </ChartWrapperStyle>
    </Card>
  );
}
