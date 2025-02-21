import { useState } from 'react';
import { Button, TableRow, TableCell, Chip } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { completionStatusLabel, priorityColors, statusColors } from "../constant";
import CreateAndEditTaskDialog from './CreateAndEditTaskDialog';
import PropTypes from 'prop-types';

const Task = ({ task, toolBarTitles, handleEditTask, customFields }) => {
  const [openEdit, setOpenEdit] = useState(false);

  const getChipColor = (title, value) => {
    if (title === 'Priority') {
      return priorityColors[value] || 'default';
    }
    if (title === 'Status') {
      return statusColors[value] || 'default';
    }
    return 'default';
  };

  return (
    <TableRow sx={{ height: '40px' }}>
      {toolBarTitles.map((title, index) => (
        <TableCell
          key={index}
          sx={{
            padding: '8px',
            paddingLeft: '16px',
            borderLeft: index !== 0 ? '1px solid rgba(224, 224, 224, 1)' : 'none'
          }}
        >
          {title === 'Priority' && task[title.toLowerCase()] ? (
            <Chip
              label={task[title.toLowerCase()]?.[0]?.toUpperCase() + task[title.toLowerCase()].slice(1)}
              sx={{ backgroundColor: getChipColor(title, task[title.toLowerCase()]), color: 'white' }}
            />
          ) : title === 'Status' && task[title.toLowerCase()] ? (
            <Chip
              label={completionStatusLabel[task[title.toLowerCase()]]}
              sx={{ backgroundColor: getChipColor(title, task[title.toLowerCase()]), color: 'white' }}
            />
          ) : (
            task[title.toLowerCase()] !== undefined ? task[title.toLowerCase()].toString() : ''
          )}
        </TableCell>
      ))}
      <TableCell sx={{ padding: '8px', paddingLeft: '8px', borderLeft: '1px solid rgba(224, 224, 224, 1)' }}>
        <Button>
          <MoreHorizIcon onClick={()=> setOpenEdit(true)} />
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