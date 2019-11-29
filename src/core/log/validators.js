export const validateClass = (clazz, decorator) => {
    if (typeof clazz !== 'function') {
        throw new Error(`@${decorator} decorator can only be applied to class not function`);
    }
};
