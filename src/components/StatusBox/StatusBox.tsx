import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import successBall from "assets/success-ball-large.svg";
import pendingBall from "assets/pending-ball.svg";
import failedBall from "assets/failed-ball-1.svg";

const GET_STATUS_MAPPING = (status: string) => {
  switch (status) {
    case "successful":
    case "deployed":
      return {
        text: status === "deployed" ? "Deployed" : "Successful",
        statusIcon: successBall,
        borderColor: "#05b88c",
        sxStyle: { background: "#effcf9", color: "#05b88c" },
      };
    case "in_progress":
    case "uninstalled":
      return {
        text: status === "in_progress" ? "In Progress" : "Uninstall",
        statusIcon: pendingBall,
        borderColor: "#f39c12",
        sxStyle: { background: "#fef6e6", color: "#f39c12" },
      };
    case "failed":
      return {
        text: "Failed",
        statusIcon: failedBall,
        borderColor: "#e92004",
        sxStyle: { background: "#fff4f2", color: "#e92004" },
      };

    default:
      return {
        text: status,
        statusIcon: pendingBall,
        borderColor: "#a69c8e",
        sxStyle: { background: "#e5e4e1", color: "#a69c8e" },
      };
  }
};

const StatusBox: React.FC<{ status: string }> = ({ status }) => {
  const reqObj = GET_STATUS_MAPPING(status);
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      py={0.5}
      px={1}
      borderRadius={1}
      border={`1px solid ${reqObj?.borderColor}`}
      sx={reqObj?.sxStyle}
    >
      <img src={reqObj?.statusIcon} alt="" />
      <Typography variant="body2" component="p">
        {reqObj?.text}
      </Typography>
    </Box>
  );
};

export default StatusBox;
