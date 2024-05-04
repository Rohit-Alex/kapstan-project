import React, { Suspense, useContext } from "react";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";
import Shimmer from "components/Shimmer";

const EnvVariablesCtn = React.lazy(() => import("Container/EnvVariablesCtn"));
const OverviewTabCtn = React.lazy(() => import("Container/OverviewTabCtn"));
const ProjectTabs = React.lazy(() => import("components/ProjectTabs"));
const NotDataCard = React.lazy(() => import("components/NotDataCard"));
const EventHistory = React.lazy(() => import("components/EventHistory"));
const ProjectStatusHeader = React.lazy(
  () => import("components/ProjectStatusHeader")
);

const Dashboard = () => {
  const { selectedTab } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  const COMPONENT_MAP = {
    1: (
      <Suspense>
        <OverviewTabCtn />
      </Suspense>
    ),
    2: (
      <Suspense fallback={<Shimmer height={400} />}>
        <EnvVariablesCtn />
      </Suspense>
    ),
    3: (
      <Suspense fallback={<Shimmer height={300} />}>
        <NotDataCard />
      </Suspense>
    ),
    4: (
      <Suspense>
        <EventHistory showAll />
      </Suspense>
    ),
  };

  return (
    <>
      <Suspense fallback={<Shimmer height={50} />}>
        <ProjectStatusHeader />
      </Suspense>
      <Suspense fallback={<Shimmer height={20} />}>
        <ProjectTabs selectedTab={selectedTab} />
      </Suspense>
      {COMPONENT_MAP[selectedTab]}
    </>
  );
};

export default Dashboard;
