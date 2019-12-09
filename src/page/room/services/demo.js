import Service from '@home/core/baseClass/Service';
import injectHttp from '@home/core/inject/injectHttp';

import Launcher from '@home/core/launcher';

export default
@injectHttp('roomApp')
class DemoService extends Service {
    @Launcher.store('roomApp') store;

    @Launcher.store() stores;

    getInfo() {
        return this.$http.send({
            url: 'https://api.github.com/users/123',
            method: 'get',
        });
    }
}
