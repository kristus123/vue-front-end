import instance from '@/services/AxiosService';
import formService from '@/services/form/FormService.js'

class PersonService {

    create(formObject) {
        const jsonObject = {
            "firstName": formService.findValue("First name", formObject),
            "lastName": formService.findValue("Last name", formObject),
            "dateOfBirth": formService.findValue("Date of birth", formObject)
        }
        return instance.post(`/v1/admin/post/person`, jsonObject).then(response => response.data)
    }

    getPerson() {
        return instance.get(`/v1/admin/get/person`)
            .then(response => response.data);
    }

    deletePerson(personId) {
        return instance.delete(`/v1/admin/delete/person/${personId}`)
            .then(response => response.data);
    }
}

const personService = new PersonService();
export default personService;