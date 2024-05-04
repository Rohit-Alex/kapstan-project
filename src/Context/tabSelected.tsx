import React, { useState } from "react";
import { ApplicationStatusResponse, TABS_OPTION } from "types";

export type DashboardTabContextType = {
  selectedTab: TABS_OPTION;
  selectedApp: ApplicationStatusResponse;
  handleTabChange: (tabIndex: number) => void;
  handleAppChange: (newApp: ApplicationStatusResponse) => void;
};

export const DashboardTabContext =
  React.createContext<DashboardTabContextType | null>(null);

const DashboardTabProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTab, setSelectedTab] = useState(TABS_OPTION.OVERVIEW);
  const [selectedApp, setSelectedApp] = useState(
    {} as ApplicationStatusResponse
  );

  const handleTabChange = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  const handleAppChange = (newApp: ApplicationStatusResponse) => {
    setSelectedApp(newApp);
  };

  return (
    <DashboardTabContext.Provider
      value={{
        selectedApp,
        selectedTab,
        handleAppChange,
        handleTabChange,
      }}
    >
      {children}
    </DashboardTabContext.Provider>
  );
};

export default DashboardTabProvider;
