const baseURL = '';

/**
 * 封装 php fetch
 * @param {{url: String, method: String, params: Object, data: Object, headers: Object, timeout: int, format: String}} param0 
 * @returns {Promise}
 */
export function request({ url, method = 'GET', params = {}, data = {}, headers = {'Content-Type': 'application/x-www-form-urlencoded'}, timeout = 10000, format = 'URLSearchParams' }) {
    return new Promise((resolve, reject) => {
        // 超时时间
        const t = setTimeout(() => {
            clearTimeout(t); // 清除定时器
            reject(new Error('Fetch timeout')); // 拒绝 Promise
        }, timeout);

        // get 查询字符串
        const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
        url = queryString ? `${baseURL}${url}?${queryString}` : `${baseURL}${url}`;

        // 数据格式
        if (format == 'URLSearchParams') {
            // post 查询字符串
            var body = new URLSearchParams();
        }

        if (format == 'FormData') {
            // post 表单数据
            var body = new FormData();
        }

        Object.keys(data).map(key => {body.append(key, data[key])})
        

        // 执行 fetch
        if (method == 'GET') {
            fetch(url, {
                method,
                headers,
            })
                .then(response => {
                    clearTimeout(t);
                    // response.json() 返回Promise对象
                    resolve(response.json());
                })
                .catch(error => {
                    clearTimeout(t);
                    reject(error);
                })
        } else {
            fetch(url, {
                method,
                headers,
                body: body.toString()
            })
                .then(response => {
                    clearTimeout(t);
                    // response.json() 返回Promise对象
                    resolve(response.json());
                })
                .catch(error => {
                    clearTimeout(t);
                    reject(error);
                })
        }
        
    })
}
