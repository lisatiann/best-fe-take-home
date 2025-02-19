import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { completionStatusLabel, priorityOrder, statusOrder } from "../constant";
import PropTypes from "prop-types";

const CreateTaskDialog = ({ newID, open, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const handleCreate = () => {
    const newTask = {
      id: newID,
      title,
      priority,
      status,
    };
    if (!title) {
      return alert("Title is required"); // if time, improve error
    }
    onCreate(newTask);
    setTitle("");
    setPriority("");
    setStatus("");
    onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "priority") {
      setPriority(value);
    } else if (name === "status") {
      setStatus(value);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  )
};

CreateTaskDialog.propTypes = {
  newID: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CreateTaskDialog;