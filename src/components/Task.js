import { TableRow, TableCell } from '@mui/material';
import PropTypes from 'prop-types';

const Task = ({ id, title, priority, completionStatus }) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{priority}</TableCell>
      <TableCell>{completionStatus}</TableCell>
    </TableRow>
  )
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  completionStatus: PropTypes.bool.isRequired,
};

export default Task;