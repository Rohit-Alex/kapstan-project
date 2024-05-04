import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ProjectStatusHeader = () => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h4">tic-tac-toe</Typography>
      <Box display="flex" gap="1" alignItems="center">
        <Box
          py={0.5}
          px={1}
          borderRadius={1}
          border="1px solid #05b88c"
          sx={{ background: "#effcf9", color: "#05b88c" }}
        >
          <Typography variant="body2" component="p">
            Deployed
          </Typography>
        </Box>
        <MoreVertIcon />
      </Box>
    </Box>
  );
};

export default ProjectStatusHeader;
