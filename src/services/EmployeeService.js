import axios from 'axios'

const EMPLOYEES_REST_API_URL="http://app-bff.pub.tbiz-atcl.net/api/ksk/v1/employees";
//const EMPLOYEES_REST_API_URL="http://app-bff.pub.tbiz-atcl.net/api/svc/v1/employees";
//const EMPLOYEES_REST_API_URL="https://app-bff.pub.tbiz-atcl.net/api/svc/v1/employees";
//const EMPLOYEES_REST_API_URL="http://192.168.189.7:30001/api/v1/employees";
//const EMPLOYEES_REST_API_URL="http://localhost:26789/api/v1/employees";

class EmployeeService {
    getEmployees() {
        return axios.get(EMPLOYEES_REST_API_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEES_REST_API_URL, employee);
    }

    getEmplyeeById(employeeId){
        return axios.get(EMPLOYEES_REST_API_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId) {
        return axios.put(EMPLOYEES_REST_API_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEES_REST_API_URL + '/' + employeeId);
    }
}

export default new EmployeeService()
