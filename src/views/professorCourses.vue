<template>
  <div>
    <myHeader></myHeader>
      <div class="mainContainer" v-for="course in courses" :key="course.id">
        <div class="container" v-if="course.professor == professorId">
          <p class="courseName">{{ course.name }}</p>
          <div v-for="faculty in faculties" :key="faculty.id">
            <div v-if="faculty.id == course.courseFaculty">
              <p class="courseFaculty">{{ "faculty :  " + faculty.name }}</p>
            </div>
          </div>
          <div class="studentHeaders">
            <p class="headerParagraph">Student Username && ID</p>
          </div>
          <div v-for="student in students" :key="student.id">
            <div
              v-for="courseStudent in course.students"
              :key="courseStudent.id"
            >
              <div class="studentContainer" v-if="courseStudent == student.id">
                <div class="studentUsername">
                  <p class="studentParagraph">{{ student.username }}</p>
                </div>
                <div class="studentID">
                  <p class="studentParagraph">{{ student.id }}</p>
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
      professorId: Number,
      courses: [],
      faculties: [],
      students: [],
    };
  },
  created() {
    this.getCourses();
    this.whoami();
    this.getFaculties();
    this.getStudents();
  },
  components: {
    myHeader,
  },
  methods: {
    async getCourses() {
      var response = await fetch("http://127.0.0.1:8000/course/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      this.courses = await response.json();
    },
    async whoami() {
      var response = await fetch("http://127.0.0.1:8000/token/professor/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      let tokens = await response.json();
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].key == localStorage.getItem("token")) {
          this.professorId = tokens[i].user;
        }
      }
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
  },
});
</script>

<style scoped>
.mainContainer {
  display: inline-flex;
  justify-content: center;
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
.studentHeaders {
  width: 100%;
  height: 60px;
  border: 1px solid #dddd;
  background-color: rgb(202, 196, 194);
  justify-content: center;
  text-align: center;
  display: flex;
}
.headerParagraph {
  font-size: larger;
  justify-content: center;
  display: flex;
}
.courseFaculty {
  font-size: larger;
}
.courseName {
  font-size: x-large;
}
.studentContainer {
  width: 100%;
  height: 50px;
  display: flex;
}
.studentUsername {
  border: 1px solid #dddd;
  width: 50%;
}
.studentID {
  border: 1px solid #dddd;
  width: 50%;
}
.studentParagraph {
  font-size: large;
}
.back-to-home {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 70px;
  transition: background-color 0.3s ease;
}
.back-to-home:hover {
  background-color: #0056b3;
}
.buttonContainer {
  justify-content: center;
  text-align: center;
  display: flex;
}
</style>
