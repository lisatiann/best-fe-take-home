import { useState } from "react";
// import CreateTaskDialog from "./CreateTaskDialog";
import Task from "./Task";
import ToolBar from "./ToolBar";
import { Button, Table, TableBody, TableContainer, TableHead, Paper, TablePagination } from "@mui/material";
import mockData from '../assets/mockData.json';

// manually set the order of priority and status
const priorityOrder = { none: 1, low: 2, medium: 3, high: 4, urgent: 5 };
const statusOrder = { not_started: 1, in_progress: 2, completed: 3 };

const getOrderValue = (orderBy, value) => {
  if (orderBy === 'priority') {
    return priorityOrder[value];
  }
  if (orderBy === 'completionStatus') {
    return statusOrder[value];
  }
  return value;
};

const TableView = () => {
  const [tasks, setTasks] = useState(mockData);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');

  // sort the tasks array based on the selected column
  const handleRequestSort = (event, property) => {
    // if the selected column is already the current column, reverse the order
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // change the current page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // change the number of rows displayed per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // sort the tasks array based on the selected column
  const sortedTasks = tasks.sort((a, b) => {
    const aValue = getOrderValue(orderBy, a[orderBy]);
    const bValue = getOrderValue(orderBy, b[orderBy]);
    return (aValue < bValue ? -1 : 1) * (order === 'asc' ? 1 : -1);
  });

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        {/* <Button variant="contained" onClick={() => setOpen(true)}>Create Task</Button>
        <CreateTaskDialog open={open} onClose={() => setOpen(false)} onCreate={handleCreateTask} /> */}
        <Table>
          <TableHead>
            <ToolBar
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
          </TableHead>
          <TableBody>
            {/* slice the tasks array to display only the current page */}
            {sortedTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => (
              <Task
                key={index}
                title={task.title}
                priority={task.priority}
                completionStatus={task.status}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default TableView;