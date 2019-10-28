import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';


class SeasonService {

    create(formObject) {
        const jsonObject = {
            startDate : formService.findValue("Start date", formObject),
            endDate: formService.findValue("End date", formObject),
            name: formService.findValue("Season", formObject),
            description: formService.findValue("Description", formObject)
        }

        return instance.post("/v1/admin/post/season", jsonObject).then(response => response);
    }

    createWithoutConvert(seasonObject) {
        return instance.post("/v1/admin/post/season", seasonObject).then(response => response);
    }

    updateWithoutConvert(seasonObject, id) {
        return instance.put(`/v1/admin/update/season/${id}`, seasonObject).then(response => response);
    }

    findAll() {
        return instance.get("/v1/common/get/season").then(response => response.data);
    }

    getSeason(seasonId) {
        return instance.get(`/v1/common/get/season/${seasonId}`).then(response => response.data);
    }

    update(formObject, seasonId) {
        const jsonObject = {
            startDate : formService.findValue("Start date", formObject),
            endDate: formService.findValue("End date", formObject),
            name: formService.findValue("Season", formObject),
            description: formService.findValue("Description", formObject)
        }

        return instance.put(`/v1/admin/update/season/${seasonId}`, jsonObject).then(response => response);
    }
}

const seasonService = new SeasonService();
export default seasonService;