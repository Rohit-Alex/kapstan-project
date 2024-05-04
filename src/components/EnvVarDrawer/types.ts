export type PropsType = {
  open: boolean;
  handleClose: () => void;
  saveEnvVar: (v: envVarType[]) => void;
};

export type envVarType = {
  key: string;
  value: string | number;
};
