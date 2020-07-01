function myBodyParser() {
  return function (req, res, next) {
    let contentType = req.headers['content-type'];
    console.log(contentType);
    if (
      contentType === 'application/x-www-form-urlencoded' ||
      contentType === 'application/json'
    ) {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        console.log('data', data);
        data = JSON.parse(data);
        req.body = data;
        next();
      });
      // 错误处理
      req.on('err', function (err) {
        next(err);
      });
    } else {
      next();
    }
  };
}
module.exports = myBodyParser;
