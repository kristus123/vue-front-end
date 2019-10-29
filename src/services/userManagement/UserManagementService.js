import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';

class UserManagementService {
    elevateUserToAdmin(id) {
        return instance.put(`/v1/admin/giveUserAdmin/${id}`)
            .then(response => response.data)
            .catch(error => error)
    }

    elevateUserToStandard(id) {
        return instance.put(`/v1/admin/giveUserStandard/${id}`)
            .then(response => response.data)
            .catch(error => error)
    }
    createUser(formObject) {
        const username = formService.findValue("username", formObject);
        const password = formService.findValue("password", formObject);
        return instance.post(`/v1/users/signup?username=${username}&password=${password}`, {
            username : formService.findValue("username", formObject),
            password : formService.findValue("password", formObject)
        })
            .then(response => response.data)
    }

    findAll() {
        return instance.get("/api/public/allUsers").then(response => response.data)
    }

    deleteUser(id) {
        return instance.delete(`/v1/admin/delete/user/${id}`)
            .then(response => response.data)
            .catch(error => error)
    }
}


const userManagementService = new UserManagementService();
export default userManagementService;