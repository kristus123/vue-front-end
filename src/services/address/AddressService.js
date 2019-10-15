import instance from '@/services/AxiosService.js';
import formService from '@/services/address/form/FormService.js'

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
                formService.findValue("address", formObject)
            ],
            "postalCode": formService.findValue("postal code", formObject),
            "city": formService.findValue("City", formObject),
            "country": formService.findValue("Country", formObject)
        }
        
        if (formService.findValue("address", formObject) != null) {
            jsonObject.addressId = formService.findValue("address", formObject);
        }
        return jsonObject;
    }



    update(formObject) {
        const json = turnFormObjectIntoValidJson(formObject);

        instance.put("v1/admin/address/update", json)
            .then(response => response.data)
            .catch(error => console.log(error));
    }

    findById(id) {
        return instance.get(`/v1/admin/address/get/${id}`)
            .then(response => response.data)
            .catch(error => console.log(error))
    }

    create(formObject) {
        const constObject = turnFormObjectIntoValidJson(formObject);

        instance.post('/v1/admin/createAddress', constObject)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    }
}

const addressService = new AddressService();
export default addressService;