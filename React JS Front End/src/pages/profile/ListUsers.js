import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project import
import { fetchGetDataWithAuth } from 'client/client';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| LIST USERS TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'userid',
    align: 'left',
    disablePadding: false,
    label: 'User Id'
  },
  {
    id: 'firstName',
    align: 'left',
    disablePadding: false,
    label: 'First Name'
  },
  {
    id: 'lastName',
    align: 'left',
    disablePadding: false,
    label: 'Last Name'
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,

    label: 'Email'
  },
  {
    id: 'authorities',
    align: 'left',
    disablePadding: false,
    label: 'Authorities'
  },
  {
    id: 'editAuthorities',
    align: 'right',
    disablePadding: false,
    label: 'Edit Authorities'
  }
];

// ==============================|| List User TABLE - HEADER ||============================== //

function ListUserTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ListUserTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| List Users TABLE ||============================== //

export default function ListUsers() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    if (isLoggedIn) {
      fetchGetDataWithAuth('/auth/profile').then((res) => {
        if (res.data.authorities.indexOf('ADMIN') !== -1) {
          setIsAdmin(true);
          fetchGetDataWithAuth('/auth/users').then((response) => {
            setUsers(response.data);
          });
        }
      });
    } else {
      navigate('/login');
    }
  }, []);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box>
      {isAdmin && (
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' }
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            sx={{
              '& .MuiTableCell-root:first-of-type': {
                pl: 2
              },
              '& .MuiTableCell-root:last-of-type': {
                pr: 3
              }
            }}
          >
            <ListUserTableHead order={order} orderBy={orderBy} />
            <TableBody>
              {stableSort(users, getComparator(order, orderBy)).map((user, index) => {
                const isItemSelected = isSelected(index);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" align="left">
                      <Link color="secondary" component={RouterLink} to="">
                        {user.id}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{user.firstName}</TableCell>
                    <TableCell align="left">{user.lastName}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.authorities}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit Authorities">
                        <IconButton>
                          <ModeEditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                    <TableCell align="right"></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
