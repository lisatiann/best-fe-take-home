import { TableRow, TableCell } from '@mui/material';
import { completionStatusLabel } from "../constant";
import PropTypes from 'prop-types';

const Task = ({ task, toolBarTitles }) => {
  return (
    <TableRow>
      {toolBarTitles.map((title, index) => (
        <TableCell key={index}>
          {title === 'Priority' ? task[title.toLowerCase()][0].toUpperCase() + task[title.toLowerCase()].slice(1) :
           title === 'Status' ? completionStatusLabel[task[title.toLowerCase()]] :
           task[title.toLowerCase()] !== undefined ? task[title.toLowerCase()].toString() : ''}
        </TableCell>
      ))}
    </TableRow>
  )
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  toolBarTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Task;