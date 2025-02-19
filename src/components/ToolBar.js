import { TableCell, TableRow, TableSortLabel } from "@mui/material";
import PropTypes from 'prop-types';

const ToolBar = ({ order, orderBy, onRequestSort }) => {
  const toolBarTitles = ['Title', 'Priority', 'Status'];
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableRow>
      {toolBarTitles.map((title, index) => (
        <TableCell key={index}>
          <TableSortLabel
            active={orderBy === title.toLowerCase()}
            direction={orderBy === title.toLowerCase() ? order : 'asc'}
            onClick={createSortHandler(title.toLowerCase())}
          >
            {title}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  );
};

ToolBar.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default ToolBar;