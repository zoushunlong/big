// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // 统一为有权限的接口设置headers的时候 有my的接口
    if (options.url.indexOf('/my/' != -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 权局统一调用complete
    options.complete = function(res) {
        console.log('ok');
        console.log(res);
        //在complete回调函数中可以使用responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            //强制清空token 强制跳转登录页
            console.log(0);
            localStorage.removeItem('token');
            location.href = '登录.html';
        }

    }

})