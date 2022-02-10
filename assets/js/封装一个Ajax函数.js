function ajax(data) {
    var arr = []
    for (var k in data) {
        // k是数组里面的元素
        var str = k + '=' + data[k];
        arr.push(str)
    }
    // 拼接
    return arr.join('&')
}
var yi = ajax({ name: '张三', age: 20 })
    // 创建 xhr 对象，并监听 onreadystatechange 事件
function itheima(options) {
    var xhr = new XMLHttpRequest()
        // 拼接查询字符串 
        // 外界传递进来的对象转换为查询字符串
    var qs = ajax(options.data)
        // 判断请求的类型 用if else来进行判断 toUpperCase将接收来的字符串转换为大写
    if (options.method.toUpperCase() === 'GET') {
        // 发起 GET 请求 写get也可以 get请求把内容放在open的url地址后面发送到服务器
        xhr.open(options.method, options.url + '?' + qs)
        xhr.send()
    } else if (options.method.toUpperCase() === 'POST') {
        // 发起 POST 请求 把内容放在send里发送到服务器
        xhr.open(options.method, options.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(qs)
    }
    // 监听请求状态改变的事件
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr);
            var result = JSON.parse(xhr.responseText)
            options.success(result)
        }
    }
}