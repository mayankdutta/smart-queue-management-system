import React from 'react';

import { styled } from '@mui/material/styles';


// import './printQueue.css';
import { Link } from 'react-router-dom';
import { PatientContext } from '../../contexts/patient.context';
import { useContext } from 'react';

import TablePagination from '@mui/material/TablePagination';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Typography from '@mui/material/Typography';

const PrintQueue = ({ data, edit }) => {
  const { deleteUserPatient } = useContext(PatientContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <main>
      <Typography variant="h5" gutterBottom>
        {edit ? <> Your Patients </> : <> Patients for today </>}
      </Typography>

      <TableContainer sx={{maxWidth: 'max-content'}} component={Paper}>
        <Table sx={{ maxHeight: '440' }} size="" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S. no</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Patient No.</StyledTableCell>
              {edit && <StyledTableCell>Edit</StyledTableCell>}
              {edit && <StyledTableCell>Delete</StyledTableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

              .map((value, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell className={'name'}>
                      <Link to={'/details'}>{value.name}</Link>
                    </StyledTableCell>
                    <StyledTableCell>{value.rank}</StyledTableCell>
                    {edit && (
                      <>
                        <StyledTableCell>
                          <Link to={'/update_patient/' + value._id}>
                            <EditIcon />
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell
                          onClick={() => deleteUserPatient(value._id)}
                        >
                          <DeleteIcon />
                        </StyledTableCell>
                      </>
                    )}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </TableContainer>
    </main>
  );
};

export default PrintQueue;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  root: {
    padding: '0px 12px 0px 0px',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
