<template>
  <div>
    <h3>{{ msg }}</h3>
    <h4>Student Scores Table</h4>
        <td style="scoped">
          <router-link to="/insert" active-class="active">✚新建学生信息</router-link>
        </td>
    <table>
      <tr>
        <th>No</th>
        <th>Id</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Chinese</th>
        <th>Math</th>
        <th>English</th>
        <th>总分</th>
        <th>平均分</th>
        <th>Admin</th>
      </tr>
      <tr v-for="(s, index) in stu" :key="index">
        <td>{{ index+1 }}</td>
        <td>{{ s.id }}</td>
        <td>{{ s.name }}</td>
        <td>{{ s.gender }}</td>
        <td>{{ s.chinese }}</td>
        <td>{{ s.math }}</td>
        <td>{{ s.english }}</td>
        <td>{{ s.total}}</td>
        <td>{{ s.avg}}</td>
        <td>
          <!-- <router-link to="/insert" active-class="active">Insert</router-link> -->
          <router-link :to="'/edit/' + s.id" active-class="active">修改</router-link>
          <a href @click="del_stu_info(s.id)" active-class="active">删除</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: "StudentInfo",
  data() {
    return {
      msg: "Welcome to Student Management App",
      stu: Array(),
    };
  },
  computed: {

  },

  created() {
        console.log("stu1:",this.stuList)
        this.$axios.get('http://localhost:3030/api')
        .then((response) => {
            console.log("从后端接口获取数据：")
            console.log(response.data);
            // this.stu=response.data
            let len=response.data.length;
            let stuinfo
            for(let i=0;i<len;i++){
              // console.log("data:",response.data[i])
              stuinfo=response.data[i];
              this.stu.push(stuinfo)
            }
        })
        console.log("stu:",this.stu)
  },

  methods: {
    del_stu_info: function(stuid) {
        this.$axios({
            method:"post",
            url:"http://localhost:3030/del",
            data: {"id":stuid,},
        }).then((res)=>{
            console.log("成功向后端发送post请求:");
            console.log(res.data);
        })
          .catch(function (error) {
          // 处理错误情况
          console.log(error);
          //  this.msg1="error";
        })
    },    

    //排序函数的算法，可以加上排序
    // stu: function () {
    //根据某一个属性值property进行降序排列
    // function compare(property){
    //     return function(a,b){
    //         var value1 = a[property];
    //         var value2 = b[property];
    //         return value2 - value1;
    //     }
    // }
    //   //alert(stu[2].math);
    //   stu.sort(compare('total'));
    //   return stu;
    },
    //删除，先把id发给后端，后端操作数据库删掉记录。
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
table {
  width: 98%;
  margin: 16px 0;
  border-collapse: collapse;
  border: 0;
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
