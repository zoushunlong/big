window.onload = function() {
    let layer = layui.layer;
    //获取文章的列表
    let form = layui.form;
    wen();

    function wen() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var index = null;
    $('#tian').on('click', function() {
            index = layer.open({
                // 指定弹出层的样式
                type: 1,
                // 设置宽高
                area: ['500px', "250px"],
                title: '添加文章分类',
                // 设置模板拿到里面的内容
                content: $('#tan').html()
            })
            console.log(index);
        })
        //通过事件代理来为子元素表单绑定submit事件

    $('body').on('submit', '#form-get', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status != 0) {
                        return layui.layer.msg('新增分类失败')
                    } else {
                        wen()
                        layer.msg('新增分类成功');
                        //这是根据索引关闭弹出层
                        layer.close(index)
                    }
                }
            })
        })
        //通过代理来为按钮绑定点击事件
    var index1 = null;
    $('tbody').on('click', '.bian', function() {
        index1 = layer.open({
            // 指定弹出层的样式
            type: 1,
            // 设置宽高
            area: ['500px', "250px"],
            title: '修改文章分类',
            // 设置模板拿到里面的内容
            content: $('#xiu').html()
        })
        let id = $(this).attr('data-id');
        // console.log(id);
        //发起请求获取数据
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function(res) {
                console.log(res);
                form.val('form-xiu', res.data)
            }

        })
    })
    $('body').on('submit', '#form-xiu', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    console.log(res);
                    return layer.msg('更新数据失败')
                } else {
                    layer.msg('更新数据成功')
                    layer.close(index1)
                    wen()
                }
            }
        })
    })
    $('body').on('click', '.shan', function() {
        let id = $(this).attr('data-id');
        // 提示用户是否删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' },
            function(index) {

                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg('删除分类失败！')
                        }
                        layer.msg('删除分类成功！')
                        layer.close(index)
                        wen()
                    }
                })
                layer.close(index);
            })
    })
}