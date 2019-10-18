import instance from '@/services/AxiosService'

class PersonService {

    addPerson(personObject) {
        return instance.post(`/v1/admin/post/person`, personObject)
            .then(response => response);
    }

    getPerson() {
        return instance.get(`/v1/admin/get/person`)
            .then(response => response.data);
    }

    deletePerson(personId) {
        return instance.delete(`/v1/admin/delete/person/${personId}`)
            .then(response => response);
    }
}

const personService = new PersonService();
export default personService;