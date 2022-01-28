window.onload = function() {
    //定义一个查询的参考对象将来请求数据的时候需要将请求参数提交到服务器
    let layer = layui.layer;
    let form = layui.form;
    let laypage = layui.laypage;
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        // 设置不变的变量
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n < 10 ? n + '0' : n
    }
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示几条
        cate_id: '', //文章分类的ID
        state: '' //文章发布的状态
    }
    get()
        // 获取文章的数据
    function get() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table', res)
                console.log(res.data);
                $('tbody').html(htmlStr)
                    //当获取完数据后 调用渲染分页的方法
                fen(res.total)

            }
        })
    }
    initCate()


    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                    //  由于我们利用模板增加可选项没有被layui监听到 所以要通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }
    // 定义渲染分页的方法
    function fen(total) {
        //    调用 laypage.render方法
        laypage.render({
                elem: 'fenye', //分页器的ID
                count: total, //总条数
                limit: q.pagesize, //每页显示条数
                curr: q.pagenum, //默认选中的分页
                // 分页发生切换的时候，触发 jump 回调
                //触发jump函数的方式 点击页码的时候会触发
                // 只要调用了get方法 就会触发jump回调函数
                //用第一种方式调用first是undifind 第二种是true
                // layout自定义排版 默认顺序有上一页 分页区域 下一页
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                // 可以设置每页条数的选择项是个数组
                limits: [2, 3, 5],
                jump: function(obj, first) {
                    // 拿到最新的页码值
                    // console.log(obj.curr)
                    // console.log(obj.limit); //得到每页显示的条数
                    // 把最新的页码值，赋值到 q 这个查询参数对象 默认的选中分页中
                    q.pagenum = obj.curr;
                    // 把最新的条目数赋值到q这个查询参数中
                    q.pagesize = obj.limit;
                    // 根据最新的q对应的数据渲染表格直接调用get函数会造成死循环
                    // 当first的值不是true时就调用get函数
                    if (!first) {
                        get()
                    }
                }
            }

        )


    }
    //为筛选表单绑定sumbmit事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单中选中项的值 中括号是指name等于相对应值的td
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
            // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
            // 根据最新的筛选条件，重新渲染表格的数据
        get()
    });
    //通过代理的方式为删除动态生成的按钮点击处理函数 
    $('tbody').on('click', '#shan', function() {
        // 获取删除按钮的个数  这里要用类名 因为井号名是单独的 长度永远为一
        let ans = $('.shan').length;
        console.log(ans);
        // 获取到文章的 id
        var id = $(this).attr('data-id')
            // 询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function() {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    } else {
                        layer.msg('删除文章成功！')
                        if (ans == 1) {
                            //删除后页面就没有任何数据了
                            //页码值最小为1 当为1时就不做减1处理 
                            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                        }
                        get();
                        // 当数据删除后 要判断当前页面中是否还有剩余数据
                        // 如果没有数据 就让页码值减1  再调用get方法
                    }

                }
            });
            //关闭当前索引的弹出层
            layer.close(id)
        })
    })
    $('tbody').on('click', function() {
        location.href = '../文章内容/发布文章.html';
    })

}