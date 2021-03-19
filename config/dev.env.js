'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_URL: '"http://192.168.0.19:8001/"',
    // BASE_URL: '"//192.168.0.105:8001/"',
    // BASE_URL: '"http://dingtalk.bak365.cn/WeixinNew/"',
    Prefix: '"../"',
})