import type { TextFieldProps } from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

type Props = TextFieldProps & {
  name: string;
};

export function RHFTextField({ name, helperText, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === "number" && field.value === 0 ? "" : field.value}
          onChange={(event) => {
            if (type === "number") {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error?.message ?? helperText}
          InputProps={{
            style: { fontSize: 14 },
            ...other.InputProps,
          }}
          InputLabelProps={{
            style: { fontSize: 14 },
            ...other.InputLabelProps,
          }}
          FormHelperTextProps={{
            sx: {
              fontSize: "12px",
              color: "#ef4444  !important",
            },
          }}
          inputProps={{
            autoComplete: "off",
            ...other.inputProps,
          }}
          {...other}
        />
      )}
    />
  );
}
