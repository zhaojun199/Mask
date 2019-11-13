const Service = service =>
    function (target, key) {
        const type = typeof service;
        if (type === 'object') {
            target[key] = service;
        } else if (
            Object.getPrototypeOf(service).name === 'Service' ||
            service.name.toLowerCase().indexOf('service') !== -1 ||
            (service.prototype.type && service.prototype.type.indexOf('service') !== -1)
        ) {
            if (service.instance === undefined) {
                service.instance = new service();
            }
            target[key] = service.instance;
        } else if (type === 'function') {
            target[key] = service();
        }
        return target;
    };

export default Service;
