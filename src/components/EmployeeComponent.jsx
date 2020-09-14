import React from 'react'
import EmployeeService from '../services/EmployeeService';

class EmployeeComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            employees:[]
        }
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((response) => {
            this.setState( { employees: response.data })
        })
    }

    render() {
        return (
            <div>
                <h1 className = "text-center">Employee List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td> Employee Id</td>
                            <td> Employee First Name</td>
                            <td> Employee Last Name</td>
                            <td> Employee Email Id</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map(
                                employees => 
                                <tr key={ employees.id }>
                                    <td>{ employees.id }</td>
                                    <td>{ employees.firstName }</td>
                                    <td>{ employees.lastName }</td>
                                    <td>{ employees.emailId }</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )

    }
}

export default EmployeeComponent