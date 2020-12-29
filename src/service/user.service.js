const connections = require('../app/database')
class UserService{
  async create(user) {
    // 用户信息写入数据库
    const { name, password } = user;
    // sql语句
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    const result = await connections.execute(statement, [name, password]);
    return result[0];
  }
  async getUserByName(name){
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const result = await connections.execute(statement, [name]);
    return result[0];
  }
}
module.exports = new UserService()