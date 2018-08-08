# AuthLogin
express登录控制案例

主要利用`mongoose`、`express-session`、`body-parser`模块。

首先利用`express-generator`生成一个express项目。把默认生成的`index.ejs`页面作为访问控制页面，新增登录页面`login.ejs`、注册页面`register.ejs`，相应的路由控制文件和用户模型`models/user.js`。

所有的控制围绕`req.session`展开，访问`index.ejs`页面在`req.session.user`不存在时，重定向到登录页面；登录时，获取post请求的相关参数，在数据库查询相应的数据，并做出对应的响应；注册同理，查询数据库是否存在所注册的账号，并作出相应的响应；登出及清空所有session。