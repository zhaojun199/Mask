export default class UserController {
    namespace = 'user';

    initial = {
        info: {},
        permission: {},
    };

    saveUser({ payload }) {
        return payload;
    }
}
