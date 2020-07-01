const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
// 取得默认连接
const db = mongoose.connection;

// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

/**
 *
 * 定义一个模式
 */

var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  name: String,
  age: Number
});

var UserSchema = new Schema({
  name: String,
  password: String
});
var ArticleSchema = new Schema({
  title: String,
  content: String,
  createTime: Number
});

// 使用模式“编译”模型
const User = mongoose.model('User', UserSchema);
const SomeModel = mongoose.model('SomeModel', SomeModelSchema);
const Articles = mongoose.model('Articles', ArticleSchema);
// User.create({ name: '刘冰群', password: '111111' }, function (err, data) {
//   if (err) {
//     return handleError(err);
//   } // 已保存
// });
module.exports = { User, SomeModel, Articles };
// module.exports = mongoose.model('SomeModel', SomeModelSchema);

/**
 * 使用模型
 */

// 创建一个 SomeModel 模型的实例
// SomeModel.create({ name: '也是牛人', age: 1000 }, function (
//   err,
//   awesome_instance
// ) {
//   if (err) {
//     return handleError(err);
//   } // 已保存
// });

// SomeModel.findById('5ee1e3057d9307e8c298a5ec', function (err, data) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });
// SomeModel.findByIdAndDelete('5ee1e185c4f5f6e8a45fd4a3', function (err, data) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });
