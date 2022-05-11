<template>
  <div class="divCen">
    <h3>{{ msg }}</h3>
    <h4>Student Scores Edit</h4>
    <p class="p-right">
      <router-link to="/" active-class="active">Back to home</router-link>
    </p>
    <table>
      <tr>
        <th>Id</th>
        <td>
          <input type="text" :value="id" readonly />
        </td>
      </tr>
      <tr>
        <th>Name</th>
        <input type="text" v-model="name" />
      </tr>
      <tr>
        <th>Gender</th>
        <input type="text" v-model="gender" />
      </tr>
      <tr>
        <th>Chinese</th>
        <input type="text" v-model="chinese" />
      </tr>
      <tr>
        <th>Math</th>
        <input type="text" v-model="math" />
      </tr>
      <tr>
        <th>English</th>
        <input type="text" v-model="english" />
      </tr>
    </table>
    <p>
      <button @click="btn_edit_stuinfo">Edit to Save</button>
    </p>
  </div>
</template>

<script> 
export default {
  name: "StudentEdit",
  data() {
    return {
      msg: "Welcome to Student Management App",
      id: "",
      name: "",
      gender: "",
      chinese: "",
      math: "",
      english: "",
    };
  },
  created: function () {
    //从后端获取id为this.$route.params.id的学生信息。
    this.id = String(this.$route.params.id);
    this.$axios.get('http://localhost:3030/editdata',{
        params: {
          id:this.id
        }
    }).then((response) => {
        console.log("从后端接口获取数据：")
        console.log(response.data);
        let stuinfo=JSON.stringify(response.data[0]);
        sessionStorage.setItem(this.id,stuinfo)
        console.log(stuinfo,":stuinfo")
    }) 
    let stuinfo = JSON.parse(sessionStorage.getItem(this.id));
      this.name = stuinfo.name;
      this.gender = stuinfo.gender;
      this.chinese = stuinfo.chinese;
      this.math = stuinfo.math;
      this.english = stuinfo.english;
    // let stuinfo = JSON.parse(localStorage.getItem("stu" + this.id));

  },
  methods: {
    btn_edit_stuinfo: function () {
      let oStu = {
        id: this.id,
        name: this.name,
        gender: this.gender,
        chinese: Number(this.chinese),
        math: Number(this.math),
        english: Number(this.english),
      };

      // 判断输入的学生成绩信息是否符合要求
      if(String(oStu.id).length==0||String(oStu.name).length==0||String(oStu.gender).length==0||
      String(oStu.chinese).length==0||String(oStu.math).length==0||String(oStu.english).length==0)
      {
          alert("输入框不能为空，请重新输入");
      }
      else{
            if(oStu.id.length==5&&(oStu.chinese>=0&&oStu.chinese<=100)
            &&(oStu.math>=0&&oStu.math<=100)&&(oStu.english>=0&&oStu.english<=100))
            {
                //把修改后的数据发送给后端
              this.$axios({
                  method:"post",
                  url:"http://localhost:3030/edit",
                  data:oStu,
                }).then((res)=>{
                    console.log("成功向后端发送post请求:");
                    console.log(res.data);
                })
                  .catch(function (error) {
                  // 处理错误情况
                  console.log(error);
                  //  this.msg1="error";
                })
                this.$router.push({ path: "/info" });
            }
            if(oStu.id.length!=5){
              alert("学号应该为5位数字,请重新输入");
            }
            if(oStu.chinese<0||oStu.chinese>100){
              alert("语文成绩输入有误,请检查");
            }
            if(oStu.math<0||oStu.math>100){
              alert("数学成绩输入有误,请检查");
            }
            if(oStu.english<0||oStu.english>100){
              alert("英语成绩输入有误,请检查");
            }
      }
      // var key = "stu" + oStu.id;
      // var stu = JSON.stringify(oStu);
      // localStorage.setItem(key, stu);
      // this.$router.push({ path: "/info" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3,
h4 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  width: 128px;
}
p {
  font-style: normal;
}
p.p-right {
  font-style: italic;
  text-align: right;
}
div.divCen {
  margin: 2px auto;
  width: auto;
}
table {
  width: 60%;
  margin: auto;
  border-collapse: collapse;
  border: 0;
  text-align: center;
}
th {
  background-color: #93daff;
  color: #000000;
}
th,
td {
  font-size: 0.95em;
  text-align: center;
  padding: 4px;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #c1e9fe;
  border-width: 1px 0 1px 0;
}
tr {
  border: 1px solid #c1e9fe;
}
tr:nth-child(odd) {
  background-color: #dbf2fe;
}
tr:nth-child(even) {
  background-color: #fdfdfd;
}
</style>
