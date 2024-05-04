import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import EnvVarDrawer from "components/EnvVarDrawer";
import { envVarType } from "components/EnvVarDrawer/types";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useStorage from "Hooks/useStorage";

const EnvVariablesCtn = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [envVarSaved, setEnvVarSaved] = useStorage<envVarType[]>(
    "saved_env_var",
    [],
    window.localStorage
  );

  const toggleDrawerVisibility = (value: boolean) => () => {
    setDrawerOpen(value);
  };

  const saveEnvVar = (addedVal: envVarType[]) => {
    setEnvVarSaved(addedVal);
  };

  const handleRemoveEnv = (index: number) => {
    // setEnvVars((prev) => prev.toSpliced(index, 1));
    setEnvVarSaved((prev) => {
      const updatedEnvVars = [...prev];
      updatedEnvVars.splice(index, 1);
      return updatedEnvVars;
    });
  };

  return (
    <Paper
      square={false}
      elevation={3}
      sx={{
        mt: 4,
        p: 2,
        minHeight: 400,
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="headerText">Environment Variables</Typography>
        <Box>
          <AddIcon
            onClick={toggleDrawerVisibility(true)}
            sx={{ cursor: "pointer" }}
          />
          {/* <FileDownloadOutlinedIcon
            onClick={toggleDrawerVisibility(true)}
            sx={{ cursor: "pointer" }}
          /> */}
        </Box>
      </Box>
      {envVarSaved.length === 0 ? (
        <Typography color="text.secondary">
          No environment variables created
        </Typography>
      ) : (
        envVarSaved.map((env, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            border="1px solid #EBEBEB"
            borderRadius={1}
            my={2}
            p={1.5}
            width="80%"
          >
            <Typography>{env?.key}</Typography>
            <Typography>{env?.value}</Typography>
            <DeleteOutlineOutlinedIcon
              onClick={() => handleRemoveEnv(index)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
        ))
      )}
      <EnvVarDrawer
        open={drawerOpen}
        handleClose={toggleDrawerVisibility(false)}
        saveEnvVar={saveEnvVar}
      />
    </Paper>
  );
};

export default EnvVariablesCtn;
