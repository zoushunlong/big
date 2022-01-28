window.onload = function() {
    var layer = layui.layer
    var form = layui.form
        //定义加载的方法
    get()
        // 初始化富文本编辑器
    initEditor()
    init()

    function get() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                // 调用模板引擎，渲染分类的下拉菜单
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                    // 一定要记得调用 form.render() 方法重新渲染
                form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
        // 为选择额封面做点击事件
    $('#cover').on('click', function() {
        // 模拟一个隐藏文件选择框的点击事件
        $('#coverFile').click()
    })
    $('#coverFile').on('change', function(e) {
            // 获取到文件的列表数组
            var files = e.target.files
                // 判断用户是否选择了文件
            if (files.length === 0) {
                return
            }
            // 根据文件，创建对应的 URL 地址
            var newImgURL = URL.createObjectURL(files[0])
                // 为裁剪区域重新设置图片
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        //定义文章发布状态
    let zhuang = '已发布';
    // 为草稿按钮做点击事件
    $('#cun').on('click', function() {
            zhuang = '草稿';
        })
        // 为表单做提交事件
    $('#tijiao').on('submit', function(e) {
            e.preventDefault()
                // 基于表单快速创建formdata对象 将jq数据变为DOM对象 再new一个fordata对象数据
            let fd = new FormData($(this)[0])
                // 将文章发布状态存到fd表单对象中
            fd.append('state', zhuang)
                // 将裁剪的图片输出为一个文件
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    // 将文件对象存储到fd中
                    fd.append('cover_img', blob)
                        // 发起ajax
                    public(fd)

                })
        })
        //定义一个发布文章ajax的方法
    function public(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                    // 发布文章成功后，跳转到文章列表页面
                location.href = '../文章内容/修改文章.html'
            }
        })
    }
    init()
        // 初始化用户的信息
    function init() {
        $.ajax({
            method: 'GET',
            // 编辑按钮做不了
            url: '/my/article/add',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取用户信息失败！')
                } else {
                    //调用form.val()快速给表单赋值
                    console.log(res.data);
                    form.val('formin', res.data)
                }

            }
        })
    };
}