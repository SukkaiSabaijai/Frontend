import React, { forwardRef } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const TextFieldCustom = forwardRef<HTMLDivElement, TextFieldProps>(
  ({ label, ...props }, ref) => {
    return (
      <TextField
        label={label}
        sx={{width:'100%'}}
        InputProps={{
          style: { fontSize: 14 },
          ...props.InputProps,
        }}
        InputLabelProps={{
          style: { fontSize: 14 },
          ...props.InputLabelProps,
        }}
        {...props} 
        ref={ref} 
      />
    );
  }
);

TextFieldCustom.displayName = "TextFieldCustom";

export default TextFieldCustom;
