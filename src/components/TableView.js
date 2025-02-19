import { useState } from "react";
import Task from "./Task";
import ToolBar from "./ToolBar";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, } from "@mui/material";
import mockData from '../assets/mockData.json'

const TableView = () => {
  const [tasks, setTasks] = useState(mockData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <ToolBar />
          </TableHead>
          <TableBody>
            {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => (
              <Task
                key={index}
                id={task.id}
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