<template>
  <div class="background">
    <myheader></myheader>
    <div class="mainContainer">
      <div class="container">
        <div class="haaderContainer">
          <h2>student Username && ID</h2>
        </div>
        <div v-for="student in students" :key="student.id">
          <div class="rowContainer">
            <div class="firstP">
              <p class="row" @click="nevigateToStudentDetail(student.id)">{{ student.username }}</p>
            </div>
            <div class="secondP">
              <p class="row">{{ student.id }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="headerContainer">
      <h2>create Student</h2>
    </div>
    <div class="firsrContainer">
      <div class="createStudent">
        <input
          type="text"
          placeholder="studentUsername"
          class="inputUsername"
          v-model="this.student.username"
        />
        <input
          type="text"
          placeholder="studentPassword"
          class="inputPassword"
          v-model="this.student.password"
        />
        <button @click="createStudent" class="createButton">Create</button>
      </div>
    </div>
    <div class="popup" v-if="show">
      <div class="popup-content">
        <span class="closebtn" @click="closeAlert">&times;</span>
        {{ this.statusText }}
      </div>
    </div>
    <div class="BackToHomeContainer">
      <router-link to="/">
        <button class="back-to-home">Back To Home</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import myHeaderVue from "../components/myHeader.vue";
export default defineComponent({
  data() {
    return {
      students: [],
      student: {
        username: "",
        password: "",
      },
      show: false,
      statusText: "",
    };
  },
  created() {
    this.getStudents();
  },
  components: {
    myHeaderVue,
  },
  methods: {
    async getStudents() {
      var response = await fetch("http://127.0.0.1:8000/student/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      this.students = await response.json();
    },
    async createStudent() {
      var response = await fetch("http://127.0.0.1:8000/student/create/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        body: JSON.stringify(this.student),
      });
      this.statusText = response.statusText;
      this.show = true;
      this.getStudents();
    },
    closeAlert() {
      this.show = false;
    },
    nevigateToStudentDetail(studentID: number) {
      this.$router.push({
        path: `/student/${studentID}`,
        params: { studentID },
      });
    },
  },
});
</script>

<style scoped>
.mainContainer {
  justify-content: center;
  display: flex;
  text-align: center;
}
.container {
  width: 500px;
  height: fit-content;
  background-color: white;
  margin-top: 100px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-left: 60px;
  border-radius: 3%;
}
.haaderContainer {
  width: 100%;
  height: 60px;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  text-align: center;
}
.rowContainer {
  display: flex;
}
.row{
  cursor: pointer;
}
.row:hover{
  color: blue;
}
.firstP {
  border: 1px solid #dddddd;
  width: 50%;
}
.secondP {
  width: 50%;
  border: 1px solid #dddddd;
}
.back-to-home {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.back-to-home:hover {
  background-color: #0056b3;
}
.BackToHomeContainer {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  z-index: 9999;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  position: relative;
}

.closebtn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.inputUsername {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f5f5f5;
  color: #333;
  transition: border-color 0.2s ease-in-out;
}
.ininputUsernameput:focus {
  border-color: #007bff;
  outline: none;
}
.inputUsername:disabled {
  background-color: #eee;
  cursor: not-allowed;
}
.inputPassword {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f5f5f5;
  color: #333;
  transition: border-color 0.2s ease-in-out;
}
.inputPassword:focus {
  border-color: #007bff;
  outline: none;
}
.inputPassword:disabled {
  background-color: #eee;
  cursor: not-allowed;
}
.createButton {
  background-color: #3a3d63;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 30px;
}
.createButton:hover {
  background-color: #e011be;
}
.createStudent {
  width: 50%;
  justify-content: center;
  text-align: center;
}
.firsrContainer {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
}
.headerContainer {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
