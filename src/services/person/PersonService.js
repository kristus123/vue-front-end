import instance from '@/services/AxiosService'

class PersonService {

    addPerson(personObject) {
        instance.post(`/v1/admin/post/person`, personObject)
    }

    getPerson() {
        return instance.get(`/v1/admin/get/person`)
            .then(response => response.data);
    }
}

const personService = new PersonService();
export default personService;