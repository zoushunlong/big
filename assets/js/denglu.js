window.onload = function() {
    let deng = document.getElementById('deng');
    console.log(deng);
    let zhu = document.getElementById('zhu');
    let yi = document.
    querySelector('.zhubox');
    let er = document.querySelector('.dengbox')
    console.log(yi);
    deng.onclick = () => {
        yi.className = 'kai';
        er.className = 'guan'
    }
    zhu.onclick = () => {
        yi.className = ' guan';
        er.className = ' kai'
    };
    // 从layui上获取form对象
    let form = layui.form;
    let layer = layui.layer;
    //通过form.verify()函数自定义效验规则 记得加花括号表示一个伪数组
    form.verify({
            // 自建一个pass的效验规则
            pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repass: function(value) {
                //效验两次密码是否一致 通过形参拿到的是确认密码的值 和密码框的值进行比较 做判断 
                if (document.getElementById('mi').value !== value) {
                    return '两次密码不一致'
                }


            }
        }

    );
    //监听表单注册事件
    let biao1 = document.getElementById('dian');
    biao1.onclick = (e) => {
            //阻止默认行为
            e.preventDefault();
            let fu = document.getElementById('form1');
            // console.log(fu[name = 'usename']);
            let nei = fu[id = 'hu'].value;
            // console.log(nei);
            let rong = fu[id = 'mi'].value;
            // console.log(rong);
            // let fd = new FormData(fu)
            // fd.append('username', nei);
            // fd.append('password', rong);
            // console.log(fd);
            let fd = `username=${nei}&password=${rong}`;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://www.liulongbin.top:3007/api/reguser');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.send(fd);
            xhr.onreadystatechange = function() {
                var data = JSON.parse(xhr.responseText);
                console.log(xhr.responseText, data);
                if (xhr.readyState === 4 && xhr.status === 0) {
                    console.log(1);
                    return layer.msg(data.message);
                } else {
                    console.log(2);
                    return layer.msg(data.message)
                }
            };
            //自动跳到登录页面
            document.getElementById('deng').click()

        }
        //监听表单提交事件
    let lu = document.getElementById('lu');
    lu.onclick = function(e) {
        e.preventDefault();
        let fu = document.getElementById('form2');
        let nei = fu[id = 'hu'].value;
        let rong = fu[id = 'mi'].value;
        itheima({
            method: 'post',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: {
                username: nei,
                password: rong
            },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('登录失败')
                } else {
                    layer.msg('登录成功');
                    console.log(res.token);
                    //将登录成功的token字符串保存到本地
                    localStorage.setItem('token', res.token)
                        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTY0NSwidXNlcm5hbWUiOiLpn6blvrciLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY0Mjk5MDEwMCwiZXhwIjoxNjQzMDI2MTAwfQ.Xlt0mjkEGpX7Ddv8qRawQbVUHcdbzr_7pkg4l7FvF9U
                        //跳转后台主页
                    location.href = 'index.html';
                }
            }
        })
    }
}