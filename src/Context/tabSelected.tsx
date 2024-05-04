import React, { useState } from "react";
import { TABS_OPTION } from "types";

export type DashboardTabContextType = {
  selectedTab: TABS_OPTION;
  handleTabChange: (tabIndex: number) => void;
};

export const DashboardTabContext =
  React.createContext<DashboardTabContextType | null>(null);

const DashboardTabProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTab, setSelectedTab] = useState(TABS_OPTION.OVERVIEW);

  const handleTabChange = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  return (
    <DashboardTabContext.Provider
      value={{
        selectedTab,
        handleTabChange,
      }}
    >
      {children}
    </DashboardTabContext.Provider>
  );
};

export default DashboardTabProvider;
