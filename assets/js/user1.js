window.onload = function() {
    // 导入form方法设置规则
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称必须在1到6个字符之间'
            }

        }
    });
    init()
        // 初始化用户的信息
    function init() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取用户信息失败！')
                } else {
                    //调用form.val()快速给表单赋值
                    form.val('formin', res.data)
                }

            }
        })
    };
    // 重置表单数据
    let chong = document.getElementById('chong');
    chong.onclick = function(e) {
            // 阻止表单默认重置
            e.preventDefault();
            // 重新调用初始事件 数据会恢复之前的数据
            init()
        }
        //监听表单的提交事件

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',

            // 快速拿到表单里的数据
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                console.log(res.data);
                if (res.status != 0) {
                    return layer.msg('更新用户信息失败')
                } else {
                    layer.msg('更新用户信息成功');
                    // //设置调用父页面中的函数方式
                    // window.parent.get();
                }
            }
        })
    })
}