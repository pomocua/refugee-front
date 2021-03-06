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

const CustomPaginationActionTable = ({applicationList, isLoading}) => {

  const columns = [
    {id: 'name', label: 'Name', maxWidth: 170},
    {id: 'group', label: 'Group', maxWidth: 170},
    {id: 'crossedBorder', label: 'Crossed border', maxWidth: 170},
    {id: 'needs', label: 'Needs', maxWidth: 170}
  ]

  return (
    <>
      <Paper sx={{width: '100%', overflow: 'hidden'}}>
        <TableContainer sx={{maxHeight: 440}}>
          <Table stickyHeader aria-label="customized  table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      background: '#FAFAFA'
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {applicationList
                .map((row, index) => {
                  return (
                    <Row key={index} row={row} isLoading={isLoading}/>
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