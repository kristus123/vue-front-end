import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js'

const constObject = {
    "addressId": 10,
    "addresses": [
        "vestre vardane 30"
    ],
    "postalCode": "5306",
    "city": "Bergen",
    "country": "norway"
}


class AddressService {
    turnFormObjectIntoValidJson(formObject) {
        const jsonObject = {
            "addresses": [
                formService.findValue("Address", formObject)
            ],
            "postalCode": formService.findValue("Postal code", formObject),
            "city": formService.findValue("City", formObject),
            "country": formService.findValue("Country", formObject)
        }
        
        return jsonObject;
    }

    delete(addressId) {
        return instance.delete(`v1/admin/delete/address/${addressId}`)
            .then(response => response.data)
            .catch(error => error)
    }


    update(formObject, id) { 
        console.log(formObject);
        return instance.put(`v1/admin/update/address/${id}`, 
            this.turnFormObjectIntoValidJson(formObject))
            .then(response => response)
            .catch(error => error);
    }

    findById(id) {
        return instance.get(`/v1/common/get/address/${id}`)
            .then(response => response.data)
            .catch(error => console.log(error))
    }

    getAll() {
        return instance.get("/v1/common/get/address")
            .then(response => response.data._embedded.addressModelList)
    }

    create(formObject) {
        const constObject = this.turnFormObjectIntoValidJson(formObject);

        return instance.post('/v1/admin/post/address', constObject)
            .then(response => response)
            .catch(error => error);
    }

    createWithoutConvert(addressObject) {
        return instance.post('/v1/admin/post/address/', addressObject).then(response => response.data);
    }

    updateWithoutConvert(addressObject, addressId) {
        return instance.put(`/v1/admin/update/address/${addressId}`, addressObject).then(response => response);
    }
}

const addressService = new AddressService();
export default addressService;