<template>
  <div class="background">
    <div v-for="course in courses" :key="course.id" class="mainContainer">
      <div class="container">
        <p class="courseName">{{ "course name : " + course.name }}</p>
        <div v-for="professor in professors" :key="professor.id">
          <div v-if="professor.id == course.professor">
            <p class="courseProfessor">
              {{ "course professor : " + professor.username }}
            </p>
          </div>
        </div>
        <div v-for="faculty in faculties" :key="faculty.id">
          <div v-if="faculty.id == course.courseFaculty">
            <p class="courseFaculty">
              {{ "course faculty : " + faculty.name }}
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Student Username && ID</th>
            </tr>
          </thead>
          <tbody>
            <div
              v-for="courseStudent in course.students"
              :key="courseStudent.id"
            >
              <div v-for="student in students" :key="student.id">
                <div v-if="student.id == courseStudent">
                  <tr>
                    <td>{{ student.username }}</td>
                    <td>{{ student.id }}</td>
                  </tr>
                </div>
              </div>
            </div>
          </tbody>
        </table>
      </div>
    </div>
    <div class="createCourse">
      <h2 class="createHeader">createCourse</h2>
    </div>
    <div class="inputContainer">
      <div class="secondContainer">
        <input class="input" type="text" placeholder="course Name" v-model="course.name">
        <input class="input" type="text" placeholder="course professor" v-model="course.professor">
        <button @click="createCourse" class="button">create Course</button>
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
export default defineComponent({
  data() {
    return {
      statusText: "",
      show: false,
      courses: [],
      professors: [],
      students: [],
      faculties: [],
      course: {
        name: "",
        professor: "",
      },
    };
  },
  async created() {
    this.getCourses();
    this.getProfessors();
    this.getStudents();
    this.getFaculties();
  },
  methods: {
    async createCourse() {
      var response = await fetch("http://127.0.0.1:8000/course/create/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        body: JSON.stringify(this.course),
      });
      this.statusText = response.statusText;
      this.show = true;
      this.getCourses();
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
    closeAlert() {
      this.show = false;
    },
  },
});
</script>

<style scoped>
.background {
  background-color: aliceblue;
}
.mainContainer {
  justify-content: center;
  display: inline-flex;
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
.courseName {
  text-align: center;
  font-size: xx-large;
  color: rgb(69, 34, 223);
}
.courseProfessor {
  text-align: center;
  font-size: x-large;
  color: rgb(2, 2, 3);
}
.courseFaculty {
  text-align: center;
  font-size: x-large;
  color: rgb(2, 2, 3);
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
  width: 100%;
}

th {
  background-color: #f2f2f2;
}
td {
  padding-left: 100px;
  align-items: left;
}
.inputContainer{
  justify-content: center;
  text-align: center;
  display: flex;
}
.submitButton {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
}
.submitButton:hover {
  background-color: #0056b3;
}
.createCourse {
  justify-content: center;
}
.createHeader {
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

/* Style the popup content */
.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  position: relative;
}

/* Style the close button */
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
.input {
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
.input:focus {
  border-color: #007bff;
  outline: none;
}
.input:disabled {
  background-color: #eee;
  cursor: not-allowed;
}
.button {
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
.button:hover {
  background-color: #e011be;
}
</style>
