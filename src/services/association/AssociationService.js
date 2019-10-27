import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';

class AssociationService {
    create(formObject) {
        const jsonObject = {
            name: formService.findValue('Name', formObject),
            description: formService.findValue('Description', formObject)
        }
        return instance.post("/v1/admin/post/association", jsonObject).then(response => response).catch(error => error.response.status)
    }

    findAll() {
        return instance.get("/v1/common/get/association").then(response => {
            return response.data._embedded.associationModelList;
        })
    }

    update(formObject, associationId) {
        console.log("______")
        console.log(formObject)
        console.log()
        console.log("______")
        
        const jsonObject = {
            associationId : formService.findValue("id", formObject),
            name : formService.findValue("Name", formObject),
            description: formService.findValue("Description", formObject)
        }
        return instance.put(`/v1/admin/update/association/${associationId}`, jsonObject)
            .then(response => response.data)
            .catch(error => error)
    }

    deleteAssociation(id) {
        return instance.delete(`/v1/admin/delete/association/${id}`)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(errror => errror.response.status)

    }

    findById(id) {
        console.log("hallo " + id)
        return instance.get(`/v1/common/get/association/${id}`)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(errror => errror.response.status)
    }
}


const associationService = new AssociationService();

export default associationService;