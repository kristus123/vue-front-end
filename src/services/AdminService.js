import instance from "./AxiosService";


class AdminService {

    elevateUserToAdmin(userId) {
        instance.put(`/v1/admin/giveUserAdmin/${userId}`)
    }


    createAddress(requestBody) {
        instance.post("/v1/admin/createAddress", {
            addresses: [
                "vestre vardane 30"
            ],
            postalCode: "5306",
            city: "Bergen",
            country: "norway"
        })
    }

    makePersonCoach(personId, teamId) {
        const params = { personId: personId, teamID: teamId }
        instance.put("/v1/admin/person/makeCoach", { params })

    }

    createPerson(personObject) {
        instance.post("/v1/admin/post/person", {
            firstName: "haasdasdaasdasdkon",
            lastName: "heasdasdisann",
            dateOfBirth: "2018-05-02",
            address: {
                addresses: ["v30"],
                postalCode: "5306",
                city: "300akd",
                country: "cotuns"
            }
        })
    }









}




const adminService = new AdminService();
export default adminService;