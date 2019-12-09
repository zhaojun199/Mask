import container from '@home/core/launcher/container'

export default function injectHttp(http) {
    let $http = http;
    // http传入字符串，则从container里取http
    if (typeof http === 'string') {
        $http = container.getHttp(http);
    }
    return function (Target) {
        const prototype = Object.getPrototypeOf(Target);
        // Epic
        if (prototype.name === 'Epic') {
            return new Target({ $http: $http })
        }
        // Service
        if (prototype.name === 'Service') {
            // eslint-disable-next-line no-param-reassign
            Target.prototype.$http = $http
            return Target
        }
        return Target
    }
}
