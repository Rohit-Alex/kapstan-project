import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { dummyEventHistory } from "constant";
import { getTimeLag } from "utils";
import { PropsType } from "./types";
import { useContext } from "react";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";
import { TABS_OPTION } from "types";

const STATUS_MAPPING = {
  successful: {
    text: "Successful",
    borderColor: "#05b88c",
    sxStyle: { background: "#effcf9", color: "#05b88c" },
  },
  in_progress: {
    text: "In Progress",
    borderColor: "#f39c12",
    sxStyle: { background: "#fef6e6", color: "#f39c12" },
  },
  failed: {
    text: "Failed",
    borderColor: "#e92004",
    sxStyle: { background: "#fff4f2", color: "#e92004" },
  },
};

const EventHistory: React.FC<PropsType> = ({ showAll }) => {
  const { handleTabChange } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  return (
    <Card sx={{ borderRadius: "8px" }}>
      <CardContent>
        <Typography variant="headerText">Event History</Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Event</TableCell>
              <TableCell align="center">Version</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(showAll ? dummyEventHistory : dummyEventHistory.slice(0, 5)).map(
              (row, idx) => {
                const reqObj =
                  STATUS_MAPPING[row.status as keyof typeof STATUS_MAPPING];
                return (
                  <TableRow
                    key={row.event + idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" align="left">
                      {row.event}
                      <Typography variant="caption" component="p">
                        {getTimeLag(+row.timestamp * 1000)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" component="th">
                      {row.version}
                    </TableCell>
                    <TableCell align="center" component="th">
                      <Box
                        py={0.5}
                        px={1}
                        borderRadius={1}
                        border={`1px solid ${reqObj.borderColor}`}
                        sx={reqObj.sxStyle}
                      >
                        <Typography variant="body2" component="p">
                          {reqObj.text}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
        {!showAll && (
          <Link
            variant="subtitle1"
            component="button"
            underline="always"
            onClick={() => handleTabChange(TABS_OPTION.HISTORY)}
          >
            view all
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default EventHistory;
