import UserController from "./userController";

class ApiController {

    constructor() {
        if (!ApiController.instance) {
            ApiController.instance = this;
        }
        return ApiController.instance;
    }

    getAllBookingList() {
        // 
    }

    getBookingById() {

    }

    getBookingByPickUpLocation() { }

    async loginUser(user) {
        return await UserController.findByEmail(user.mail).then((authUser) => {
            if (authUser == undefined || authUser.password !== user.password) {
                return false;
            } else {
                localStorage.setItem("auth", true);
                localStorage.setItem("userType", authUser.userType);
                localStorage.setItem("userId", authUser.mail);
                return true;
            }
        });
    }

    async signUpUser(user) {
        return await UserController.findByEmail(user.mail).then((authUser) => {
            if (authUser == undefined) {
                UserController.save(user);
                return true;
            } else {
                return false;
            }
        });
    }
}
export default new ApiController();