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
        miniMenu.listenMenu();
    },
    /**
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
        layui.element.init();
    },
    /**
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
    eachMenu: function (list, callback) {
        var _list = [];
        for (var i = 0, length = list.length; i < length; i++) {
            _list[i] = callback(i, list[i]);
        }
        return _list;
    },
    renderChildrenMenu: function (menuList, options) {
        var me = this;
        menuList = menuList || [];
        var html = this.eachMenu(menuList, function (idx, menu) {
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
        var leftMenusHtml = me.eachMenu(leftMenus || [], function (idx, leftMenu) { // 左侧菜单遍历
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
    },
    /**
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
        var headerMenuHtml = this.eachMenu(menuList, function (index, val) { //顶部菜单渲染
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
        layui.element.init();
    },
    /**
     * 监听
     */
    listenMenu: function () {
        /**
         * 菜单模块切换
         */
        $('[data-menu]').on('click', function () {
            var loading = layui.layer.load(0, {shade: false, time: 2 * 1000});
            var menuId = $(this).attr('data-menu');
            // header
            $(".layuimini-header-menu .layui-nav-item.layui-this").removeClass('layui-this');
            $(this).addClass('layui-this');
            // left
            $(".layuimini-menu-left .layui-nav.layui-nav-tree.layui-this").addClass('layui-hide');
            $(".layuimini-menu-left .layui-nav.layui-nav-tree.layui-this.layui-hide").removeClass('layui-this');
            $("#" + menuId).removeClass('layui-hide').addClass('layui-this');
            layui.layer.close(loading);
        });
        /**
         * 菜单缩放
         */
        $('.side-fold-click').on('click', function () {
            var loading = layui.layer.load(0, {shade: false, time: 2 * 1000});
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
                layui.layer.close(window.openTips);
            }
            layui.element.init();
            layui.layer.close(loading);
        });
        /**
         * 手机端点开模块
         */
        $('.layuimini-header-menu.layuimini-mobile-show dd').on('click', function () {
            var loading = layui.layer.load(0, {shade: false, time: 2 * 1000});
            var check = $('[data-side-fold]').attr('data-side-fold');
            if (check === "1") {
                $('[data-side-fold]').attr('data-side-fold', 0)
                    .attr('class', 'fa fa-indent');
                $('.layui-layout-body').removeClass('layuimini-all')
                    .addClass('layuimini-mini');
                layui.element.init();
            }
            layui.layer.close(loading);
        });
    },
};

