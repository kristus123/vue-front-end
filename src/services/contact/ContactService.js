import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';


class ContactService {
    create(formObject) {
        return instance.post("/v1/admin/post/contact", formObject)
            .then(response => response)
            .catch(error => error);

    }

    findAll() {
        return instance.get("/v1/common/get/contact").then(response => response.data._embedded.contactModelList);
    }

    findById(id) {
        return instance.get(`/v1/common/get/contact/${id}`).then(response => response.data);
    }

    update(contactObject, id) {
        return instance.put(`/v1/admin/update/contact/${id}`, contactObject).then(response => response);
    }
}


const contactService = new ContactService();
export default contactService;