/**
 * date:2020/02/27
 * author:Mr.Chung
 * description:此处放layui自定义扩展
 */
window.modulePath = (function () {
    for (let script of document.scripts) {
        if (script.src && script.src.indexOf("lay-config.js") > -1) {
            return script.src.substring(0, script.src.lastIndexOf("/") + 1);
        }
    }
    return "";
})();
layui.config({base: modulePath, version: false});