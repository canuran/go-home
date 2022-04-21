/**
 * date:2020/02/27
 * author:Mr.Chung
 * description:此处放layui自定义扩展
 */
window.rootPath = (function () {
    for (let script of document.scripts) {
        if (script.src && script.src.indexOf("lay-config.js") > -1) {
            return script.src.substring(0, script.src.lastIndexOf("/") + 1)
        }
    }
    return "";
})();
layui.config({
    base: rootPath, version: false
}).extend({
    miniAdmin: "layuimini/miniAdmin", // layuimini后台扩展
    miniMenu: "layuimini/miniMenu", // layuimini菜单扩展
    miniPage: "layuimini/miniPage", // layuimini单页扩展
    miniTheme: "layuimini/miniTheme", // layuimini主题扩展
    echarts: 'echarts/echarts', // echarts图表扩展
    layarea: 'layarea/layarea', // 省市县区三级联动下拉选择器
});