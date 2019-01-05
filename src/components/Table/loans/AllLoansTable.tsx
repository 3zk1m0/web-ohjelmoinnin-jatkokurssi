import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import EditIcon from '@material-ui/icons/Edit';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { strict } from 'assert';

import AddDialog from './AddDialog';
import EditDialog from './EditDialog';
import SearchBox from '../SearchBox';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'device', numeric: false, disablePadding: true, label: 'Device' },
  { id: 'customer', numeric: false, disablePadding: true, label: 'Customer' },
  { id: 'dueDate', numeric: false, disablePadding: true, label: 'Duedate' },
  { id: 'loantime', numeric: false, disablePadding: true, label: 'Loan Time' },
  { id: 'returntime', numeric: false, disablePadding: true, label: 'Return Time' },
  { id: 'loanState', numeric: false, disablePadding: true, label: 'Loaning State' },
  { id: 'returnState', numeric: false, disablePadding: true, label: 'Return State' },
  { id: 'loanGiver', numeric: false, disablePadding: true, label: 'Loan Giver' },
  { id: 'loanReceiver', numeric: false, disablePadding: true, label: 'Loan Receiver' },
  { id: 'edit', numeric: false, disablePadding: true, label: 'Edit' },
  { id: 'delete', numeric: false, disablePadding: true, label: 'Delete' },
];

class UserTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

UserTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let LoansTableToolbar = props => {
  const { numSelected, classes } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Loans
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={() => {props.handleDeleteSelected()}}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <AddDialog addLoan={props.addLoan} />
        )}
      </div>
      <SearchBox handleSearch={props.handleSearch}/>
    </Toolbar>
  );
};

LoansTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

LoansTableToolbar = withStyles(toolbarStyles)(LoansTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class UserTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    data: [],
    filteredData: [],
    page: 0,
    rowsPerPage: 10,
  };
  
  componentWillMount = () => {
    fetch('http://localhost:9000/api/v1/loansystem/loans', { 
      method: 'GET', 
      headers: new Headers({
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 
        'Content-Type': 'application/json'
      }),
    })
    .then(response => response.json())
    .then((data) => {
      //console.log(data);
      this.setState({data, filteredData: data})
    });

  }

  handleSearch = searchText => {
    const filteredData = this.state.data.filter(data => {
      if(data.returnState == null){data.returnState = ''}
      if(data.loanReceiver == null){data.loanReceiver = ''}
      if (data.device.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 || 
      data.customer.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 || 
      data.loansState.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 || 
      data.returnState.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 || 
      data.loanGiver.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 || 
      data.loanReceiver.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
        return true
      } else {
        return false
      }
      
    })
    this.setState({filteredData})
    // console.log(filteredData)
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  addLoan = (data) => {
    let oldData = this.state.data;
    oldData.unshift(data);
    this.setState({data:oldData});
    //console.log(data);
  }

  handleEdit = (data) => {
    //console.log(data);
    let oldData = this.state.data;
    const index = oldData.findIndex((x) => {return x.id === data.id});
    oldData[index] = data;
    this.setState({oldData});
  }

  handleDelete = (id) => {
    if (confirm("Are you sure to Delete") === true){
      fetch('http://localhost:9000/api/v1/loansystem/loans/' + id, { 
        method: 'DELETE', 
        headers: new Headers({
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 
          'Content-Type': 'application/json'
        }),
      })
      //.then(response => console.log(response))
      .then(response => {
        if (response.status == 204){
          let data = this.state.data;
          const index = data.findIndex((x) => {return x.id === id});
          data.splice(index, 1);
          this.setState({data});
        }
      })

    }
  }

  handleDeleteSelected = () => {
    const { selected, data } = this.state;
    if (selected.length === data.length) {
      if (confirm("Are you sure to Delete All")) {
        selected.forEach(element => {
          fetch('http://localhost:9000/api/v1/loansystem/loans/' + element, { 
            method: 'DELETE', 
            headers: new Headers({
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
            }),
          })
        });
        const data = []
        this.setState({data});
      }
    } else {
      if (confirm("Are you sure to Delete selected")) {
        selected.forEach(element => {
          fetch('http://localhost:9000/api/v1/loansystem/loans/' + element, { 
            method: 'DELETE', 
            headers: new Headers({
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
            }),
          })
          .then(response => {
            if (response.status == 204){
              let data = this.state.data;
              const index = data.findIndex((x) => {return x.id === element});
              data.splice(index, 1);
              this.setState({data});
            }
          })
        })
      }
    }
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { filteredData, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <LoansTableToolbar numSelected={selected.length} addLoan={this.addLoan} handleDeleteSelected={this.handleDeleteSelected} handleSearch={this.handleSearch}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <UserTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={filteredData.length}
            />
            <TableBody>
              {stableSort(filteredData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} onClick={event => this.handleClick(event, n.id)} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.device}</TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.customer}</TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.dueDate.split('T')[0]}</TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.loaningTime.slice(0, 19).replace('T', ' ')}</TableCell>
                      <TableCell component="th" scope="row" padding="none">{typeof n.returnTime === "undefined" ? null : n.returnTime.slice(0, 19).replace('T', ' ')}</TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.loansState}</TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.returnState}</TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.loanGiver}</TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.loanReceiver}</TableCell>
                      <TableCell padding="none">
                      <EditDialog data= {n} handleEdit={this.handleEdit}/>
                      </TableCell>
                      <TableCell padding="none">{ 
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                          aria-haspopup="true"
                          onClick={() => {this.handleDelete(n.id);}}>
                            <DeleteIcon/>
                        </IconButton>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

UserTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserTable);