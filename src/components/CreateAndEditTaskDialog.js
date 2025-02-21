import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField, Box, Grid, Snackbar, Alert, FormHelperText } from "@mui/material";
import { completionStatusLabel, priorityOrder, statusOrder } from "../constant";
import PropTypes from "prop-types";
import CustomFieldInput from "./CustomFieldInput";

const CreateAndEditTaskDialog = ({ isEditMode, task, newID, open, onClose, onCreate, onEdit, toolBarTitles, customFields }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [customFieldValues, setCustomFieldValues] = useState({});
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // set the initial values of the fields when the dialog is opened
  // if the dialog is in edit mode, set the values of the task
  // if the dialog is in create mode, set the values to empty
  useEffect(() => {
    if (isEditMode && task) {
      setTitle(task.title || "");
      setPriority(task.priority || "");
      setStatus(task.status || "");
      const initialCustomFieldValues = {};
      customFields.forEach(field => {
        initialCustomFieldValues[field.title] = task[field.title] || (field.type === "checkbox" ? false : "");
      });
      setCustomFieldValues(initialCustomFieldValues);
    } else {
      setTitle("");
      setPriority("");
      setStatus("");
      setCustomFieldValues({});
    }
  }, [isEditMode, task, customFields]);

  const handleSave = () => {
    if (!title) {
      setError("Title is required");
      setSnackbarOpen(true);
      return;
    }

    const newTask = {
      id: isEditMode ? task.id : newID,
      title,
      priority,
      status,
      ...customFieldValues
    };

    if (isEditMode) {
      onEdit(newTask);
    } else {
      onCreate(newTask);
    }
    onClose();
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === "priority") {
      setPriority(value);
    } else if (name === "status") {
      setStatus(value);
    } else {
      setCustomFieldValues({
        ...customFieldValues,
        [name]: type === "checkbox" ? checked : value
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const checkboxFields = customFields.filter(field => field.type === "checkbox");
  const otherFields = customFields.filter(field => field.type !== "checkbox");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? "Edit Task" : "Create Task"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: '10px' }}>
          {toolBarTitles.includes("Title") && (
            <FormControl fullWidth error={!!error}>
              <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
              {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
          )}
          <Grid container spacing={2}>
            {toolBarTitles.includes("Priority") && (
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    name="priority"
                    value={priority}
                    onChange={handleChange}
                    label="Priority"
                  >
                    <MenuItem value=""><em>No Selection</em></MenuItem>
                    {Object.keys(priorityOrder).map((key) => (
                      <MenuItem key={key} value={key}>{key[0].toUpperCase() + key.slice(1)}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {toolBarTitles.includes("Status") && (
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    name="status"
                    value={status}
                    onChange={handleChange}
                    label="Status"
                  >
                    <MenuItem value=""><em>No Selection</em></MenuItem>
                    {Object.keys(statusOrder).map((key) => (
                      <MenuItem key={key} value={key}>{completionStatusLabel[key]}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
          {otherFields.map((field, index) => (
            <CustomFieldInput
              key={index}
              field={field}
              value={customFieldValues[field.title]}
              onChange={handleChange}
            />
          ))}
          {checkboxFields.length === 1 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CustomFieldInput
                field={checkboxFields[0]}
                value={customFieldValues[checkboxFields[0].title]}
                onChange={handleChange}
              />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {checkboxFields.map((field, index) => (
                <Grid item xs={6} key={index}>
                  <CustomFieldInput
                    field={field}
                    value={customFieldValues[field.title]}
                    onChange={handleChange}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>{isEditMode ? "Save" : "Create"}</Button>
      </DialogActions>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Dialog>
  )
};

CreateAndEditTaskDialog.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
  task: PropTypes.object,
  newID: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  toolBarTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  customFields: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};

export default CreateAndEditTaskDialog;