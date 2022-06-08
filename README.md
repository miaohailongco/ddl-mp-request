# ddl-mp-request
## 说明
```bash
该网络请求配置仅针对uniapp开发小程序和原生小程序而编写
并不完全能应用于其他场景
```

## 安装
```bash
npm install ddl-mp-request
```

## 导入

```js
// 按需导入 $http 对象
import { $http } from 'ddl-mp-request'

// 将按需导入的 $http 挂载到 wx 顶级对象之上，方便全局调用
wx.$http = $http

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
```

## 使用

### 支持的请求方法

```js
// 发起 GET 请求，data 是可选的参数对象
$http.get(url, data?)

// 发起 POST 请求，data 是可选的参数对象
$http.post(url, data?)

// 发起 PUT 请求，data 是可选的参数对象
$http.put(url, data?)

// 发起 DELETE 请求，data 是可选的参数对象
$http.delete(url, data?)

// 发起 上传图片 请求，options 是必传的参数对象(单图上传)
/**
 * url 请求的地址
 * options为一个对象
 * options.filePath 要上传文件资源的路径
 * options.name 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
 * options.data HTTP 请求中其他额外的 form data
 */
$http.upload(url, options?)
```

### 配置请求根路径

```js
$http.baseUrl = 'https://www.example.com'
```

### 请求拦截器

```js
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  // do somethimg...
}
```

例 1，展示 loading 效果：

```js
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  wx.showLoading({
    title: '数据加载中...',
  })
}
```

例 2，自定义 header 请求头：

```js
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  if (options.url.indexOf('/home/catitems') !== -1) {
    options.header = {
      'X-Test': 'AAA',
    }
  }
}
```

### 响应拦截器

```js
// 请求完成之后做一些事情
$http.afterRequest = function () {
  // do something...
}
```

例如，隐藏 loading 效果：

```js
// 请求完成之后做一些事情
$http.afterRequest = function () {
  wx.hideLoading()
}
```

**enjoy!**
