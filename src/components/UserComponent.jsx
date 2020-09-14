import React from 'react';
import UserService from '../services/UserService';

class UserComponent extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount() {
        UserService.getUsers().then((Response) => {
            this.setState({ users: Response.data})
        })

    }

    render() {
        return (
            <div>
                <h1 className = "text-center"> Users List </h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> User Id </td>
                            <td> User First Name </td>
                            <td> User Last Name </td>
                            <td> User Email Id </td>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            this.state.users.map (
                                users =>
                                <tr key = {users.id}>
                                    <td> {users.id} </td>
                                    <td> {users.firstName} </td>
                                    <td> {users.lastName} </td>
                                    <td> {users.email} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserComponent