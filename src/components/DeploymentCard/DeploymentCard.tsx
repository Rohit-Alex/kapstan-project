import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { useContext } from "react";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";
import { getTimeLag } from "utils";
import { ApplicationStatusResponse } from "types";

const DeploymentCard = () => {
  const { selectedApp = {} as ApplicationStatusResponse } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  const { desiredVersion, version, updatedAt } = selectedApp;

  return (
    <Card sx={{ borderRadius: "8px" }}>
      <CardContent>
        <Typography variant="headerText">Service Info</Typography>
        <Box display="flex" my={2} gap={8}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Current version
            </Typography>
            <Typography variant="body1">
              {version === desiredVersion ? "In sync" : version ?? "---"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Desired version
            </Typography>
            <Typography variant="body1">{desiredVersion}</Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" sx={{ background: purple[900] }}>
            Deploy
          </Button>
          <Typography variant="caption" color="text.secondary">
            {`Last updated ${getTimeLag(+updatedAt * 1000)}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DeploymentCard;
