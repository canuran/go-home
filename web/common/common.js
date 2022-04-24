$.ajaxSetup({
    error: function () {
        layui.layer.msg("请求失败", {icon: 2});
    }
});

/*获取当前Url里面的参数*/
function getUrlParams() {
    return getParamsByUrl(window.location.href);
}

/*获取指定Url里面的参数*/
function getParamsByUrl(url) {
    var params = {}
    var reg = /[?&](\w+)=([^&]*)/g;
    var matches = (url || "").matchAll(reg);
    for (var match of matches) {
        params[match[1]] = decodeURIComponent(match[2]);
    }
    return params;
}

function encodeUriParams(params, defaults) {
    params = params || {};
    defaults = defaults || {};
    var paramStr = ""
    for (const key in params) {
        var value = params[key];
        // 如果是默认值则不添加
        if (value === defaults[key]) {
            continue
        }
        value = encodeURIComponent(value || "");
        if (value.length < 1024) {
            paramStr += value ? ((paramStr ? "&" : "") + key + "=" + value) : "";
        } else {
            console.log(paramStr + " too long");
        }
    }
    return paramStr;
}

// 设置当前浏览器url参数
function setUrlParams(params, defaults) {
    var paramStr = encodeUriParams(params, defaults);
    paramStr = paramStr ? "?" + paramStr : paramStr;
    var href = window.location.href;
    var uriEnd = href.indexOf("?");
    if (uriEnd > 0) {
        href = window.location.href.substring(0, uriEnd);
    }
    window.history.replaceState({}, "", href + paramStr);
}

function formatDateTime(value) {
    if (value && value.length > 19) {
        value = value.substring(0, 19)
    }
    return value && value.replace("T", " ")
}

function gmTimeTemplate(cell, row, index, key) {
    return formatDateTime(row[key]);
}

function gmStrongTemplate(cell, row, index, key) {
    return '<strong>' + (row[key] || '') + '</strong>'
}

function gmPreTemplate(cell, row, index, key) {
    return '<pre>' + replaceHtmlTag(row[key]) + '</pre>'
}

function replaceHtmlTag(input) {
    return (input || "").replace(/</g, "&lt;").replace(/</g, "&gt;")
}

function gmAjaxTotals(settings, params) {
    return new Promise(resolve => {
        params.count = true
        $.ajax({
            url: settings.ajaxUrl,
            method: "post",
            data: params,
            dataType: "json",
            complete: function (data) {
                resolve(data && data.totals || 0);
            }
        });
    });
}

function gmAjaxData(settings, params) {
    return new Promise(resolve => {
        $.ajax({
            url: settings.ajaxUrl,
            method: "post",
            data: params,
            dataType: "json",
            complete: function (data) {
                resolve(data || {});
            }
        });
    });
}