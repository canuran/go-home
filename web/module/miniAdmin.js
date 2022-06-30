/**
 * date:2020/02/27
 * author:Mr.Chung
 * version:2.0
 * description:layuimini 主体框架扩展
 */
layui.define(["miniMenu", "miniPage", "miniTheme"], function (exports) {
    var element = layui.element, layer = layui.layer, miniMenu = layui.miniMenu,
        miniTheme = layui.miniTheme, miniPage = layui.miniPage;

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
            miniAdmin.renderLogo();
            var initByData = function (data) {
                data = data || {
                    homeInfo: {title: "无标题", baseTitle: "无标题", href: ""},
                    menuInfo: [{
                        title: "无导航", icon: "fa fa-home", child: [{
                            title: "无菜单", href: "", "icon": "fa fa-home", target: "_self"
                        }]
                    }]
                };
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
                miniAdmin.listen({
                    homeInfo: data.homeInfo, multiModule: options.multiModule,
                });
            }
            if (options.initData) {
                initByData(options.initData);
            } else {
                $.getJSON(options.initUrl, initByData).fail(function () {
                    miniAdmin.error('菜单接口有误');
                });
            }
        }, /**
         * 初始化logo
         * @param data
         */
        renderLogo: function () {
            var html = '<a><img src="image/logo.png" alt="logo"><h1>后端之家</h1></a>';
            $('.layuimini-logo').html(html);
        }, /**
         * 进入全屏
         */
        fullScreen: function () {
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen;
            if (typeof rfs != "undefined" && rfs) {
                rfs.call(el);
            } else if (typeof window.ActiveXObject != "undefined") {
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript != null) {
                    wscript.SendKeys("{F11}");
                }
            } else if (el.msRequestFullscreen) {
                el.msRequestFullscreen();
            } else if (el.oRequestFullscreen) {
                el.oRequestFullscreen();
            } else if (el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
            } else if (el.mozRequestFullScreen) {
                el.mozRequestFullScreen();
            } else {
                miniAdmin.error('浏览器不支持全屏调用！');
            }
        }, /**
         * 退出全屏
         */
        exitFullScreen: function () {
            var el = document;
            var cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.exitFullScreen;
            if (typeof cfs != "undefined" && cfs) {
                cfs.call(el);
            } else if (typeof window.ActiveXObject != "undefined") {
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript != null) {
                    wscript.SendKeys("{F11}");
                }
            } else if (el.msExitFullscreen) {
                el.msExitFullscreen();
            } else if (el.oRequestFullscreen) {
                el.oCancelFullScreen();
            } else if (el.mozCancelFullScreen) {
                el.mozCancelFullScreen();
            } else if (el.webkitCancelFullScreen) {
                el.webkitCancelFullScreen();
            } else {
                miniAdmin.error('浏览器不支持全屏调用！');
            }
        }, /**
         * 初始化设备端
         */
        renderDevice: function () {
            if (miniAdmin.checkMobile()) {
                $('.layuimini-tool i').attr('data-side-fold', 1)
                    .attr('class', 'fa fa-outdent');
                $('.layui-layout-body').removeClass('layuimini-mini')
                    .addClass('layuimini-all');
            }
        }, /**
         * 成功
         * @param title
         * @returns {*}
         */
        success: function (title) {
            return layer.msg(title, {icon: 1, shade: this.shade, scrollbar: false, time: 2000, shadeClose: true});
        }, /**
         * 失败
         * @param title
         * @returns {*}
         */
        error: function (title) {
            return layer.msg(title, {icon: 2, shade: this.shade, scrollbar: false, time: 3000, shadeClose: true});
        }, /**
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
        }, /**
         * 监听
         * @param options
         */
        listen: function (options) {
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
                    window.openTips = layer.tips(tips, $(this), {
                        tips: [2, '#2f4056'],
                        time: 10000,
                        skin: "popup-tips",
                        success: function (el) {
                            var left = $(el).position().left - 10;
                            $(el).css({left: left});
                            element.render();
                            $(".popup-tips").on("mouseleave", function () {
                                if (miniAdmin.checkMobile()) {
                                    return false;
                                }
                                var isShow = $('.layuimini-tool i').attr('data-side-fold');
                                if (isShow === "0") {
                                    try {
                                        layer.close(window.openTips);
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
    exports("miniAdmin", miniAdmin);
});
