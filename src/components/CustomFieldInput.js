import { TextField, Checkbox, FormControlLabel, FormControl } from "@mui/material";
import PropTypes from "prop-types";

const CustomFieldInput = ({ field, value, onChange }) => {
  return (
    <FormControl fullWidth>
      {field.type === "text" && (
        <TextField
          label={field.title[0].toUpperCase() + field.title.slice(1)}
          name={field.title}
          value={value || ""}
          onChange={onChange}
          fullWidth
        />
      )}
      {field.type === "number" && (
        <TextField
          label={field.title[0].toUpperCase() + field.title.slice(1)}
          name={field.title}
          type="number"
          value={value}
          onChange={onChange}
          fullWidth
        />
      )}
      {field.type === "checkbox" && (
        <FormControlLabel
          control={
            <Checkbox
              name={field.title}
              checked={value || false}
              onChange={onChange}
            />
          }
          label={field.title[0].toUpperCase() + field.title.slice(1)}
        />
      )}
    </FormControl>
  );
};

CustomFieldInput.propTypes = {
  field: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  onChange: PropTypes.func.isRequired,
};

export default CustomFieldInput;
