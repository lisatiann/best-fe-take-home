import { useState } from 'react';
import { Button, TableRow, TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { completionStatusLabel } from "../constant";
import CreateAndEditTaskDialog from './CreateAndEditTaskDialog';
import PropTypes from 'prop-types';

const Task = ({ task, toolBarTitles, handleEditTask, customFields }) => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <TableRow>
      {toolBarTitles.map((title, index) => (
        <TableCell key={index}>
          {title === 'Priority' ? task[title.toLowerCase()]?.[0].toUpperCase() + task[title.toLowerCase()].slice(1) :
           title === 'Status' ? completionStatusLabel[task[title.toLowerCase()]] :
           task[title.toLowerCase()] !== undefined ? task[title.toLowerCase()].toString() : ''}
        </TableCell>
      ))}
      <TableCell>
        <Button>
          <EditIcon onClick={()=> setOpenEdit(true)} />
        </Button>
      </TableCell>
      <CreateAndEditTaskDialog isEditMode={true} task={task} open={openEdit} onClose={() => setOpenEdit(false)} onEdit={handleEditTask} toolBarTitles={toolBarTitles} customFields={customFields} />
    </TableRow>
  )
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  toolBarTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleEditTask: PropTypes.func.isRequired,
  customFields: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};

export default Task;