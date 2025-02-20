import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { completionStatusLabel, priorityOrder, statusOrder } from "../constant";
import PropTypes from "prop-types";
import CustomFieldInput from "./CustomFieldInput";

const CreateAndEditTaskDialog = ({ isEditMode, task, newID, open, onClose, onCreate, onEdit, toolBarTitles, customFields }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [customFieldValues, setCustomFieldValues] = useState({});

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
    const newTask = {
      id: isEditMode ? task.id : newID,
      title,
      priority,
      status,
      ...customFieldValues
    };
    if (!title) {
      return alert("Title is required"); // if time, improve error
    }
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditMode ? "Edit Task" : "Create Task"}</DialogTitle>
      <DialogContent>
        {toolBarTitles.includes("Title") && (
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        )}
        {toolBarTitles.includes("Priority") && (
          <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              name="priority"
              value={priority}
              onChange={handleChange}
            >
              {Object.keys(priorityOrder).map((key) => (
                <MenuItem key={key} value={key}>{key[0].toUpperCase() + key.slice(1)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {toolBarTitles.includes("Status") && (
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={status}
              onChange={handleChange}
            >
              {Object.keys(statusOrder).map((key) => (
                <MenuItem key={key} value={key}>{completionStatusLabel[key]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {customFields.map((field, index) => (
          <CustomFieldInput
            key={index}
            field={field}
            value={customFieldValues[field.title]}
            onChange={handleChange}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>{isEditMode ? "Save" : "Create"}</Button>
      </DialogActions>
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