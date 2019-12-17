module.exports = (router) => {
    router.get('/room', async function (ctx, next) {
        ctx.body = {
            code: 0,
            msg: '成功',
            data: [],
        };
    })
}