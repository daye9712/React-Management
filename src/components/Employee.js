import React, { Component } from 'react';

class Employee extends React.Component {

    render() {
        return (
            <div>
                <EmployeeProfile 
                    id={this.props.id} 
                    image={this.props.image} 
                    name={this.props.name}></EmployeeProfile>
                <EmployeeInfo
                    birthday={this.props.birthday}
                    gender={this.props.gender}
                    job={this.props.job}></EmployeeInfo>
            </div>
        );
    }

}
class EmployeeProfile extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.image} alt="profile" />
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        );
    }
}

class EmployeeInfo extends Component {
    render() {
        return (
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        );
    }
}

export default Employee;

