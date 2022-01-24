window.onload = function() {
    get();
    let btn = document.getElementById("bth");
    btn.onclick = function() {
        // 提示客户是否退出

        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //  清空本地存储的token 重新跳转到登录页
            localStorage.removeItem('token');
            location.href = '登录.html';
            // 关闭这个弹出框
            layer.close(index);
        });
    }

    function get() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // 请求头

            success: function(res) {
                if (res.status != 0) {
                    return layui.layer.msg('获取用户失败')
                } else {
                    //调用渲染头像的函数
                    // console.log(res.data);
                    reader(res.data);
                    // 在ajax以后都会执行complate函数

                }
            }

        })
    }

    function reader(user) {
        //获取用户的名称
        let name = user.nickname || user.username;
        // console.log(name);
        let huan = document.getElementById('huan')
        huan.innerHTML = '欢迎&nbsp;&nbsp;' + name;
        let tu = document.getElementsByClassName('layui-nav-img');
        // console.log(tu[0].src);
        let wen = document.getElementsByClassName('tou');
        // console.log(wen);
        // 按需渲染用户头像
        if (user.user_pic != null) {
            //图片头像
            for (let i = 0; i < tu.length; i++) {
                tu[i].src = user.user_pic;
                tu[i].className = 'layui-nav-img kai'
            }
            for (let i = 0; i < wen.length; i++) {
                wen[i].className = 'tou guan';
            }

        } else {
            //文本头像
            let tu = document.getElementsByClassName('layui-nav-img');
            let wen = document.getElementsByClassName('tou');
            // console.log(tu[0]);
            for (let i = 0; i < tu.length; i++) {
                tu[i].className = 'layui-nav-img guan';
            }
            let first = name[0].toUpperCase();
            // console.log(first);
            for (let i = 0; i < wen.length; i++) {
                wen[i].innerHTML = first;
                wen[i].className = 'tou kai';
            }


        }
    }
}