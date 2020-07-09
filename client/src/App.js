import React, { Component } from 'react';
import './App.css';
import Employee from './components/Employee';
import EmployeeAdd from './components/EmployeeAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflow: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      employees: '',
      completed: 0
    });
    this.callApi()
      .then(res => this.setState({employees: res}))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20)
    this.callApi()
      .then(res => this.setState({employees: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/employees');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>사원번호</TableCell>
                <TableCell>프로필</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직책</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { this.state.employees ? this.state.employees.map(c => {
                return (<Employee key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}></Employee>); 
                }) : 
                <TableRow>
                  <TableCell colspan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow> 
              }
            </TableBody>
          </Table>
        </Paper>
        <EmployeeAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

export default withStyles(styles)(App);
