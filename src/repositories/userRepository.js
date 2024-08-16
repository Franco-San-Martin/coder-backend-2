const UserDao = require('../dao/models/userDao');

class UserRepository {
    constructor() {
        this.userDao = new UserDao();
    }

    async getUserById(id) {
        return await this.userDao.getUserById(id);
    }

    async createUser(user) {
        return await this.userDao.createUser(user);
    }
}

module.exports = UserRepository;
