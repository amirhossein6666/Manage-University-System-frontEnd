<template>
  <div>
    <myHeader></myHeader>
    <div
      class="MainContainer"
      v-for="professor in professors"
      :key="professor.id"
    >
      <div class="container">
        <p class="professorName">
          {{ "professorName : " + professor.username }}
        </p>
        <div v-for="faculty in faculties" :key="faculty.id">
          <div v-if="faculty.id == professor.faculty">
            <p class="professorFaculty">
              {{ "professorFaculty  : " + faculty.name }}
            </p>
          </div>
        </div>
        <div class="studentHeaders">
          <p class="studentHeadersParagraph">Students username && ID</p>
        </div>
        <div v-for="student in students" :key="student.id">
          <div
            v-for="professorStudent in professor.students"
            :key="professorStudent.id"
          >
            <div
              v-if="student.id == professorStudent"
              class="studentsContainer"
            >
              <div class="studentName">
                <p
                  @click="nevigateToStudentDetail(student.id)"
                  class="studentUsername"
                >
                  {{ student.username }}
                </p>
              </div>
              <div class="studentID">
                <p>{{ student.id }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="courseHeader">
          <p class="studentHeadersParagraph">Courses</p>
        </div>
        <div v-for="course in courses" :key="course.id">
          <div v-if="course.professor == professor.id" class="courseContainer">
            <p class="courseName" @click="nevigateToCourseDetail(course.id)">
              {{ course.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="craeteProfessor">
      <h2 class="createHeader">create Professor</h2>
    </div>
    <div class="inputContainer">
      <div class="secondContainer">
        <input
          class="professorInput"
          type="text"
          placeholder="professorUsername"
          v-model="professor.username"
        />
        <input
          class="professorInput"
          type="text"
          placeholder="professor password"
          v-model="professor.password"
        />
        <input
          type="text"
          placeholder="professor Faculty"
          class="professorInput"
          v-model="professor.faculty"
        />
        <button @click="professorCreate" class="createButton">
          create professor
        </button>
      </div>
    </div>
    <div class="popup" v-if="show">
      <div class="popup-content">
        <span class="closebtn" @click="closeAlert">&times;</span>
        {{ this.statusText }}
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
      professors: [],
      faculties: [],
      students: [],
      professor: {
        username: "",
        password: "",
        faculty: "",
      },
      show: false,
      statusText: "",
      courses: [],
    };
  },
  created() {
    this.getProfessors();
    this.getFaculties();
    this.getStudents();
    this.getCourses();
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
    async professorCreate() {
      var response = await fetch("http://127.0.0.1:8000/professor/create/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        body: JSON.stringify(this.professor),
      });
      this.show = true;
      this.statusText = response.statusText;
      this.getProfessors();
    },
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
    closeAlert() {
      this.show = false;
    },
    nevigateToStudentDetail(studentID: number) {
      this.$router.push({
        path: `/student/${studentID}`,
        params: { studentID },
      });
    },
    nevigateToCourseDetail(courseID: number) {
      this.$router.push({
        path: `/course/${courseID}`,
        params: { courseID },
      });
    },
  },
});
</script>

<style scoped>
.MainContainer {
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
.professorName {
  font-size: x-large;
}
.studentHeaders {
  width: 100%;
  border: 1px solid #dddddd;
  background-color: rgba(151, 133, 110, 0.404);
  justify-content: center;
  text-align: center;
}
.courseHeader {
  width: 100%;
  border: 1px solid #dddddd;
  background-color: rgba(226, 215, 201, 0.404);
  justify-content: center;
  text-align: center;
}
.studentHeadersParagraph {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: larger;
}
.studentsContainer {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
}
.studentName {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 50%;
  border: 1px solid #dddddd;
}
.studentID {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 50%;
  border: 1px solid #dddddd;
}
.craeteProfessor {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
}
.inputContainer {
  display: flex;
  justify-content: center;
  text-align: center;
}
.professorInput {
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
.professorInput:focus {
  border-color: #007bff;
  outline: none;
}
.professorInput:disabled {
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
}
.studentUsername {
  cursor: pointer;
}
.studentUsername:hover {
  color: #007bff;
}
.courseContainer {
  width: 100%;
  height: 50px;
  border: 1px solid #dddddd;
}
.courseName {
  cursor: pointer;
}
.courseName:hover {
  color: blue;
}
</style>
