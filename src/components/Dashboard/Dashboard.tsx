import NotDataCard from "components/NotDataCard";
import ProjectStatusHeader from "components/ProjectStatusHeader";
import ProjectTabs from "components/ProjectTabs";
import OverviewTabCtn from "Container/OverviewTabCtn";
import EnvVariablesCtn from "Container/EnvVariablesCtn";
import { useContext } from "react";
import EventHistory from "components/EventHistory";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";

const Dashboard = () => {
  const { selectedTab } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  const COMPONENT_MAP = {
    1: <OverviewTabCtn />,
    2: <EnvVariablesCtn />,
    3: <NotDataCard />,
    4: <EventHistory showAll />,
  };

  return (
    <>
      <ProjectStatusHeader />
      <ProjectTabs selectedTab={selectedTab} />
      {COMPONENT_MAP[selectedTab]}
    </>
  );
};

export default Dashboard;
