const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

const router = new Router()

const files = fs.readdirSync(__dirname)
files
    // eslint-disable-next-line no-useless-escape
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => {
        const fileName = file.substr(0, file.length - 3);
        // eslint-disable-next-line import/no-dynamic-require
        const fileEntity = require(path.join(__dirname, file));
        if (fileName !== 'index') {
            fileEntity(router, fileName);
        }
    })

module.exports = router
