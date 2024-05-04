import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { grey } from "@mui/material/colors";
import { PropsType } from "./types";
import { useContext } from "react";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";

const TABS = [
  {
    icon: <ComputerOutlinedIcon />,
    text: "Overview",
  },
  {
    icon: <HandymanOutlinedIcon />,
    text: "Environment Variables",
  },
  {
    icon: <ReportProblemOutlinedIcon />,
    text: "Alerts",
  },
  {
    icon: <HistoryOutlinedIcon />,
    text: "Event History",
  },
];

const ProjectTabs: React.FC<PropsType> = ({ selectedTab }) => {
  const { handleTabChange } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  const tabClicked = (index: number) => {
    handleTabChange(index + 1);
  };

  return (
    <Box my={2} display="flex" alignItems="center" gap={2}>
      {TABS.map((tab, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          onClick={() => tabClicked(index)}
          sx={{ cursor: "pointer" }}
        >
          {tab.icon}
          <Typography
            ml={1}
            variant="body2"
            fontWeight={selectedTab === index + 1 ? 700 : "unset"}
            color={selectedTab === index + 1 ? "unset" : grey[500]}
          >
            {tab.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProjectTabs;
