module.exports =  (router) => {
    router.get('/room', async function (ctx, next) {
        ctx.body = '123123';
    })
}