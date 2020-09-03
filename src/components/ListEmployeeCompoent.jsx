import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeCompoent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
    }
    
    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState( { employees: res.data})
        });
    }

    addEmployee() {
        // step 6
        this.props.history.push('/add-employee/_add');
        // this.props.history.push('/add-employee');
    }

    editEmployee(id) {
        // step 7
        this.props.history.push(`/add-employee/${id}`);
        //this.props.history.push(`/update-employee/${id}`);
    }

    deleteEmployee(id) {
        // rest api
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    render() {
        return (
            <div>
                <h1 className = "text-center">Employee List</h1>
                <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <td> Employee First Name</td>
                                <td> Employee Last Name</td>
                                <td> Employee Email Id</td>
                                <td> Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key = { employee.id } >
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td>
                                            <button onClick = { () => this.editEmployee(employee.id) } className="btn btn-info">Update</button>
                                            <button style={{marginLeft:"10px"}}  onClick ={  () => this.deleteEmployee(employee.id) } className="btn btn-danger">Delete</button>
                                            <button style={{marginLeft:"10px"}}  onClick ={  () => this.viewEmployee(employee.id) } className="btn btn-info">View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeCompoent;