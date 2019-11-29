const Service = (service) => function (target, key) {
    const type = typeof service;
    if (type === 'object') {
        // eslint-disable-next-line no-param-reassign
        target[key] = service;
    } else if (
        Object.getPrototypeOf(service).name === 'Service'
            || service.name.toLowerCase().indexOf('service') !== -1
            || (service.prototype.type && service.prototype.type.indexOf('service') !== -1)
    ) {
        if (service.instance === undefined) {
            // eslint-disable-next-line
            service.instance = new service();
        }
        // eslint-disable-next-line no-param-reassign
        target[key] = service.instance;
    } else if (type === 'function') {
        // eslint-disable-next-line no-param-reassign
        target[key] = service();
    }
    return target;
};

export default Service;
