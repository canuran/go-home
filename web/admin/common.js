$.ajaxSetup({
    error: function (resp) {
        layui.layer.msg(resp && resp.responseJSON &&
            resp.responseJSON.message || "请求远程服务失败");
    }
});

/*获取当前Url里面的参数*/
function getUrlParams() {
    try {
        for (var win = window; ; win = win.parent) {
            if (window.parent === win) {
                return getParamsByUrl(win.location.href);
            }
        }
    } catch (e) {
        console.log(e);
    }
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
function setUrlParams(params, excludes) {
    var paramStr = encodeUriParams(params, excludes);
    paramStr = paramStr ? "?" + paramStr : paramStr;
    for (var win = window; ; win = win.parent) {
        if (window.parent === win) {
            var href = win.location.href;
            var uriEnd = href.indexOf("?");
            if (uriEnd > 0) {
                href = win.location.href.substring(0, uriEnd);
            }
            win.history.replaceState({}, "", href + paramStr);
            return;
        }
    }
}

function formatDateTime(value) {
    if (value && value.length > 19) {
        value = value.substring(0, 19)
    }
    return value && value.replace("T", " ");
}

function getParentRow(element) {
    while (element) {
        if (element instanceof HTMLTableRowElement) {
            return element;
        }
        element = element.parentElement;
    }
    return element;
}

function gmTimeTemplate(cell, row, index, key) {
    return formatDateTime(row[key]);
}

function gmStrongTemplate(cell, row, index, key) {
    return '<strong>' + (row[key] || '') + '</strong>';
}

function gmPreTemplate(cell, row, index, key) {
    return '<pre style="word-break:break-all;max-height:156px;overflow-y:auto">'
        + replaceHtmlTag(row[key]) + '</pre>';
}

function replaceHtmlTag(input) {
    return (input || "").replace(/</g, "&lt;").replace(
        />/g, "&gt;");
}

function gmAjaxTotals(settings, params) {
    return new Promise(resolve => {
        params.count = true
        $.ajax({
            url: settings.ajaxUrl,
            method: settings.ajaxType || "get",
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
            method: settings.ajaxType || "get",
            data: params,
            dataType: "json",
            complete: function (data) {
                resolve(data && data.responseJSON || {data: [], totals: 0});
            }
        });
    });
}