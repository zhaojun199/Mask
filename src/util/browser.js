function getbrowser() {
    var rwebkit = /(webkit)[ \/]([\w.]+)/;
    var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
    var rmsie = /(msie) ([\w.]+)/;
    var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

    function uaMatch(ua) {
        ua = ua.toLowerCase();

        var match = rwebkit.exec( ua ) ||
            ropera.exec( ua ) ||
            rmsie.exec( ua ) ||
            ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
            [];

        return { browser: match[1] || "", version: match[2] || "0" };
    };

    var browserResult = {
        mozilla: false,
        webkit: false,
        opera: false,
        msie: false
    };
    var browserMatch = uaMatch(navigator.userAgent);

    browserResult[browserMatch.browser] = true;
    browserResult.version = browserMatch.version;
    browserResult.safari = browserResult.webkit ? true : false;

    return browserResult;
}

