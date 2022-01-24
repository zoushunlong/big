window.onload = function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比  表示是个正方形  可以设置其他裁剪形状 比如14/9
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    let layer = layui.layer;
    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#shang').on('click', function() {
        $('#file').click();
    });
    // 为文件选择绑定change事件
    $('#file').on('change', function(e) {
        //这是获取用户选择的文件
        let files = e.target.files;
        console.log(files);
        if (files.length === 0) {
            return layer.msg('请选择照片')
        }
        //拿到用户的文件
        let file1 = e.target.files[0];
        // 将文件转换为路径
        var imgURL = URL.createObjectURL(file1)
            //重新初始化
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $('#que').on('click', function() {
        //拿到用户裁剪之后的头像
        //调用接口 再上传
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png'); //这里转换为base64格式的字符串
        //调用接口
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                    // window.parent.get();
            }
        })

    })
}