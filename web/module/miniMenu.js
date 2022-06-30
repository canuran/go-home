/**
 * date:2020/02/27
 * author:Mr.Chung
 * version:2.0
 * description:layuimini 菜单框架扩展
 */
layui.define(function (exports) {
    var element = layui.element, layer = layui.layer;
    var miniMenu = {
        /**
         * 菜单初始化
         * @param options.menuList   菜单数据信息
         * @param options.multiModule 是否开启多模块
         * @param options.menuChildOpen 是否展开子菜单
         */
        render: function (options) {
            options.menuList = options.menuList || [];
            options.multiModule = options.multiModule || false;
            options.menuChildOpen = options.menuChildOpen || false;
            if (options.multiModule) {
                miniMenu.renderMultiModule(options.menuList, options.menuChildOpen);
            } else {
                miniMenu.renderSingleModule(options.menuList, options.menuChildOpen);
            }
            miniMenu.listen();
        }, /**
         * 单模块
         * @param menuList 菜单数据
         * @param menuChildOpen 是否默认展开
         */
        renderSingleModule: function (menuList, menuChildOpen) {
            menuList = menuList || [];
            var leftMenuHtml = '', childOpenClass = menuChildOpen ? ' layui-nav-itemed' : '';
            leftMenuHtml = this.renderLeftMenu(menuList, {childOpenClass: childOpenClass});
            $('.layui-layout-body').addClass('layuimini-single-module'); //单模块标识
            $('.layuimini-header-menu').remove();
            $('.layuimini-menu-left').html(leftMenuHtml);
            element.init();
        }, /**
         * 渲染一级菜单
         */
        compileMenu: function (menu, isSub) {
            menu.title = menu.title || '';
            menu.className = menu.className || '';
            menu.childOpenClass = menu.childOpenClass || '';
            menu.children = menu.children || '';

            if (isSub) {
                return '<dd class="menu-dd ' + menu.childOpenClass + ' ' + menu.className + '"> ' +
                    '<a ' + (menu.menu ? 'data-menu="' + menu.menu + '" ' : '') +
                    (menu.id ? 'id="' + menu.id + '" ' : '') +
                    ((!menu.child || !menu.child.length) && menu.href ?
                        'layuimini-href="' + menu.href + '" href="#/' + menu.href + '" ' : '') +
                    (menu.target ? 'target="' + menu.target + '"' : '') + '>' +
                    (menu.icon ? '<i class="' + menu.icon + '"></i> ' : '') +
                    '<span class="layui-left-nav">' + menu.title + '</span>' +
                    '</a>' + menu.children + '</dd>';
            }

            return '<li ' + (menu.menu ? 'data-menu="' + menu.menu + '"' : '') +
                'class="layui-nav-item menu-li ' + menu.childOpenClass + ' ' + menu.className + '" ' +
                (menu.id ? 'id="' + menu.id + '"' : '') + '>' +
                '<a ' + (menu.href ? 'layuimini-href="' + menu.href + '" href="#/' + menu.href + '" ' : '') +
                (menu.target ? 'target="' + menu.target + '"' : '') + '>' +
                (menu.icon ? '<i class="' + menu.icon + '"></i> ' : '') +
                '<span class="layui-left-nav">' + menu.title + '</span>' +
                '</a>' + menu.children + '</li>';
        },
        compileMenuContainer: function (menu, isSub) {
            if (!menu.children) {
                return "";
            }
            if (isSub) {
                return '<dl class="layui-nav-child ">' + menu.children + '</dl>';
            }
            return '<ul class="layui-nav layui-nav-tree layui-left-nav-tree ' +
                (menu.className || '') + '" ' + (menu.id ? 'id="' + menu.id + '"' : '') + '>' +
                menu.children + '</ul>';
        },
        each: function (list, callback) {
            var _list = [];
            for (var i = 0, length = list.length; i < length; i++) {
                _list[i] = callback(i, list[i]);
            }
            return _list;
        },
        renderChildrenMenu: function (menuList, options) {
            var me = this;
            menuList = menuList || [];
            var html = this.each(menuList, function (idx, menu) {
                if (menu.child && menu.child.length) {
                    menu.children = me.renderChildrenMenu(menu.child,
                        {childOpenClass: options.childOpenClass || ''});
                }
                menu.className = "";
                return me.compileMenu(menu, true)
            }).join("");
            return me.compileMenuContainer({children: html}, true)
        },
        renderLeftMenu: function (leftMenus, options) {
            options = options || {};
            var me = this;
            var leftMenusHtml = me.each(leftMenus || [], function (idx, leftMenu) { // 左侧菜单遍历
                var children = me.renderChildrenMenu(leftMenu.child,
                    {childOpenClass: options.childOpenClass});
                return me.compileMenu({
                    href: leftMenu.href,
                    target: leftMenu.target,
                    childOpenClass: options.childOpenClass,
                    icon: leftMenu.icon,
                    title: leftMenu.title,
                    children: children
                });
            }).join("");
            leftMenusHtml = me.compileMenuContainer({
                id: options.parentMenuId, className: options.leftMenuCheckDefault, children: leftMenusHtml
            });
            return leftMenusHtml;
        }, /**
         * 多模块
         * @param menuList 菜单数据
         * @param menuChildOpen 是否默认展开
         */
        renderMultiModule: function (menuList, menuChildOpen) {
            menuList = menuList || [];
            var me = this;
            var headerMobileMenuHtml = '', leftMenuHtml = '', leftMenuCheckDefault = 'layui-this', childOpenClass = '',
                headerMenuCheckDefault = 'layui-this';
            if (menuChildOpen) childOpenClass = ' layui-nav-itemed';
            var headerMenuHtml = this.each(menuList, function (index, val) { //顶部菜单渲染
                var menu = 'multi_module_' + index;
                var id = menu + "HeaderId";
                var topMenuItemHtml = "";
                topMenuItemHtml = me.compileMenu({
                    className: headerMenuCheckDefault,
                    menu: menu,
                    id: id,
                    title: val.title,
                    href: "",
                    target: "",
                    children: ""
                });
                leftMenuHtml += me.renderLeftMenu(val.child, {
                    parentMenuId: menu, childOpenClass: childOpenClass, leftMenuCheckDefault: leftMenuCheckDefault
                });
                headerMobileMenuHtml += me.compileMenu({
                    id: id, menu: menu, icon: val.icon, title: val.title,
                }, true);
                headerMenuCheckDefault = "";
                leftMenuCheckDefault = "layui-hide";
                return topMenuItemHtml;
            }).join("");
            $('.layui-layout-body').addClass('layuimini-multi-module'); //多模块标识
            $('.layuimini-menu-header-pc').html(headerMenuHtml); //电脑
            $('.layuimini-menu-left').html(leftMenuHtml);
            $('.layuimini-menu-header-mobile').html(headerMobileMenuHtml); //手机
            element.init();
        }, /**
         * 监听
         */
        listen: function () {
            /**
             * 菜单模块切换
             */
            $('[data-menu]').on('click', function () {
                var loading = layer.load(0, {shade: false, time: 2 * 1000});
                var menuId = $(this).attr('data-menu');
                // header
                $(".layuimini-header-menu .layui-nav-item.layui-this").removeClass('layui-this');
                $(this).addClass('layui-this');
                // left
                $(".layuimini-menu-left .layui-nav.layui-nav-tree.layui-this").addClass('layui-hide');
                $(".layuimini-menu-left .layui-nav.layui-nav-tree.layui-this.layui-hide").removeClass('layui-this');
                $("#" + menuId).removeClass('layui-hide').addClass('layui-this');
                layer.close(loading);
            });
            /**
             * 菜单缩放
             */
            $('.side-fold-click').on('click', function () {
                var loading = layer.load(0, {shade: false, time: 2 * 1000});
                var isShow = $('[data-side-fold]').attr('data-side-fold');
                if (isShow === "1") { // 缩放
                    $('[data-side-fold]').attr('data-side-fold', 0)
                        .attr('class', 'fa fa-indent');
                    $('.layui-layout-body').removeClass('layuimini-all')
                        .addClass('layuimini-mini');
                } else { // 正常
                    $('[data-side-fold]').attr('data-side-fold', 1)
                        .attr('class', 'fa fa-outdent');
                    $('.layui-layout-body').removeClass('layuimini-mini')
                        .addClass('layuimini-all');
                    layer.close(window.openTips);
                }
                element.init();
                layer.close(loading);
            });
            /**
             * 手机端点开模块
             */
            $('.layuimini-header-menu.layuimini-mobile-show dd').on('click', function () {
                var loading = layer.load(0, {shade: false, time: 2 * 1000});
                var check = $('[data-side-fold]').attr('data-side-fold');
                if (check === "1") {
                    $('[data-side-fold]').attr('data-side-fold', 0)
                        .attr('class', 'fa fa-indent');
                    $('.layui-layout-body').removeClass('layuimini-all')
                        .addClass('layuimini-mini');
                    element.init();
                }
                layer.close(loading);
            });
        },
    };
    exports("miniMenu", miniMenu);
});
