import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import Row from './Row/Row'

const CustomPaginationActionTable = ({sortedApplicationList}) => {

  const columns = [
    {id: 'name', label: 'Name', maxWidth: 170},
    {id: 'group', label: 'Group', maxWidth: 170},
    {id: 'crossedBorder', label: 'Crossed border', maxWidth: 170},
    {id: 'needs', label: 'Needs', maxWidth: 170}
    // { id: 'action', label: 'Action', minWidth: 170 }
  ]


  return (
    <>
      <Paper sx={{width: '100%', overflow: 'hidden'}}>
        <TableContainer sx={{maxHeight: 440}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{minWidth: column.minWidth}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedApplicationList
                .map((row, index) => {
                  return (
                    <Row key={index} row={row}/>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

export default CustomPaginationActionTable