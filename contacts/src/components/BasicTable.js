import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper} from '@mui/material';
import { nanoid } from 'nanoid'

const BasicTable = ({listOfColumns, rows, rowNames}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
              {listOfColumns.map(columnsName => <TableCell key={nanoid()}>{columnsName}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={nanoid()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {rowNames.map(rowValue => <TableCell key={nanoid()}>{row[rowValue]}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable