<template>
  <div>
    <myHeader></myHeader>
    <div class="mainContainer" v-for="student in students" :key="student.id">
      <div class="rowContainer" v-if="protests[student.id] != undefined">
        <div
          class="studentUsernameContainer"
          @click="showDetails[student.id] = !showDetails[student.id]"
        >
          <p>{{ "message from :   " + student.username }}</p>
        </div>
        <div class="test">
          <div
            class="protestBodyContainer"
            v-if="showDetails[student.id] == true"
          >
            <p class="protestMessage">
              {{ "protest body  :  " + protests[student.id] }}
            </p>
            <button class="markAsRead" @click="markAsRead(student.id)">
              Mark as read
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="buttonContainer">
      <router-link to="/">
        <button class="back-to-home">Back To Home</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import homeVue from "../components/home.vue";
import myHeader from "../components/myHeader.vue";
export default defineComponent({
  data() {
    return {
      protests: [],
      students: [],
      showDetails: {},
    };
  },
  components: {
    myHeader,
  },
  created() {
    this.getProtests();
    this.getStudents();
  },
  methods: {
    async getProtests() {
      var response = await fetch("http://127.0.0.1:8000/professor/protests/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      let data = await response.json();
      this.protests = data;
      var keys = Object.keys(data);
      for (let key in keys) {
        this.showDetails[keys[key]] = false;
      }
    },
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
    async markAsRead(studentID) {
      var response = await fetch(
        `http://127.0.0.1:8000/professor/deleteProtest/${studentID}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + localStorage.getItem("token"),
          },
        }
      );
      this.getProtests();
    },
  },
});
</script>

<style scoped>
.studentUsernameContainer {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: large;
  border: 1px solid #ccc;
  align-items: center;
  width: 250px;
  height: 70px;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgb(141, 230, 230, 0.3);
}
.studentUsernameContainer:hover {
  background-color: rgb(141, 230, 230, 0.8);
}
.rowContainer {
  width: 80%;
  margin-top: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  height: 404px;
}
.mainContainer {
  display: flex;
  justify-content: center;
  text-align: center;
}
.protestBodyContainer {
  width: 70%;
  border: 1px solid #ccc;
  height: 200px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
}
.test {
  direction: rtl;
  width: 100%;
}
.markAsRead {
  cursor: pointer;
  height: 50px;
  width: 100px;
  border-radius: 10px;
  background-color: black;
  margin-top: 20px;
  color: white;
}
.markAsRead:hover {
  background-color: blue;
}
.protestMessage {
  font-size: x-large;
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
.buttonContainer {
  justify-content: center;
  text-align: center;
  display: flex;
  margin-top: 50px;
}
</style>
