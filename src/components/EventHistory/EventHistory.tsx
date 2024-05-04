import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Link from "@mui/material/Link";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { dummyEventHistory } from "constant";
import { getTimeLag } from "utils";
import { PropsType } from "./types";
import { useContext, useEffect, useState } from "react";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";
import { TABS_OPTION } from "types";
import {
  triggerEventHistoryAPI,
  useEventHistory,
} from "Slices/FetchEventHistory";

import StatusBox from "components/StatusBox";
import { useAppDispatch } from "Hooks/useReduxHooks";

const EventHistory: React.FC<PropsType> = ({ showAll }) => {
  const { status: eventHistoryStatus, data: eventHistoryData } =
    useEventHistory();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiCalls();
  }, []);

  useEffect(() => {
    if (["fetched", "error"].includes(eventHistoryStatus)) {
      setLoading(false);
    }
  }, [eventHistoryStatus, eventHistoryData]);

  const apiCalls = () => {
    if (eventHistoryStatus !== "fetched") {
      dispatch(triggerEventHistoryAPI() as any);
    }
  };

  const { handleTabChange } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  return (
    <Card sx={{ borderRadius: "8px" }}>
      <CardContent>
        {loading ? (
          "Loading...."
        ) : (
          <>
            <Typography variant="headerText">Event History</Typography>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Event</TableCell>
                  <TableCell align="center">Version</TableCell>
                  <TableCell align="center" width="40%">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(showAll
                  ? dummyEventHistory
                  : dummyEventHistory.slice(0, 5)
                ).map((row, idx) => {
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
                      <TableCell
                        align="center"
                        component="th"
                        style={{ width: "20%" }}
                      >
                        <StatusBox status={row.status} />
                      </TableCell>
                    </TableRow>
                  );
                })}
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EventHistory;
