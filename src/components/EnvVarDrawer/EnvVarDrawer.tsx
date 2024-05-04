import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { envVarType, PropsType } from "./types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import upArrow from "assets/arrow-up.svg";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { purple } from "@mui/material/colors";
import { toast } from "react-toastify";

const EnvVarDrawer: React.FC<PropsType> = ({
  open,
  handleClose,
  saveEnvVar,
}) => {
  const [envVars, setEnvVars] = useState<Partial<envVarType[]>>([]);
  const [key, setKey] = useState(0);

  const handleRemoveEnv = (index: number) => {
    // setEnvVars((prev) => prev.toSpliced(index, 1));
    setEnvVars((prev) => {
      const updatedEnvVars = [...prev];
      updatedEnvVars.splice(index, 1);
      return updatedEnvVars;
    });
  };

  const clearDataAndClose = () => {
    setEnvVars([]);
    handleClose();
  };

  const handleChangeKeyOrValue =
    (type: "key" | "value", index: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEnvVars((prev) => {
        const updatedEnvVars = [...prev];
        const updatedEnv = { ...updatedEnvVars[index] };
        updatedEnv[type] = event.target.value;
        updatedEnvVars[index] = updatedEnv as envVarType;
        return updatedEnvVars;
      });
    };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [fileUploaded] = Array.from(event.target?.files ?? []);
    console.log({ fileUploaded });
    if (!fileUploaded) return;
    if (!["", ".env"].includes(fileUploaded.type)) {
      toast.error("Please upload .env file only");
      return;
    }
    if (fileUploaded.size > 1024 * 5) {
      toast.error("Please upload .env file of size less than 5kb");
      return;
    }
    setKey((prev) => prev + 1);
    readCsvFile(fileUploaded);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    readCsvFile(file);
  };

  const readCsvFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const data = await parseCsv(text);
      setEnvVars(data);
    };

    reader.readAsText(file);
  };

  const parseCsv = (csvText: string) => {
    return new Promise<envVarType[]>((resolve, reject) => {
      const rows = csvText.split("\n");
      const result = [] as envVarType[];
      console.log({ rows });
      for (let i = 0; i < rows.length; i++) {
        const obj = {} as envVarType;
        const [key, value] = rows[i].split("=");
        if (key?.trim() && value?.trim()) {
          obj.key = key?.trim();
          obj.value = value?.trim();
          result.push(obj);
        }
      }
      resolve(result);
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSave = () => {
    saveEnvVar([...(envVars as envVarType[])]);
    setEnvVars([]);
    toast.success("Environemnt variables saved.");
    handleClose();
  };

  const DrawerList = (
    <Box sx={{ minWidth: 700 }}>
      <CloseIcon
        onClick={clearDataAndClose}
        sx={{ position: "absolute", right: 10, top: 10 }}
      />
      <Box p={1.5} mt={8} mx={4} border="1px solid #EBEBEB" borderRadius={1}>
        {envVars.length === 0 && (
          <>
            <Box
              height={80}
              p={1.5}
              display="flex"
              justifyContent="center"
              sx={{ background: "#f8f8f8" }}
              border="1px dashed #BDBDBD"
              borderRadius={1}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <label
                htmlFor="upload_csv_file"
                className="content-center flex-column"
              >
                <img src={upArrow} alt="up-arrow" />
                <Typography
                  variant="body2"
                  sx={{ fontSize: 14, fontWeight: 700 }}
                >
                  Click or drag file(s) here to upload
                </Typography>
                <input
                  type="file"
                  className="none"
                  onChange={handleUpload}
                  id="upload_csv_file"
                  key={key}
                />
              </label>
            </Box>
            <Typography sx={{ fontSize: 12, fontWeight: 500 }} mt={1}>
              Upload a .env file. It should not be greater than 5KB.
            </Typography>
          </>
        )}
        {envVars.length !== 0 &&
          envVars.map((env, idx) => (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
              my={2}
              key={idx}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="subtitle1" color="text.secondary">
                  Name
                </Typography>
                <TextField
                  size="small"
                  value={env?.key}
                  onChange={handleChangeKeyOrValue("key", idx)}
                />
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="subtitle1" color="text.secondary">
                  Value
                </Typography>
                <TextField
                  size="small"
                  value={env?.value}
                  onChange={handleChangeKeyOrValue("value", idx)}
                />
              </Box>
              <DeleteOutlineOutlinedIcon
                onClick={() => handleRemoveEnv(idx)}
                sx={{ cursor: "pointer" }}
              />
            </Box>
          ))}

        <Link
          href={"/sample.env"}
          target="_blank"
          download={"/sample.env"}
          component="a"
        >
          <Button variant="outlined" fullWidth color="primary" sx={{ my: 1 }}>
            Download Sample File
          </Button>
        </Link>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button variant="outlined" onClick={clearDataAndClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ background: purple[900] }}
            onClick={handleSave}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Drawer open={open} onClose={handleClose} anchor="right">
      {DrawerList}
    </Drawer>
  );
};

export default EnvVarDrawer;
