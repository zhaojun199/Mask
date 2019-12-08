export default function injectHttp(http) {
    return function (Target) {
        return new Target({ $http: http })
    }
}
