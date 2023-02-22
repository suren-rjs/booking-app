class UserController {
    constructor() {
        if (!UserController.instance) {
            UserController.instance = this;
        }
        return UserController.instance;
    }

    getAllUsers() {
        return JSON.parse(localStorage.getItem("users")) == null ? [] : JSON.parse(localStorage.getItem("users"));
    }

    save(user) {
        var users = this.getAllUsers() == null ? [] : this.getAllUsers();
        users.push(user);
        const serializedUser = JSON.stringify(users);
        localStorage.setItem("users", serializedUser);
    }

    async findByEmail(emailId) {
        let users = this.getAllUsers().filter((user) => user.mail == emailId);
        try {
            return users[0];
        } catch (error) {
            return undefined;
        }
    }
}

export default new UserController();