var miniPage = {
    /**
     * 初始化tab
     * @param options
     */
    render: function (options) {
        options.homeInfo = options.homeInfo || {};
        options.menuList = options.menuList || [];
        options.multiModule = options.multiModule || false;
        options.listenSwitchCallback = options.listenSwitchCallback || function () {
        };
        var href = location.hash.replace(/^#\/([^?]*).*/, '$1');
        if (href === null || href === undefined || href === '') {
            miniPage.renderHome(options);
        } else {
            miniPage.renderPage(href, options);
            if (options.multiModule) {
                miniPage.listenSwitchMultiModule(href);
            } else {
                miniPage.listenSwitchSingleModule(href);
            }
        }
        miniPage.listenClick();
        miniPage.listenHash(options);
    },
    /**
     * 初始化主页
     * @param options
     */
    renderHome: function (options) {
        options.homeInfo = options.homeInfo || {};
        options.homeInfo.href = options.homeInfo.href || '';
        miniPage.renderPage(options.homeInfo.href, options);
    },
    findHrefMenu: function (href, menuList) {
        if (!(menuList instanceof Array)) {
            return;
        }
        for (let menu of menuList) {
            if (menu.href && menu.href.indexOf(href) > -1) {
                return menu;
            }
            if (menu.child instanceof Array) {
                let res = miniPage.findHrefMenu(href, menu.child);
                if (res) {
                    return res;
                }
            }
        }
    },
    /**
     * 初始化页面
     * @param href
     * @param options
     */
    renderPage: function (href, options) {
        var menu = miniPage.findHrefMenu(href, options.menuList);
        if (menu && menu.title) {
            document.title = menu.title + " - " + options.homeInfo.baseTitle;
        }
        $('.layuimini-content-page').attr('src', href);
    },
    /**
     * 刷新页面内容
     * @param options
     */
    refresh: function (options) {
        var href = location.hash.replace(/^#\/([^?]*).*/, '$1');
        if (href === null || href === undefined || href === '') {
            miniPage.renderHome(options);
        } else {
            miniPage.renderPage(href, options);
        }
    },
    /**
     * 单模块切换
     * @param href
     */
    listenSwitchSingleModule: function (href) {
        $("[layuimini-href]").each(function () {
            if ($(this).attr("layuimini-href") === href) {
                // 自动展开菜单栏
                function addMenuClass($element, type) {
                    if (type === 1) {
                        $element.addClass('layui-this');
                        if ($element.hasClass('layui-nav-item') && $element.hasClass('layui-this')) {
                            $(".layuimini-header-menu li").attr('class', 'layui-nav-item');
                        } else {
                            addMenuClass($element.parent().parent(), 2);
                        }
                    } else {
                        $element.addClass('layui-nav-itemed');
                        if ($element.hasClass('layui-nav-item') && $element.hasClass('layui-nav-itemed')) {
                            $(".layuimini-header-menu li").attr('class', 'layui-nav-item');
                        } else {
                            addMenuClass($element.parent().parent(), 2);
                        }
                    }
                }

                addMenuClass($(this).parent(), 1);
                return false;
            }
        });
    },
    /**
     * 多模块切换
     * @param href
     */
    listenSwitchMultiModule: function (href) {
        $("[layuimini-href]").each(function () {
            if ($(this).attr("layuimini-href") === href) {
                // 自动展开菜单栏
                function addMenuClass($element, type) {
                    if (type === 1) {
                        $element.addClass('layui-this');
                        if ($element.hasClass('layui-nav-item') && $element.hasClass('layui-this')) {
                            let moduleId = $element.parent().attr('id');
                            $(".layuimini-header-menu li").attr('class', 'layui-nav-item');
                            $("#" + moduleId + "HeaderId").addClass("layui-this");
                            $(".layuimini-menu-left .layui-nav.layui-nav-tree").attr('class', 'layui-nav layui-nav-tree layui-hide');
                            $("#" + moduleId).attr('class', 'layui-nav layui-nav-tree layui-this');
                        } else {
                            addMenuClass($element.parent().parent(), 2);
                        }
                    } else {
                        $element.addClass('layui-nav-itemed');
                        if ($element.hasClass('layui-nav-item') && $element.hasClass('layui-nav-itemed')) {
                            let moduleId = $element.parent().attr('id');
                            $(".layuimini-header-menu li").attr('class', 'layui-nav-item');
                            $("#" + moduleId + "HeaderId").addClass("layui-this");
                            $(".layuimini-menu-left .layui-nav.layui-nav-tree").attr('class', 'layui-nav layui-nav-tree layui-hide');
                            $("#" + moduleId).attr('class', 'layui-nav layui-nav-tree layui-this');
                        } else {
                            addMenuClass($element.parent().parent(), 2);
                        }
                    }
                }

                addMenuClass($(this).parent(), 1);
                return false;
            }
        });
    },
    /**
     * 修改hash地址定位
     * @param href
     */
    hashChange: function (href) {
        window.location.hash = "/" + href;
    },
    /**
     * 修改hash地址为主页
     */
    hashHome: function () {
        window.location.hash = "/";
        window.history.replaceState("", "", ".");
    },
    /**
     * 监听
     */
    listenClick: function () {
        /**
         * 打开新窗口
         */
        $('[layuimini-href]').on('click', function () {
            var loading = layui.layer.load(0, {shade: false, time: 2 * 1000});
            var href = $(this).attr('layuimini-href'), target = $(this).attr('target');
            if (!href) return;
            var el = $("[layuimini-href='" + href + "']", ".layuimini-menu-left");
            layui.layer.close(window.openTips);
            if (el.length) {
                $(el).closest(".layui-nav-tree").find(".layui-this").removeClass("layui-this");
                $(el).parent().addClass("layui-this");
            }
            if (target === '_blank') {
                layui.layer.close(loading);
                window.open(href, "_blank");
                return false;
            }
            miniPage.hashChange(href);
            $('.layuimini-menu-left').attr('layuimini-page-add', 'yes');
            layui.layer.close(loading);
        });
        /**
         * 返回主页
         */
        $('.layuimini-back-home').on('click', function () {
            miniPage.hashHome();
        });
    },
    /**
     * 监听hash变化
     * @returns {boolean}
     */
    listenHash: function (options) {
        options.homeInfo = options.homeInfo || {};
        options.multiModule = options.multiModule || false;
        options.listenSwitchCallback = options.listenSwitchCallback || function () {
        };
        window.onhashchange = function () {
            var href = location.hash.replace(/^#\/([^?]*).*/, '$1');
            if (typeof options.listenSwitchCallback === 'function') {
                options.listenSwitchCallback();
            }
            if (href === null || href === undefined || href === '') {
                $("[layuimini-href]").parent().removeClass('layui-this');
                miniPage.renderHome(options);
            } else {
                miniPage.renderPage(href, options);
            }
            if ($('.layuimini-menu-left').attr('layuimini-page-add') === 'yes') {
                $('.layuimini-menu-left').attr('layuimini-page-add', 'no');
            } else {
                // 从页面中打开的话，浏览器前进后退、需要重新定位菜单焦点
                $("[layuimini-href]").parent().removeClass('layui-this');
                if (options.multiModule) {
                    miniPage.listenSwitchMultiModule(href);
                } else {
                    miniPage.listenSwitchSingleModule(href);
                }
            }
        };
    },
};

var miniTheme = {
    /**
     * 主题配置项
     * @param bgcolorId
     * @returns {{headerLogo, menuLeftHover, headerRight, menuLeft, headerRightThis, menuLeftThis}|*|*[]}
     */
    config: function (bgcolorId) {
        var bgColorConfig = [{
            headerRightBg: '#f9f9f9', //头部右侧背景色
            headerRightBgThis: '#e4e4e4', //头部右侧选中背景色,
            headerRightColor: 'rgba(107, 107, 107, 0.7)', //头部右侧字体颜色,
            headerRightChildColor: 'rgba(107, 107, 107, 0.7)', //头部右侧下拉字体颜色,
            headerRightColorThis: '#565656', //头部右侧鼠标选中,
            headerRightNavMore: 'rgba(160, 160, 160, 0.7)', //头部右侧更多下拉颜色,
            headerRightNavMoreBg: '#1E9FFF', //头部右侧更多下拉列表选中背景色,
            headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
            headerRightToolColor: '#565656', //头部缩放按钮样式,
            headerLogoBg: '#192027', //logo背景颜色,
            headerLogoColor: '#bfbbbb', //logo字体颜色,
            leftMenuNavMore: '#bfbbbb', //左侧菜单更多下拉样式,
            leftMenuBg: '#28333E', //左侧菜单背景,
            leftMenuBgThis: '#1E9FFF', //左侧菜单选中背景,
            leftMenuChildBg: '#0c0f13', //左侧菜单子菜单背景,
            leftMenuColor: '#bfbbbb', //左侧菜单字体颜色,
            leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
            tabActiveColor: '#1e9fff', //tab选项卡选中颜色,
        }, {
            headerRightBg: '#23262e', //头部右侧背景色
            headerRightBgThis: '#0c0c0c', //头部右侧选中背景色,
            headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
            headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
            headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
            headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
            headerRightNavMoreBg: '#1aa094', //头部右侧更多下拉列表选中背景色,
            headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
            headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
            headerLogoBg: '#0c0c0c', //logo背景颜色,
            headerLogoColor: '#ffffff', //logo字体颜色,
            leftMenuNavMore: '#bfbbbb', //左侧菜单更多下拉样式,
            leftMenuBg: '#23262e', //左侧菜单背景,
            leftMenuBgThis: '#737373', //左侧菜单选中背景,
            leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
            leftMenuColor: '#bfbbbb', //左侧菜单字体颜色,
            leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
            tabActiveColor: '#23262e', //tab选项卡选中颜色,
        }, {
            headerRightBg: '#ffa4d1', //头部右侧背景色
            headerRightBgThis: '#bf7b9d', //头部右侧选中背景色,
            headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
            headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
            headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
            headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
            headerRightNavMoreBg: '#ffa4d1', //头部右侧更多下拉列表选中背景色,
            headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
            headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
            headerLogoBg: '#e694bd', //logo背景颜色,
            headerLogoColor: '#ffffff', //logo字体颜色,
            leftMenuNavMore: '#bfbbbb', //左侧菜单更多下拉样式,
            leftMenuBg: '#1f1f1f', //左侧菜单背景,
            leftMenuBgThis: '#bf7b9d', //左侧菜单选中背景,
            leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
            leftMenuColor: '#bfbbbb', //左侧菜单字体颜色,
            leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
            tabActiveColor: '#ffa4d1', //tab选项卡选中颜色,
        }, {
            headerRightBg: '#1aa094', //头部右侧背景色
            headerRightBgThis: '#197971', //头部右侧选中背景色,
            headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
            headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
            headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
            headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
            headerRightNavMoreBg: '#1aa094', //头部右侧更多下拉列表选中背景色,
            headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
            headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
            headerLogoBg: '#0c0c0c', //logo背景颜色,
            headerLogoColor: '#ffffff', //logo字体颜色,
            leftMenuNavMore: '#bfbbbb', //左侧菜单更多下拉样式,
            leftMenuBg: '#23262e', //左侧菜单背景,
            leftMenuBgThis: '#1aa094', //左侧菜单选中背景,
            leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
            leftMenuColor: '#bfbbbb', //左侧菜单字体颜色,
            leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
            tabActiveColor: '#1aa094', //tab选项卡选中颜色,
        }, {
            headerRightBg: '#1e9fff', //头部右侧背景色
            headerRightBgThis: '#0069b7', //头部右侧选中背景色,
            headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
            headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
            headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
            headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
            headerRightNavMoreBg: '#1e9fff', //头部右侧更多下拉列表选中背景色,
            headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
            headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
            headerLogoBg: '#0c0c0c', //logo背景颜色,
            headerLogoColor: '#ffffff', //logo字体颜色,
            leftMenuNavMore: '#bfbbbb', //左侧菜单更多下拉样式,
            leftMenuBg: '#1f1f1f', //左侧菜单背景,
            leftMenuBgThis: '#1e9fff', //左侧菜单选中背景,
            leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
            leftMenuColor: '#bfbbbb', //左侧菜单字体颜色,
            leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
            tabActiveColor: '#1e9fff', //tab选项卡选中颜色,
        }, {
            headerRightBg: '#ffb800', //头部右侧背景色
            headerRightBgThis: '#d09600', //头部右侧选中背景色,
            headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
            headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
            headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
            headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
            headerRightNavMoreBg: '#d09600', //头部右侧更多下拉列表选中背景色,
            headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
            headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
            headerLogoBg: '#243346', //logo背景颜色,
            headerLogoColor: '#ffffff', //logo字体颜色,
            leftMenuNavMore: '#bfbbbb', //左侧菜单更多下拉样式,
            leftMenuBg: '#2f4056', //左侧菜单背景,
            leftMenuBgThis: '#8593a7', //左侧菜单选中背景,
            leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
            leftMenuColor: '#bfbbbb', //左侧菜单字体颜色,
            leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
            tabActiveColor: '#ffb800', //tab选项卡选中颜色,
        }, {
            headerRightBg: '#e82121', //头部右侧背景色
            headerRightBgThis: '#ae1919', //头部右侧选中背景色,
            headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
            headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
            headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
            headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
            headerRightNavMoreBg: '#ae1919', //头部右侧更多下拉列表选中背景色,
            headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
            headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
            headerLogoBg: '#0c0c0c', //logo背景颜色,
            headerLogoColor: '#ffffff', //logo字体颜色,
            leftMenuNavMore: '#bfbbbb', //左侧菜单更多下拉样式,
            leftMenuBg: '#1f1f1f', //左侧菜单背景,
            leftMenuBgThis: '#3b3f4b', //左侧菜单选中背景,
            leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
            leftMenuColor: '#bfbbbb', //左侧菜单字体颜色,
            leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
            tabActiveColor: '#e82121', //tab选项卡选中颜色,
        }, {
            headerRightBg: '#963885', //头部右侧背景色
            headerRightBgThis: '#772c6a', //头部右侧选中背景色,
            headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
            headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
            headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
            headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
            headerRightNavMoreBg: '#772c6a', //头部右侧更多下拉列表选中背景色,
            headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
            headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
            headerLogoBg: '#243346', //logo背景颜色,
            headerLogoColor: '#ffffff', //logo字体颜色,
            leftMenuNavMore: '#bfbbbb', //左侧菜单更多下拉样式,
            leftMenuBg: '#2f4056', //左侧菜单背景,
            leftMenuBgThis: '#586473', //左侧菜单选中背景,
            leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
            leftMenuColor: '#bfbbbb', //左侧菜单字体颜色,
            leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
            tabActiveColor: '#963885', //tab选项卡选中颜色,
        }, {
            headerRightBg: '#2D8CF0', //头部右侧背景色
            headerRightBgThis: '#0069b7', //头部右侧选中背景色,
            headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
            headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
            headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
            headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
            headerRightNavMoreBg: '#0069b7', //头部右侧更多下拉列表选中背景色,
            headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
            headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
            headerLogoBg: '#0069b7', //logo背景颜色,
            headerLogoColor: '#ffffff', //logo字体颜色,
            leftMenuNavMore: '#bfbbbb', //左侧菜单更多下拉样式,
            leftMenuBg: '#1f1f1f', //左侧菜单背景,
            leftMenuBgThis: '#2D8CF0', //左侧菜单选中背景,
            leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
            leftMenuColor: '#bfbbbb', //左侧菜单字体颜色,
            leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
            tabActiveColor: '#2d8cf0', //tab选项卡选中颜色,
        }, {
            headerRightBg: '#ffb800', //头部右侧背景色
            headerRightBgThis: '#d09600', //头部右侧选中背景色,
            headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
            headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
            headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
            headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
            headerRightNavMoreBg: '#d09600', //头部右侧更多下拉列表选中背景色,
            headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
            headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
            headerLogoBg: '#d09600', //logo背景颜色,
            headerLogoColor: '#ffffff', //logo字体颜色,
            leftMenuNavMore: '#bfbbbb', //左侧菜单更多下拉样式,
            leftMenuBg: '#2f4056', //左侧菜单背景,
            leftMenuBgThis: '#d09600', //左侧菜单选中背景,
            leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
            leftMenuColor: '#bfbbbb', //左侧菜单字体颜色,
            leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
            tabActiveColor: '#ffb800', //tab选项卡选中颜色,
        }, {
            headerRightBg: '#e82121', //头部右侧背景色
            headerRightBgThis: '#ae1919', //头部右侧选中背景色,
            headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
            headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
            headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
            headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
            headerRightNavMoreBg: '#ae1919', //头部右侧更多下拉列表选中背景色,
            headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
            headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
            headerLogoBg: '#d91f1f', //logo背景颜色,
            headerLogoColor: '#ffffff', //logo字体颜色,
            leftMenuNavMore: '#bfbbbb', //左侧菜单更多下拉样式,
            leftMenuBg: '#1f1f1f', //左侧菜单背景,
            leftMenuBgThis: '#3b3f4b', //左侧菜单选中背景,
            leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
            leftMenuColor: '#bfbbbb', //左侧菜单字体颜色,
            leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
            tabActiveColor: '#e82121', //tab选项卡选中颜色,
        }, {
            headerRightBg: '#963885', //头部右侧背景色
            headerRightBgThis: '#772c6a', //头部右侧选中背景色,
            headerRightColor: 'rgba(255,255,255,.7)', //头部右侧字体颜色,
            headerRightChildColor: '#676767', //头部右侧下拉字体颜色,
            headerRightColorThis: '#ffffff', //头部右侧鼠标选中,
            headerRightNavMore: 'rgba(255,255,255,.7)', //头部右侧更多下拉颜色,
            headerRightNavMoreBg: '#772c6a', //头部右侧更多下拉列表选中背景色,
            headerRightNavMoreColor: '#ffffff', //头部右侧更多下拉列表字体色,
            headerRightToolColor: '#bbe3df', //头部缩放按钮样式,
            headerLogoBg: '#772c6a', //logo背景颜色,
            headerLogoColor: '#ffffff', //logo字体颜色,
            leftMenuNavMore: '#bfbbbb', //左侧菜单更多下拉样式,
            leftMenuBg: '#2f4056', //左侧菜单背景,
            leftMenuBgThis: '#626f7f', //左侧菜单选中背景,
            leftMenuChildBg: 'rgba(0,0,0,.3)', //左侧菜单子菜单背景,
            leftMenuColor: '#bfbbbb', //左侧菜单字体颜色,
            leftMenuColorThis: '#ffffff', //左侧菜单选中字体颜色,
            tabActiveColor: '#963885', //tab选项卡选中颜色,
        }];
        if (bgcolorId === undefined) {
            return bgColorConfig;
        } else {
            return bgColorConfig[bgcolorId];
        }
    },
    /**
     * 初始化
     * @param options
     */
    render: function (options) {
        options.bgColorDefault = options.bgColorDefault || false;
        options.listen = options.listen || false;
        var bgcolorId = sessionStorage.getItem('layuiminiBgcolorId');
        if (bgcolorId === null || bgcolorId === undefined || bgcolorId === '') {
            bgcolorId = options.bgColorDefault;
        }
        miniTheme.buildThemeCss(bgcolorId);
        if (options.listen) miniTheme.listenTheme(options);
    },
    /**
     * 构建主题样式
     * @param bgcolorId
     * @returns {boolean}
     */
    buildThemeCss: function (bgcolorId) {
        if (!bgcolorId) {
            return false;
        }
        var bgColorData = miniTheme.config(bgcolorId);
        var styleHtml = "/*头部右侧背景色*/\n" +
            ".layui-layout-admin .layui-header{\n" +
            " background-color:#headerRightBg !important;\n" +
            "}\n" +
            "/*头部右侧选中背景色*/\n" +
            ".layui-layout-admin .layui-header .layuimini-header-content > ul > .layui-nav-item.layui-this,\n" +
            ".layuimini-tool i:hover{\n" +
            " background-color:#headerRightBgThis !important;\n" +
            "}\n" +
            "/*头部右侧字体颜色*/\n" +
            ".layui-layout-admin .layui-header .layui-nav .layui-nav-item a{\n" +
            " color:#headerRightColor;\n" +
            "}\n" +
            "/**头部右侧下拉字体颜色*/\n" +
            ".layui-layout-admin .layui-header .layui-nav .layui-nav-item .layui-nav-child a{\n" +
            " color:#headerRightChildColor !important;\n" +
            "}\n" +
            "/*头部右侧鼠标选中*/\n" +
            ".layui-header .layuimini-menu-header-pc.layui-nav .layui-nav-item a:hover,\n" +
            ".layui-header .layuimini-header-menu.layuimini-pc-show.layui-nav .layui-this a{\n" +
            " color:#headerRightColorThis !important;\n" +
            "}\n" +
            "/*头部右侧更多下拉颜色*/\n" +
            ".layui-header .layui-nav .layui-nav-more{\n" +
            " border-top-color:#headerRightNavMore !important;\n" +
            "}\n" +
            "/*头部右侧更多下拉颜色*/\n" +
            ".layui-header .layui-nav .layui-nav-mored,\n" +
            ".layui-header .layui-nav-itemed > a .layui-nav-more{\n" +
            " border-color:transparent transparent #headerRightNavMore !important;\n" +
            "}\n" +
            "/**头部右侧更多下拉配置色*/\n" +
            ".layui-header .layui-nav .layui-nav-child dd.layui-this a,\n" +
            ".layui-header .layui-nav-child dd.layui-this,\n" +
            ".layui-layout-admin .layui-header .layui-nav .layui-nav-item .layui-nav-child .layui-this a{\n" +
            " background-color:#headerRightNavMoreBg !important;\n" +
            " color:#headerRightNavMoreColor !important;\n" +
            "}\n" +
            "/*头部缩放按钮样式*/\n" +
            ".layui-layout-admin .layui-header .layuimini-tool i{\n" +
            " color:#headerRightToolColor;\n" +
            "}\n" +
            "/*logo背景颜色*/\n" +
            ".layui-layout-admin .layuimini-logo{\n" +
            " background-color:#headerLogoBg !important;\n" +
            "}\n" +
            "/*logo字体颜色*/\n" +
            ".layui-layout-admin .layuimini-logo h1{\n" +
            " color:#headerLogoColor;\n" +
            "}\n" +
            "/*左侧菜单更多下拉样式*/\n" +
            ".layuimini-menu-left .layui-nav .layui-nav-more,\n" +
            ".layuimini-menu-left-zoom.layui-nav .layui-nav-more{\n" +
            " border-top-color:#leftMenuNavMore;\n" +
            "}\n" +
            "/*左侧菜单更多下拉样式*/\n" +
            ".layuimini-menu-left .layui-nav .layui-nav-mored,\n" +
            ".layuimini-menu-left .layui-nav-itemed > a .layui-nav-more,\n" +
            ".layuimini-menu-left-zoom.layui-nav .layui-nav-mored,\n" +
            ".layuimini-menu-left-zoom.layui-nav-itemed > a .layui-nav-more{\n" +
            " border-color:transparent transparent #leftMenuNavMore !important;\n" +
            "}\n" +
            "/*左侧菜单背景*/\n" +
            ".layui-side.layui-bg-black,\n" +
            ".layui-side.layui-bg-black > .layuimini-menu-left > ul,\n" +
            ".layuimini-menu-left-zoom > ul{\n" +
            " background-color:#leftMenuBg !important;\n" +
            "}\n" +
            "/*左侧菜单选中背景*/\n" +
            ".layuimini-menu-left .layui-nav-tree .layui-this,\n" +
            ".layuimini-menu-left .layui-nav-tree .layui-this > a,\n" +
            ".layuimini-menu-left .layui-nav-tree .layui-nav-child dd.layui-this,\n" +
            ".layuimini-menu-left .layui-nav-tree .layui-nav-child dd.layui-this a,\n" +
            ".layuimini-menu-left-zoom.layui-nav-tree .layui-this,\n" +
            ".layuimini-menu-left-zoom.layui-nav-tree .layui-this > a,\n" +
            ".layuimini-menu-left-zoom.layui-nav-tree .layui-nav-child dd.layui-this,\n" +
            ".layuimini-menu-left-zoom.layui-nav-tree .layui-nav-child dd.layui-this a{\n" +
            " background-color:#leftMenuBgThis !important\n" +
            "}\n" +
            "/*左侧菜单子菜单背景*/\n" +
            ".layuimini-menu-left .layui-nav-itemed > .layui-nav-child{\n" +
            " background-color:#leftMenuChildBg !important;\n" +
            "}\n" +
            "/*左侧菜单字体颜色*/\n" +
            ".layuimini-menu-left .layui-nav .layui-nav-item a,\n" +
            ".layuimini-menu-left-zoom.layui-nav .layui-nav-item a{\n" +
            " color:#leftMenuColor !important;\n" +
            "}\n" +
            "/*左侧菜单选中字体颜色*/\n" +
            ".layuimini-menu-left .layui-nav .layui-nav-item a:hover,\n" +
            ".layuimini-menu-left .layui-nav .layui-this a,\n" +
            ".layuimini-menu-left-zoom.layui-nav .layui-nav-item a:hover,\n" +
            ".layuimini-menu-left-zoom.layui-nav .layui-this a{\n" +
            " color:#leftMenuColorThis !important;\n" +
            "}\n" +
            "/**tab选项卡选中颜色*/\n" +
            ".layuimini-tab .layui-tab-title .layui-this .layuimini-tab-active{\n" +
            " background-color:#tabActiveColor;\n" +
            "}";
        for (const key in bgColorData) {
            styleHtml = styleHtml.replace("#" + key, bgColorData[key])
        }
        $('#layuimini-bg-color').html(styleHtml);
    },
    /**
     * 构建主题选择html
     * @param options
     * @returns {string}
     */
    buildBgColorHtml: function (options) {
        options.bgColorDefault = options.bgColorDefault || 0;
        var bgcolorId = parseInt(sessionStorage.getItem('layuiminiBgcolorId'));
        if (isNaN(bgcolorId)) bgcolorId = options.bgColorDefault;
        var bgColorConfig = miniTheme.config();
        var html = '';
        $.each(bgColorConfig, function (key, val) {
            if (key === bgcolorId) {
                html += '<li class="layui-this" data-select-bgcolor="' + key + '">\n';
            } else {
                html += '<li  data-select-bgcolor="' + key + '">\n';
            }
            html += '<a href="javascript:;" class="clearfix full-opacity-hover">\n' +
                '<div><span style="display:block; width: 20%; float: left; height: 12px; background: ' + val.headerLogoBg +
                ';"></span><span style="display:block; width: 80%; float: left; height: 12px; background: ' + val.headerRightBg +
                ';"></span></div>\n' + '<div><span style="display:block; width: 20%; float: left; height: 40px; background: ' + val.leftMenuBg +
                ';"></span><span style="display:block; width: 80%; float: left; height: 40px; background: #ffffff;">' +
                '</span></div>\n' + '</a>\n' + '</li>';
        });
        return html;
    },
    /**
     * 监听
     * @param options
     */
    listenTheme: function (options) {
        $('[data-bgcolor]').on('click', function () {
            var loading = layui.layer.load(0, {shade: false, time: 2 * 1000});
            var bgColorHtml = miniTheme.buildBgColorHtml(options);
            var html = '<div class="layuimini-color">\n<div class="color-title">\n' +
                '<span class="fa fa-delicious"/> 主题风格\n</div>\n' +
                '<div class="color-content">\n<ul>\n' + bgColorHtml + '</ul>\n</div>\n' +
                '<div class="more-menu-list">\n' +
                '<a class="more-menu-item" href="index.html" target="_self">' +
                '<span class="fa fa-home"/> 主页设置</a>\n' +
                '</div>\n</div>';
            layui.layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                shade: 0.1,
                anim: 2,
                shadeClose: true,
                area: ['340px', 'calc(100% - 60px)'],
                offset: 'rb',
                content: html,
                success: function () {
                    $('[data-select-bgcolor]').on('click', function () {
                        var bgcolorId = $(this).attr('data-select-bgcolor');
                        $('.layuimini-color .color-content ul .layui-this').attr('class', '');
                        $(this).attr('class', 'layui-this');
                        sessionStorage.setItem('layuiminiBgcolorId', bgcolorId);
                        miniTheme.render({
                            bgColorDefault: bgcolorId, listen: false,
                        });
                    });
                },
                end: function () {
                    $('.layuimini-select-bgcolor').removeClass('layui-this');
                }
            });
            layui.layer.close(loading);
        });
    }
};

var miniAdmin = {
    /**
     * 后台框架初始化
     * @param options.initUrl   后台初始化接口
     * @param options.initData   后台初始化数据
     * @param options.bgColorDefault 默认皮肤
     * @param options.multiModule 是否开启多模块
     * @param options.menuChildOpen 是否展开子菜单
     */
    render: function (options) {
        options.initUrl = options.initUrl || "";
        options.bgColorDefault = options.bgColorDefault || 0;
        options.multiModule = options.multiModule || false;
        options.menuChildOpen = options.menuChildOpen || false;

        if (options.initData) {
            var data = options.initData
            miniAdmin.renderLogo(data.homeInfo);
            miniMenu.render({
                menuList: data.menuInfo, multiModule: options.multiModule,
                menuChildOpen: options.menuChildOpen
            });
            miniPage.render({
                homeInfo: data.homeInfo,
                menuList: data.menuInfo,
                multiModule: options.multiModule,
                menuChildOpen: options.menuChildOpen,
                listenSwitchCallback: function () {
                    miniAdmin.renderDevice();
                }
            });
            miniTheme.render({
                bgColorDefault: options.bgColorDefault, listen: true,
            });
            miniAdmin.listenAdmin({
                homeInfo: data.homeInfo, multiModule: options.multiModule,
            });
        } else {
            $.getJSON(options.initUrl, function (data) {
                options.initData = data || {};
                miniAdmin.render(options);
            }).fail(function () {
                miniAdmin.error('菜单接口有误');
            });
        }
    },
    /**
     * 初始化logo
     */
    renderLogo: function (homeInfo) {
        $('.layuimini-logo').html('<a><img src="image/logo.png" alt="logo"><h1>' +
            homeInfo.baseTitle + '</h1></a>');
    },
    /**
     * 进入全屏
     */
    fullScreen: function () {
        var el = document.documentElement;
        if (el.requestFullScreen) {
            el.requestFullScreen();
        } else if (el.webkitRequestFullScreen) {
            el.webkitRequestFullScreen();
        }  else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        } else if (el.oRequestFullscreen) {
            el.oRequestFullscreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        }else if (window.ActiveXObject) {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript) {
                wscript.SendKeys("{F11}");
            }
        } else {
            miniAdmin.error('浏览器不支持全屏调用！');
        }
    },
    /**
     * 退出全屏
     */
    exitFullScreen: function () {
        var el = document;
        if (el.cancelFullScreen) {
            el.cancelFullScreen();
        }else if (el.webkitCancelFullScreen) {
            el.webkitCancelFullScreen();
        }else if (el.exitFullScreen) {
            el.exitFullScreen();
        } else if (el.msExitFullscreen) {
            el.msExitFullscreen();
        } else if (el.oRequestFullscreen) {
            el.oCancelFullScreen();
        } else if (el.mozCancelFullScreen) {
            el.mozCancelFullScreen();
        } else if (el.webkitCancelFullScreen) {
            el.webkitCancelFullScreen();
        }  else if (window.ActiveXObject) {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript) {
                wscript.SendKeys("{F11}");
            }
        } else {
            miniAdmin.error('浏览器不支持全屏调用！');
        }
    },
    /**
     * 初始化设备端
     */
    renderDevice: function () {
        if (miniAdmin.checkMobile()) {
            $('.layuimini-tool i').attr('data-side-fold', 1)
                .attr('class', 'fa fa-outdent');
            $('.layui-layout-body').removeClass('layuimini-mini')
                .addClass('layuimini-all');
        }
    },
    /**
     * 成功
     * @param title
     * @returns {*}
     */
    success: function (title) {
        return layui.layer.msg(title, {icon: 1, shade: this.shade, scrollbar: false, time: 2000, shadeClose: true});
    }, /**
     * 失败
     * @param title
     * @returns {*}
     */
    error: function (title) {
        return layui.layer.msg(title, {icon: 2, shade: this.shade, scrollbar: false, time: 3000, shadeClose: true});
    },
    /**
     * 判断是否为手机
     * @returns {boolean}
     */
    checkMobile: function () {
        var ua = navigator.userAgent.toLocaleLowerCase();
        var pf = navigator.platform.toLocaleLowerCase();
        var isAndroid = (/android/i).test(ua) || ((/iPhone|iPod|iPad/i).test(ua) &&
            (/linux/i).test(pf)) || (/ucweb.*linux/i.test(ua));
        var isIOS = (/iPhone|iPod|iPad/i).test(ua) && !isAndroid;
        var isWinPhone = (/Windows Phone|ZuneWP7/i).test(ua);
        var clientWidth = document.documentElement.clientWidth;
        return !(!isAndroid && !isIOS && !isWinPhone && clientWidth > 1024);
    },
    /**
     * 监听
     * @param options
     */
    listenAdmin: function (options) {
        options.homeInfo = options.homeInfo || {};
        /**
         * 刷新
         */
        $('.layuimini-refresh').on('click', function () {
            miniPage.refresh(options);
            miniAdmin.success('刷新成功');
        });
        /**
         * 监听提示信息
         */
        $(".layui-nav-tree .menu-li").on("mouseenter", function () {
            if (miniAdmin.checkMobile()) {
                return false;
            }
            var tips = $(this).html();
            var isShow = $('.layuimini-tool i').attr('data-side-fold');
            if (isShow === "0" && tips) {
                tips = "<ul class='layuimini-menu-left-zoom layui-nav layui-nav-tree layui-this'>" +
                    "<li class='layui-nav-item layui-nav-itemed'>" + tips + "</li></ul>";
                window.openTips = layui.layer.tips(tips, $(this), {
                    tips: [2, '#2f4056'],
                    time: 10000,
                    skin: "popup-tips",
                    success: function (el) {
                        var left = $(el).position().left - 10;
                        $(el).css({left: left});
                        layui.element.render();
                        $(".popup-tips").on("mouseleave", function () {
                            if (miniAdmin.checkMobile()) {
                                return false;
                            }
                            var isShow = $('.layuimini-tool i').attr('data-side-fold');
                            if (isShow === "0") {
                                try {
                                    layui.layer.close(window.openTips);
                                } catch (e) {
                                    console.log(e.message);
                                }
                            }
                        });
                    }
                });
            }
        });
        /**
         * 全屏
         */
        $('[data-check-screen]').on('click', function () {
            var check = $(this).attr('data-check-screen');
            if (check === 'full') {
                miniAdmin.fullScreen();
                $(this).attr('data-check-screen', 'exit');
                $(this).html('<i class="fa fa-compress"></i>');
            } else {
                miniAdmin.exitFullScreen();
                $(this).attr('data-check-screen', 'full');
                $(this).html('<i class="fa fa-arrows-alt"></i>');
            }
        });
        /**
         * 点击遮罩层
         */
        $('.layuimini-mobile-mask').on('click', function () {
            miniAdmin.renderDevice();
        });
    }
};
