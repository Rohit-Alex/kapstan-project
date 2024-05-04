import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Box } from "@mui/material";
import { triggerCpuUsageAPI, useCpuUsage } from "Slices/FetchCpuUsage";
import { triggerMemoryUsageAPI, useMemoryUsage } from "Slices/FetchMemoryUsage";
import { CpuUsageResponse, MemoryUsageResponse } from "types";
import { useAppDispatch } from "Hooks/useReduxHooks";
import { useApplicationList } from "Slices/FetchProjectStatus";

const SystemMetrics = () => {
  const dispatch = useAppDispatch();

  const { status: memoryUsageStatus, data: memoryUsageData } = useMemoryUsage();
  const { status, data: applicationListData } = useApplicationList();

  const { status: cpuUsageStatus, data: cpuUsageData } = useCpuUsage();

  const [selectedMetric, setSelectedMetric] = useState<"cpu" | "memory">("cpu");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiCalls();
  }, [selectedMetric]);

  const apiCalls = () => {
    const promiseArr: Promise<any>[] = [];

    if (selectedMetric === "cpu" && cpuUsageStatus !== "fetched") {
      promiseArr.push(
        dispatch(triggerCpuUsageAPI()) as unknown as Promise<any>
      );
    }
    if (selectedMetric === "memory" && memoryUsageStatus !== "fetched") {
      promiseArr.push(
        dispatch(triggerMemoryUsageAPI()) as unknown as Promise<any>
      );
    }

    Promise.allSettled(promiseArr)
      .then((res) => {
        // not required
      })
      .catch(() => {
        // not required
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: "cpu" | "memory"
  ) => {
    setSelectedMetric(newValue);
  };

  const applicationIdToNameMap = applicationListData?.reduce(
    (acc: Record<string, string>, item) => {
      acc[item.id.toString()] = item.name;
      return acc;
    },
    {}
  );

  const currentTabData = (
    selectedMetric === "cpu" ? cpuUsageData : memoryUsageData
  ) as any;

  const groupedData = currentTabData.reduce(
    (acc: Record<string, number[]>, curr: any) => {
      const key = applicationIdToNameMap?.[
        curr.applicationId as keyof typeof applicationIdToNameMap
      ] as string;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(
        Number(
          curr[
            selectedMetric === "cpu" ? "cpuUtilization" : "memoryUtilization"
          ]
        )
      );
      return acc;
    },
    {}
  );

  const chartSeriesData = Object.entries(groupedData).map(([key, values]) => ({
    name: key,
    data: values,
  }));

  const firstApplicationId = currentTabData[0]?.applicationId;
  const timestamps = firstApplicationId
    ? currentTabData
        .filter(
          (obj: MemoryUsageResponse | CpuUsageResponse) =>
            obj.applicationId === firstApplicationId
        )
        .map((obj: MemoryUsageResponse | CpuUsageResponse) => {
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
          // enabled: true,
          // format: "{point.y}",
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
        {loading ? (
          "Loading...."
        ) : (
          <>
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemMetrics;
