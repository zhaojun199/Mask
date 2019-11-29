/* eslint-disable */
function getbrowser() {
    const rwebkit = /(webkit)[ \/]([\w.]+)/;
    const ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
    const rmsie = /(msie) ([\w.]+)/;
    const rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

    function uaMatch(ua) {
        
        ua = ua.toLowerCase();

        const match = rwebkit.exec(ua)
            || ropera.exec(ua)
            || rmsie.exec(ua)
            || ua.indexOf('compatible') < 0 && rmozilla.exec(ua)
            || [];

        return { browser: match[1] || '', version: match[2] || '0' };
    }

    const browserResult = {
        mozilla: false,
        webkit: false,
        opera: false,
        msie: false,
    };
    const browserMatch = uaMatch(navigator.userAgent);

    browserResult[browserMatch.browser] = true;
    browserResult.version = browserMatch.version;
    browserResult.safari = !!browserResult.webkit;

    return browserResult;
}

export default getbrowser;
