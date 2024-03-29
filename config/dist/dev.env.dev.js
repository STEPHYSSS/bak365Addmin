'use strict';

var merge = require('webpack-merge');

var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_URL: '"//192.168.0.106:8001/"',
    // BASE_URL:'"http://dingtalk.bak365.cn/WeixinNew/"',
    Prefix: '"../"'
});