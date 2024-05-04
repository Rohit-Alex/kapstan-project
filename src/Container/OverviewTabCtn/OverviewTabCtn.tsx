import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import Shimmer from "components/Shimmer";
const EventHistory = React.lazy(() => import("components/EventHistory"));
const DeploymentCard = React.lazy(() => import("components/DeploymentCard"));
const SystemMetrics = React.lazy(() => import("components/SystemMetrics"));

const OverviewTabCtn = () => {
  return (
    <>
      <Suspense fallback={<Shimmer height={180} />}>
        <DeploymentCard />
      </Suspense>
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
        <Suspense fallback={<Shimmer height={515} />}>
          <SystemMetrics />
        </Suspense>
        <Suspense fallback={<Shimmer height={515} />}>
          <EventHistory />
        </Suspense>
      </Box>
    </>
  );
};

export default OverviewTabCtn;
