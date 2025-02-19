import { TableRow, TableCell } from '@mui/material';
import { completionStatusLabel } from "../constant";

import PropTypes from 'prop-types';

const Task = ({ title, priority, completionStatus }) => {
  return (
    <TableRow>
      <TableCell>{title}</TableCell>
      <TableCell>{priority[0].toUpperCase() + priority.slice(1)}</TableCell>
      <TableCell>{completionStatusLabel[completionStatus]}</TableCell>
    </TableRow>
  )
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  completionStatus: PropTypes.bool.isRequired,
};

export default Task;