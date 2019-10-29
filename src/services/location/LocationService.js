import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';


class LocationService {




    findAll() {
        return instance.get("/v1/common/get/location").then(Response => Response.data._embedded.locationModelList)

    }

    update(formObject) {
        const jsonObject = 
        {
            "id": formService.findValue("id", formObject),
            "name": formService.findValue("Location name", formObject),
            "description": formService.findValue("Desciption", formObject)
        }
        
            console.log(jsonObject);
        return instance.put("/v1/admin/update/location", jsonObject).then(response => response.data)
    }

    findById(id) {
        return instance.get(`/v1/common/get/location/${id}`)
            .then(respone => respone.data)
            .catch(error => console.log(error))
    }

    create(formObject) {
        const jsonObject = {
            "locationModel": {
                "name": formService.findValue("Location name", formObject),  //"et fint sted",
                "description": formService.findValue("Desciption", formObject) //"et super dupert sted aa henge"
            },
            "addressId": formService.findValue("Address Id", formObject) // 1
        }


        return instance.post("/v1/admin/add/location", jsonObject)
            .then(respone => respone.data);
    }

    createWithoutConvert(locationObject) {
        return instance.post("/v1/admin/add/location", locationObject).then(response => response);
    }

    updateWithoutConvert(locationObject, id) {
        return instance.put(`/v1/admin/update/location/${id}`, locationObject).then(response => response);
    }
}

const locationService = new LocationService();
export default locationService;