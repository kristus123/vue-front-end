import instance from '@/services/AxiosService.js';
import formService from '@/services/form/FormService.js';


class SeasonService {
    create() {
        const jsonObject = {
            "name"        : "la LIga"    ,
            "description" : "wooow"      ,
            "startDate"   : "2019-02-02" ,
            "endDate"     : "2019-02-05"
        }

        return instance.post("/v1/admin/post/season", jsonObject).then(response => response.data);
    }
}

const seasonService = new SeasonService();
export default seasonService;