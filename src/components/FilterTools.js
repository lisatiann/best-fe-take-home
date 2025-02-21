import { useState } from "react";
import { TextField, IconButton, Menu, MenuItem, FormControl, InputLabel, Select, Checkbox, FormControlLabel, Button } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { priorityOrder, statusOrder, completionStatusLabel } from "../constant";
import PropTypes from "prop-types";

const FilterTools = ({ filter, setFilter, toolBarTitles, customFields, filters, setFilters }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleFilterIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    // if empty value is selected, remove the filter instead of filtering by empty value
    if (value === "") {
      const newFilters = { ...filters };
      delete newFilters[name];
      setFilters(newFilters);
    } else {
      setFilters({
        ...filters,
        [name]: type === "checkbox" ? checked : value
      });
    }
  };

  const handleResetFilters = () => {
    setFilter("");
    setFilters({});
  };

  return (
    <div>
      <TextField
        label="Search"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        fullWidth
      />
      <IconButton onClick={handleFilterIconClick}>
        <FilterListIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {toolBarTitles.map((title, index) => {
          const field = customFields.find(field => field.title === title);
          if (field) {
            if (field.type === "text" || field.type === "number") {
              return (
                <MenuItem key={index}>
                  <TextField
                    label={field.title}
                    name={field.title}
                    value={filters[field.title] || ""}
                    onChange={handleFilterChange}
                    fullWidth
                  />
                </MenuItem>
              );
            }
            if (field.type === "checkbox") {
              return (
                <MenuItem key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={field.title}
                        checked={filters[field.title] || false}
                        onChange={handleFilterChange}
                      />
                    }
                    label={field.title}
                  />
                </MenuItem>
              );
            }
          }
          if (title === "Priority" || title === "Status") {
            return (
              <MenuItem key={index}>
                <FormControl fullWidth>
                  <InputLabel id={`${title}-label`}>{title}</InputLabel>
                  <Select
                    labelId={`${title}-label`}
                    name={title.toLowerCase()}
                    value={filters[title.toLowerCase()] || ""}
                    onChange={handleFilterChange}
                  >
                    <MenuItem value=""></MenuItem>
                    {title === "Priority" && Object.keys(priorityOrder).map((key) => (
                      <MenuItem key={key} value={key}>{key[0].toUpperCase() + key.slice(1)}</MenuItem>
                    ))}
                    {title === "Status" && Object.keys(statusOrder).map((key) => (
                      <MenuItem key={key} value={key}>{completionStatusLabel[key]}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MenuItem>
            );
          }
          return null;
        })}
        <MenuItem>
          <Button onClick={handleResetFilters}>Reset Filters</Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

FilterTools.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  toolBarTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  customFields: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default FilterTools;
