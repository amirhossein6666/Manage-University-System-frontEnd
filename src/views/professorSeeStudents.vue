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
              <p class="row">{{ student.username }}</p>
            </div>
            <div class="secondP">
              <p class="row">{{ student.id }}</p>
            </div>
          </div>
        </div>
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
import myheader from "../components/myHeader.vue";
export default defineComponent({
  data() {
    return {
      students: [],
    };
  },
  created() {
    this.getStudents();
  },
  components: {
    myheader,
  },
  methods: {
    async getStudents() {
      var response = await fetch("http://127.0.0.1:8000/professor/students/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      this.students = await response.json();
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

.firstP {
  border: 1px solid #dddddd;
  width: 50%;
  /* margin-left: 30%; */
}
.secondP {
  width: 50%;
  /* margin-left: 30%; */
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
.BackToHomeContainer{
  margin-top: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
}

</style>
