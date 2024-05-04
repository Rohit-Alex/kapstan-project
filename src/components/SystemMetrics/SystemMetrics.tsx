import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { dummyMemoryVal } from "constant";
import { Box } from "@mui/material";

const SystemMetrics = () => {
  const [selectedMetric, setSelectedMetric] = useState("cpu");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedMetric(newValue);
  };
  const groupedData = dummyMemoryVal.reduce((acc: any, curr: any) => {
    const key = curr.applicationId;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(+curr.memoryUtilization);
    return acc;
  }, {});

  const chartSeriesData = Object.entries(groupedData).map(([key, values]) => ({
    name: key,
    data: values,
  }));

  const firstApplicationId = dummyMemoryVal[0]?.applicationId;

  // Get timestamps for the first applicationId
  const timestamps = firstApplicationId
    ? dummyMemoryVal
        .filter((obj) => obj.applicationId === firstApplicationId)
        .map((obj) => {
          const timestamp = parseInt(obj.timestamp) * 1000; // Convert seconds to milliseconds
          const date = new Date(timestamp);
          return date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          });
        })
    : [];

  const chartOptions = {
    chart: {
      type: "line",
    },
    title: {
      text: "",
      align: "left",
    },
    xAxis: {
      categories: timestamps,
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    series: chartSeriesData,
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.y}",
        },
        marker: {
          enabled: true,
        },
      },
    },
  };

  return (
    <Card sx={{ borderRadius: "8px" }}>
      <CardContent>
        <Typography variant="headerText">System metrics</Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={selectedMetric} onChange={handleTabChange}>
            <Tab value="cpu" label="CPU" />
            <Tab value="memory" label="Memory" />
          </Tabs>
        </Box>
        <Box mt={2}>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SystemMetrics;
