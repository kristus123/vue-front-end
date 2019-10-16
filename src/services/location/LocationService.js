import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';


class LocationService {




    findAll() {
        return instance.get("/v1/admin/get/location").then(respone => Response.data)

    }

    update(formObject) {
        console.log("hei")
        console.log("____")
        console.log(formObject);
        console.log("____")
        const jsonObject = {
            "locationModel": {
                "name": "heiaiahi", //formService.findValue("Location name", formObject), //,  //"et fint sted",
                "description": "jhei" //formService.findValue("Desciption", formObject) //"et super dupert sted aa henge"
            }
        }
             // 1
        
        //console.log(jsonObject)
        //console.log(formService.findValue("Address Id", formObject));
        //if (false) {
        //    jsonObject.addressId = formService.findValue("Address Id", formObject)
        //}

    }

    findById(id) {
        return instance.get(`/v1/admin/get/location/${id}`)
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
}

const locationService = new LocationService();
export default locationService;