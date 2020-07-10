import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import EmployeeDelete from './EmployeeDelete';
import EmployeeUpdate from './EmployeeUpdate';

class Employee extends React.Component {

    render() {
        return (
            <TableRow>
                <TableCell align="center">{this.props.empNo}</TableCell>
                <TableCell align="center"><img src={this.props.empProfile} alt="profile"></img></TableCell>
                <TableCell align="center">{this.props.empName}</TableCell>
                <TableCell align="center">{this.props.title}</TableCell>
                <TableCell align="center">{this.props.phone}</TableCell>
                <TableCell align="center">{this.props.email}</TableCell>
                <TableCell align="center">{this.props.birthday}</TableCell>
                <TableCell align="center">{this.props.gender}</TableCell>
                <TableCell align="center">{this.props.entryDate}</TableCell>
                <TableCell align="center">{this.props.deptName}</TableCell>
                <TableCell align="center">
                    <EmployeeDelete stateRefresh={this.props.stateRefresh} empNo={this.props.empNo}></EmployeeDelete>
                    <EmployeeUpdate stateRefresh={this.props.stateRefresh} 
                        empNo={this.props.empNo} 
                        empProfile={this.props.empProfile}
                        empName={this.props.empName}
                        title={this.props.title}
                        phone={this.props.phone}
                        email={this.props.email}
                        birthday={this.props.birthday}
                        gender={this.props.gender}
                        entryDate={this.props.entryDate}
                        deptName={this.props.deptName}></EmployeeUpdate>
                </TableCell>
            </TableRow>
        );
    }
}

export default Employee;

