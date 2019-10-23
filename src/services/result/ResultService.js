import instance from '@/services/AxiosService';

class ResultService {

    get(id) {
        return instance.get(`/v1/common/get/result/${id}`).then(response => response.data);
    }


}
const resultService = new ResultService();
export default resultService;