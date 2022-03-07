import React from 'react'
import {Box, styled, TableCell, TableRow} from '@mui/material'
import ModalUnstyled from '@mui/base/ModalUnstyled'
import ModalContent from '../../ModalContent/ModalContent'
import HouseIcon from '@mui/icons-material/House'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'


const Row = ({row}) => {

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const dateCreated = new Date(row.createdAt)
  const dateNow = new Date()
  const dateResult = getNumberOfDays(dateCreated, dateNow)

  const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    padding: 10%;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  const Backdrop = styled('div')`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `
  const style = {
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3
  }

  function getNumberOfDays(start, end) {
    const date1 = new Date(start)
    const date2 = new Date(end)

    const oneDay = 1000 * 60 * 60 * 24
    const diffInTime = date2.getTime() - date1.getTime()
    return Math.round(diffInTime / oneDay)
  }

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} onClick={handleOpen}>
        <TableCell align="left">
          {row.fullName}
        </TableCell>
        <TableCell align="left">
          {`${row.numberOfAdults} ${row.numberOfAdults > 1 ? 'adults' : 'adult'} ${row.numberOfChildren} ${row.numberOfChildren > 1 ? 'kids' : 'kid'}`}
        </TableCell>

        <TableCell align="left">
          {new Date(row.createdAt).toLocaleDateString()}
          &ensp;-&ensp;
          {dateResult === 0 ? 'today' : `${dateResult} ${dateResult > 1 ? 'days ago' : 'day ago'}`}
        </TableCell>
        <TableCell align="left">
          {row.transport ? <LocalShippingIcon fontSize="large"/> : null}
          &ensp;
          {row.accomodation ? <HouseIcon fontSize="large"/> : null}
        </TableCell>
      </TableRow>
      <StyledModal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <ModalContent data={row}/>
        </Box>
      </StyledModal>
    </>
  )
}

export default Row