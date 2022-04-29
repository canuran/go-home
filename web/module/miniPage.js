/**
 * date:2020/02/27
 * author:Mr.Chung
 * version:2.0
 * description:layuimini 单页框架扩展
 */
layui.define(function (exports) {
    var layer = layui.layer;

    function findMenuByHref(href, menuList) {
        if (!(menuList instanceof Array)) {
            return;
        }
        for (let menu of menuList) {
            if (menu.href && menu.href.indexOf(href) > -1) {
                return menu;
            }
            if (menu.child instanceof Array) {
                let res = findMenuByHref(href, menu.child);
                if (res) {
                    return res;
                }
            }
        }
    }

    var miniPage = {
        /**
         * 初始化tab
         * @param options
         */
        render: function (options) {
            options.homeInfo = options.homeInfo || {};
            options.menuList = options.menuList || [];
            options.multiModule = options.multiModule || false;
            options.listenSwichCallback = options.listenSwichCallback || function () {
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
            miniPage.listen(options);
            miniPage.listenHash(options);
        }, /**
         * 初始化主页
         * @param options
         */
        renderHome: function (options) {
            options.homeInfo = options.homeInfo || {};
            options.homeInfo.href = options.homeInfo.href || '';
            miniPage.renderPageContent(options.homeInfo.href, options);
        }, /**
         * 初始化页面
         * @param href
         * @param options
         */
        renderPage: function (href, options) {
            miniPage.renderPageContent(href, options);
        }, /**
         * 初始化页面内容
         * @param options
         * @param href
         */
        renderPageContent: function (href, options) {
            var menu = findMenuByHref(href, options.menuList);
            if (menu && menu.title) {
                document.title = menu.title + " - " + options.homeInfo.baseTitle;
            }
            $('.layuimini-content-page').attr('src', href);
        }, /**
         * 刷新页面内容
         * @param options
         */
        refresh: function (options) {
            var href = location.hash.replace(/^#\/([^?]*).*/, '$1');
            if (href === null || href === undefined || href === '') {
                miniPage.renderHome(options);
            } else {
                miniPage.renderPageContent(href, options);
            }
        }, /**
         * 单模块切换
         * @param tabId
         */
        listenSwitchSingleModule: function (tabId) {
            $("[layuimini-href]").each(function () {
                if ($(this).attr("layuimini-href") === tabId) {
                    // 自动展开菜单栏
                    var addMenuClass = function ($element, type) {
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
                    };
                    addMenuClass($(this).parent(), 1);
                    return false;
                }
            });
        }, /**
         * 多模块切换
         * @param tabId
         */
        listenSwitchMultiModule: function (tabId) {
            $("[layuimini-href]").each(function () {
                if ($(this).attr("layuimini-href") === tabId) {
                    // 自动展开菜单栏
                    var addMenuClass = function ($element, type) {
                        if (type === 1) {
                            $element.addClass('layui-this');
                            if ($element.hasClass('layui-nav-item') && $element.hasClass('layui-this')) {
                                var moduleId = $element.parent().attr('id');
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
                                var moduleId = $element.parent().attr('id');
                                $(".layuimini-header-menu li").attr('class', 'layui-nav-item');
                                $("#" + moduleId + "HeaderId").addClass("layui-this");
                                $(".layuimini-menu-left .layui-nav.layui-nav-tree").attr('class', 'layui-nav layui-nav-tree layui-hide');
                                $("#" + moduleId).attr('class', 'layui-nav layui-nav-tree layui-this');
                            } else {
                                addMenuClass($element.parent().parent(), 2);
                            }
                        }
                    };
                    addMenuClass($(this).parent(), 1);
                    return false;
                }
            });
        }, /**
         * 修改hash地址定位
         * @param href
         */
        hashChange: function (href) {
            window.location.hash = "/" + href;
        }, /**
         * 修改hash地址为主页
         */
        hashHome: function () {
            window.location.hash = "/";
        }, /**
         * 监听
         * @param options
         */
        listen: function (options) {
            /**
             * 打开新窗口
             */
            $('[layuimini-href]').on('click', function () {
                var loading = layer.load(0, {shade: false, time: 2 * 1000});
                var href = $(this).attr('layuimini-href'), target = $(this).attr('target');
                if (!href) return;
                var el = $("[layuimini-href='" + href + "']", ".layuimini-menu-left");
                layer.close(window.openTips);
                if (el.length) {
                    $(el).closest(".layui-nav-tree").find(".layui-this").removeClass("layui-this");
                    $(el).parent().addClass("layui-this");
                }
                if (target === '_blank') {
                    layer.close(loading);
                    window.open(href, "_blank");
                    return false;
                }
                miniPage.hashChange(href);
                $('.layuimini-menu-left').attr('layuimini-page-add', 'yes');
                layer.close(loading);
            });
            /**
             * 在子页面上打开新窗口
             */
            $('[layuimini-content-href]').on('click', function () {
                var loading = parent.layer.load(0, {shade: false, time: 2 * 1000});
                var href = $(this).attr('layuimini-content-href'), title = $(this).attr('data-title'),
                    target = $(this).attr('target');
                if (!href) return;
                var el = $("[layuimini-href='" + href + "']", ".layuimini-menu-left");
                layer.close(window.openTips);
                if (el.length) {
                    $(el).closest(".layui-nav-tree").find(".layui-this").removeClass("layui-this");
                    $(el).parent().addClass("layui-this");
                }
                if (target === '_blank') {
                    parent.layer.close(loading);
                    window.open(href, "_blank");
                    return false;
                }
                sessionStorage.setItem('layuimini_page_title', title);
                miniPage.hashChange(href);
                parent.layer.close(loading);
            });
            /**
             * 返回主页
             */
            $('.layuimini-back-home').on('click', function () {
                miniPage.hashHome();
            });
        }, /**
         * 监听hash变化
         * @returns {boolean}
         */
        listenHash: function (options) {
            options.homeInfo = options.homeInfo || {};
            options.multiModule = options.multiModule || false;
            options.listenSwichCallback = options.listenSwichCallback || function () {
            };
            window.onhashchange = function () {
                var href = location.hash.replace(/^#\/([^?]*).*/, '$1');
                if (typeof options.listenSwichCallback === 'function') {
                    options.listenSwichCallback();
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
    exports("miniPage", miniPage);
});
