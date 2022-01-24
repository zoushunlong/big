window.onload = function() {
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value) {
            //效验两次密码是否一致 通过形参拿到的是确认密码的值 和密码框的值进行比较 做判断 
            if (document.getElementById('mi').value == value) {
                return '新旧密码不能一致'
            }


        },
        repead: function(value) {
            //效验两次密码是否一致 通过形参拿到的是确认密码的值 和密码框的值进行比较 做判断 
            if (document.getElementById('ma').value !== value) {
                return '两次密码不一致'
            }


        }
    });
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            // 快速拿到表单里的数据
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                console.log(res.data);
                if (res.status != 0) {
                    return layer.msg('更新用户信息失败');

                } else {
                    layer.msg('更新用户信息成功');
                    // 重置表单
                    $('.layui-form')[0].reset();
                }
            }
        })
    })
}