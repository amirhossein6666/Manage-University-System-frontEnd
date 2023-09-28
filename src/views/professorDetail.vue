<template>
  <div>
    <myHeader></myHeader>
    <div
      class="mainContainer"
      v-for="professor in professors"
      :key="professor.id"
    >
      <div class="container" v-if="professor.id == professorID">
        <p class="professorName">
          {{ "professor Name :   " + professor.username }}
        </p>
        <div v-for="faculty in faculties" :key="faculty.id">
          <div v-if="faculty.id == professor.faculty">
            <p class="professorFaculty">
              {{ "professor faculty :   " + faculty.name }}
            </p>
          </div>
        </div>
        <div class="haaderContainer">
          <h2>student Username && ID</h2>
        </div>
        <div v-for="student in students" :key="student.id">
          <div
            v-for="professorStudent in professor.students"
            :key="professorStudent"
          >
            <div v-if="professorStudent == student.id" class="rowContainer">
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
import myHeader from "../components/myHeader.vue";
export default defineComponent({
  data() {
    return {
      professorID: Number,
      professors: [],
      faculties: [],
      students: [],
    };
  },
  created() {
    this.professorID = this.$route.params.professorID;
    this.getProfessors();
    this.getFaculties();
    this.getStudents();
  },
  components: {
    myHeader,
  },
  methods: {
    async getProfessors() {
      var response = await fetch("http://127.0.0.1:8000/professor/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      this.professors = await response.json();
    },
    async getFaculties() {
      var response = await fetch("http://127.0.0.1:8000/faculty/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      this.faculties = await response.json();
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
.container {
  width: 500px;
  height: fit-content;
  background-color: white;
  margin-top: 100px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 3%;
}
.professorName {
  font-size: x-large;
}
.mainContainer {
  display: flex;
  justify-content: center;
  text-align: center;
}
.professorFaculty {
  font-size: larger;
}
.row{
  cursor: pointer;
}
.row:hover{
  color: blue;
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
}
.secondP {
  width: 50%;
  border: 1px solid #dddddd;
}
.back-to-home {
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
  margin-top: 40px;
}
</style>
