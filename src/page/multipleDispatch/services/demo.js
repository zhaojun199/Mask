import Service from '@home/core/baseClass/Service';
import http$ from '@home/util/http';

import Launcher from '@home/core/launcher';

export default class DemoService extends Service {
    @Launcher.store('roomApp') store;

    @Launcher.store() stores;

    getInfo() {
        return http$.getJSON('https://api.github.com/users/123');
    }
}
