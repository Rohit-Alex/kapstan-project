import DeploymentCard from "components/DeploymentCard";
import Box from "@mui/material/Box";
import SystemMetrics from "components/SystemMetrics";
import EventHistory from "components/EventHistory";

const OverviewTabCtn = () => {
  return (
    <>
      <DeploymentCard />
      <Box
        display="flex"
        my={4}
        gap={2}
        sx={{
          "& > *": {
            flex: 1,
          },
        }}
      >
        <SystemMetrics />
        <EventHistory />
      </Box>
    </>
  );
};

export default OverviewTabCtn;
