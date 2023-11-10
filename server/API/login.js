let db = require('../db/index')

exports.login = (req, res) => {
  var sql = 'select * from user where Username = ? and Password = ?'
	
  db.query(sql, [req.query.name, req.query.password], (err, data) => {
      if(err) {
          return res.send({
            status: 400,
            message: "登录失败"
          })
      }
      if(data.length > 0) {
        res.send({
          status: 200,
          message: "登录成功"
        })
      }else{
        res.send({
          status: 202,
          message: '用户名或密码错误'
        })
      }
  })
}

exports.register = (req, res) => {
  const sql1 = 'select * from user where Username = ?'
  //const sql2 = 'insert into user (Username, Password) value (?, ?)'
  const sql2 = 'insert into user (Username, Password, Nickname) values (?, ?, ?)'
  db.query(sql1, [req.body.name], (err, data) => {
    if(err) {
      return res.send({
        status: 400,
        message: "操作失败"
      })
    }
    if(data.length > 0) {
      return res.send({
        status: 202,
        message: '用户名已存在'
      })
    }else{
      // return res.send({
      //   status: 200,
      //   message: '注册成功'
      // })
      //
      db.query(sql2, [req.body.name, req.body.password, req.body.nickname], (err, data) => {
        if(err) {
            return res.send({
              status: 400,
              message: "注册失败"
            })
        }
        //jsonWrite(res, data)
        console.log(req.body)
        res.send({
          
          status: 200,
          message: "注册成功"
        })
      })
    }
  })
}
