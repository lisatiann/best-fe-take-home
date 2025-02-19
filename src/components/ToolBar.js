import { TableCell, TableRow } from "@mui/material"

const ToolBar = () => {
  return (
    <TableRow>
      <TableCell>Key</TableCell>
      <TableCell>Title</TableCell>
      <TableCell>Priority</TableCell>
      <TableCell>Completion Status</TableCell>
    </TableRow>
  )
}

export default ToolBar;