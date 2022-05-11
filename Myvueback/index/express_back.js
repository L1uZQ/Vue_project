var express = require("express");
var mysql = require("mysql");
var app = express();
app.use("/public", express.static("public"));

//配置body-parser中间件
const BodyParser = require('body-parser')
app.use(BodyParser.urlencoded({extended: false}))
app.use(BodyParser.json())

//解决跨域问题
const cors = require("cors");
app.use(cors());

//填写自己MySQL数据库的账号和密码、表名
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "***",
    database: "vuestu",
});

var editid='';
connection.connect();
//  主页输出 "Hello World"


app.get("/api", function(req, res) {
    console.log("主页 GET 请求,前端请求数据库数据：");

    connection.query("SELECT * FROM stuScore", function(error, results, fields) {
        if (error) throw error;
        console.log("The result is: ", results);
        let len=results.length
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));  
    });

});

//  POST 请求
app.post("/post", function(req, res) {
    var post_obj = req.body
    console.log("主页 POST 请求,收到前端表单提交的数据：");
    console.log(post_obj)
    res.end(JSON.stringify(post_obj));
});

// insert接口新建学生信息
app.post("/insert", function(req, res) {
    var insert_obj = req.body
    console.log("主页 POST 请求,收到前端表单提交的数据：");
    console.log(insert_obj)

    //计算成绩平均分和总分
    insert_obj.total=req.body.chinese+req.body.math+req.body.english
    insert_obj.avg=(req.body.chinese+req.body.math+req.body.english)/3
   
    //将数据插入数据库
    connection.query('INSERT INTO stuScore SET ?', insert_obj, (err,result) =>{
        if(err) {
            console.log(err)
        }else {
            console.log(result);
            res.send('添加成功')
        }
    })
});

//把要修改的数据展示到前端，便于修改，不过需要刷新页面.
app.get("/editdata",function(req, res){
    editid=req.query.id
    console.log("id:",editid)
    connection.query(`SELECT * FROM stuScore where id=${editid}`, function(error, results, fields) {
        if (error) throw error;
        else{
            console.log("The result is: ", results);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));  
        }
    });
})

//根据前端的数据修改信息
app.post("/edit", function(req, res) {
    console.log("req.body:",req.body)
    let editid = req.body.id
    let edit_obj=req.body
    console.log("主页 POST 请求,收到前端要修改的学生的id:");
    console.log(editid)

    //更新平均分和总分，之后更新数据库
    edit_obj.total=req.body.chinese+req.body.math+req.body.english
    edit_obj.avg=(req.body.chinese+req.body.math+req.body.english)/3

    let sql = `UPDATE stuScore SET ? where id = ${editid}`;
    //?在这里说明是一个参数，通过下边的edit_obj代替
    connection.query(sql,edit_obj, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.send(`update ${editid} success......`)
        }
    })
});


//del接口接收前端返回的要删除的id。
app.post("/del", function(req, res) {
    // var del_id = req.body.id
    connection.query(`DELETE  FROM stuScore where id = ${req.body.id}`,
        function(error, results, fields){
        if (error) console.log(error);
        else{
            console.log("学号为 ",req.body.id,"的学生信息删除成功。")
            console.log("The result is: ", results);
        }
    });
    console.log("主页 POST 请求,收到前端信息，删除的学生学号为：");
    console.log(req.body.id)
});

var server = app.listen(3030, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
