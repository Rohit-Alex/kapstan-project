import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";
import { useContext } from "react";
import StatusBox from "components/StatusBox";
import { useApplicationList } from "Slices/FetchProjectStatus";
import Shimmer from "components/Shimmer";

const ProjectStatusHeader = () => {
  const { selectedApp } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;
  const { status: applicationListStatus } = useApplicationList();
  const isloaded = ["fetched", "error"].includes(applicationListStatus);

  return !isloaded ? (
    <Shimmer height={50} />
  ) : (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h4">{selectedApp?.name}</Typography>
      <Box display="flex" gap="1" alignItems="center">
        <StatusBox status={selectedApp?.status} />
        <MoreVertIcon />
      </Box>
    </Box>
  );
};

export default ProjectStatusHeader;
