import instance from '@/services/AxiosService';
import formService from '@/services/form/FormService.js'

class PersonService {

    create(formObject, date, id) {
        const jsonObject = {
            firstName: formService.findValue("First name", formObject),
            lastName: formService.findValue("Last name", formObject),
            dateOfBirth: date,
            addressId: id
        }
        return instance.post(`/v1/admin/post/person`, jsonObject).then(response => response)

    }

    getPerson() {
        return instance.get(`/v1/common/get/person`)
            .then(response => response.data);
    }

    deletePerson(personId) {
        // return instance.delete(`/v1/admin/delete/person/${personId}`)
        //     .then(response => response);
    }

    updatePerson(personId, personObject) {
        return instance.put(`/v1/admin/update/person/${personId}`, personObject)
            .then(response => response);
    }
}

const personService = new PersonService();
export default personService;