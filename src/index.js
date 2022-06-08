class Request {
	constructor(options = {}) {
		// 请求的根路径
		this.baseUrl = options.baseUrl || ''
		// 请求的 url 地址
		this.url = options.url || ''
		// 请求方式
		this.method = 'GET'
		// 请求的参数对象
		this.data = null
		// header 请求头
		this.header = options.header || {}
		this.beforeRequest = null
		this.afterRequest = null
	}

	get(url, data = {}) {
		this.method = 'GET'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	post(url, data = {}) {
		this.method = 'POST'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	put(url, data = {}) {
		this.method = 'PUT'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	delete(url, data = {}) {
		this.method = 'DELETE'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}
	
	// 单图上传
	/**
	 * url 请求的地址
	 * options为一个对象
	 * options.filePath 要上传文件资源的路径
	 * options.name 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
	 * options.data HTTP 请求中其他额外的 form data
	 */
	upload(url, options) {
		this.method = 'POST'
		this.url = this.baseUrl + url
		// 清空 header 对象
		this.header = {}
		// 请求之前做一些事
		this.beforeRequest && typeof this.beforeRequest === 'function' && this.beforeRequest(this)
		// 发起上传请求
		return new Promise((resolve, reject) => {
			let weixin = wx
			// 适配uniapp
			if ('undefined' !== typeof uni) {
				weixin = uni
			}
			weixin.uploadFile({
				url: this.url,
				header: this.header,
				filePath: options.filePath,
				name: options.name || 'img',
				formData: options.data || {},
				success: (res) => {
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				},
				complete: (res) => {
					// 请求完成以后做一些事情
					this.afterRequest && typeof this.afterRequest === 'function' && this.afterRequest(res)
				}
			});
		})
	}

	_() {
		// 清空 header 对象
		this.header = {}
		// 请求之前做一些事
		this.beforeRequest && typeof this.beforeRequest === 'function' && this.beforeRequest(this)
		// 发起请求
		return new Promise((resolve, reject) => {
			let weixin = wx
			// 适配 uniapp
			if ('undefined' !== typeof uni) {
				weixin = uni
			}
			weixin.request({
				url: this.url,
				method: this.method,
				data: this.data,
				header: this.header,
				success: (res) => {
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				},
				complete: (res) => {
					// 请求完成以后做一些事情
					this.afterRequest && typeof this.afterRequest === 'function' && this.afterRequest(res)
				}
			})
		})
	}
}

export const $http = new Request()
