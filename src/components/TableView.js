import { useState, useMemo, useEffect } from "react";
import CreateAndEditTaskDialog from "./CreateAndEditTaskDialog";
import Task from "./Task";
import ToolBar from "./ToolBar";
import FilterTools from "./FilterTools";
import { Button, Table, TableBody, TableContainer, TableHead, Paper, TablePagination, Box, Typography } from "@mui/material";
import { priorityOrder, statusOrder } from "../constant";
import { saveDataToLocalStorage, loadDataFromLocalStorage } from "../utils/taskUtils";
import mockData from '../assets/mockData.json';

// manually set the order of priority and status
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
  const { tasks: initialTasks, toolBarTitles: initialToolBarTitles, customFields: initialCustomFields } = loadDataFromLocalStorage();
  const [tasks, setTasks] = useState(initialTasks.length ? initialTasks : mockData);
  const [toolBarTitles, setToolBarTitles] = useState(initialToolBarTitles);
  const [customFields, setCustomFields] = useState(initialCustomFields);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [filter, setFilter] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    saveDataToLocalStorage(tasks, toolBarTitles, customFields);
  }, [tasks, toolBarTitles, customFields]);

  // sort the tasks array based on the selected column
  const handleRequestSort = (event, property) => {
    // if the selected column is already the current column, reverse the order
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // change the number of rows displayed per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // memoize and update the order based on the selected column
  const sortedTasks = useMemo(() => {
    return tasks.slice().sort((a, b) => {
      const aValue = getOrderValue(orderBy, a[orderBy]);
      const bValue = getOrderValue(orderBy, b[orderBy]);
      return (aValue < bValue ? -1 : 1) * (order === 'asc' ? 1 : -1);
    });
  }, [tasks, order, orderBy]);

  // filter the tasks based on the search input and selected filters
  const filteredTasks = useMemo(() => {
    return sortedTasks.filter(task => {
      const matchesSearch = Object.keys(task).some(key => {
        if (typeof task[key] === "string" || typeof task[key] === "number") {
          return task[key].toString().toLowerCase().includes(filter.toLowerCase());
        }
        return false;
      });

      const matchesFilters = Object.keys(filters).every(key => {
        if (typeof task[key] === "boolean") {
          return task[key] === filters[key];
        }
        return task[key] === filters[key];
      });

      return matchesSearch && matchesFilters;
    });
  }, [sortedTasks, filter, filters]);

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (updatedTask) => {
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    setTasks([...tasks.slice(0, index), updatedTask, ...tasks.slice(index + 1)]);
  };

  const handleAddField = (field) => {
    setToolBarTitles([...toolBarTitles, field.title]);
    setCustomFields([...customFields, field]);
    setTasks(tasks.map(task => {
      return { ...task, [field.title]: field.type === 'checkbox' ? false : '' };
    }));
  };

  const handleDeleteField = (title) => {
    setCustomFields(customFields.filter(field => field.title !== title));
    setTasks(tasks.map(task => {
      const { [title]: deletedField, ...rest } = task;
      return rest;
    }));
    setToolBarTitles(toolBarTitles.filter(toolBarTitle => toolBarTitle !== title));
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Task Management
      </Typography>
      <TableContainer component={Paper}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', padding: '10px', height: '35px' }}>
          <Box sx={{ flexGrow: 1, flexShrink: 1, marginRight: '10px' }}>
            <FilterTools
              filter={filter}
              setFilter={setFilter}
              toolBarTitles={toolBarTitles}
              customFields={customFields}
              filters={filters}
              setFilters={setFilters}
            />
          </Box>
          <Button variant="contained" onClick={() => setOpen(true)}>Create Task</Button>
        </Box>
        <CreateAndEditTaskDialog
          newID={tasks.length + 1}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreateTask}
          toolBarTitles={toolBarTitles}
          customFields={customFields}
        />
        <Table>
          <TableHead>
            <ToolBar
              toolBarTitles={toolBarTitles}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onAddField={handleAddField}
              onDeleteField={handleDeleteField}
              setToolBarTitles={setToolBarTitles}
            />
          </TableHead>
          <TableBody>
            {/* slice the tasks array to display only the current page */}
            {filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => (
              <Task
                key={index}
                task={task}
                toolBarTitles={toolBarTitles}
                handleEditTask={handleEditTask}
                customFields={customFields}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={filteredTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default TableView;