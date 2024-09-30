import TextField from "@mui/material/TextField";
import React, { ChangeEvent } from "react";

type Props = {
  label: string;
  onClick?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const SearchInput = ({ label, onClick, onChange }: Props) => {
  return (
    <TextField
      label={label}
      inputProps={{ autoComplete: "off", onChange, onClick }}
      sx={{
        backgroundColor: "white",
        borderRadius: "12px",
        "& .MuiFormLabel-root": {
          color: "black",
          "&.Mui-focused": {
            color: "black",
          },
        },
        "& .MuiOutlinedInput-root": {
          height: "48px",
          borderRadius: "12px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          "& fieldset": {
            borderRadius: "12px",
            borderColor: "transparent",
            color: "black",
          },
          "&:hover fieldset": {
            borderColor: "transparent",
            color: "black",
          },
          "&.Mui-focused fieldset": {
            borderColor: "transparent",
            color: "black",
          },
        },
        "& .MuiInputBase-input": {
          height: "28px",
          padding: "20px",
          color: "black",
        },
      }}
    />
  );
};

export default SearchInput;
