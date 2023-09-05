<template>
  <div class="background">
    <div v-for="course in courses" :key="course.id" class="mainContainer">
      <div class="container" v-if="course.professor == professorId">
        <p class="courseName">{{ "course name : " + course.name }}</p>
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
    <div class="centeredHeader">
      <h2>Set Student Grades</h2>
    </div>
    <div class="centerd_input-wrapper">
      <div class="input-wrapper">
        <input
          type="text"
          v-model="studentGrade.student"
          placeholder="studentName"
          class="custom-input"
        />
        <input
          type="text"
          v-model="studentGrade.grade"
          placeholder="studentGrade"
          class="custom-input"
        />
        <button @click="submit" class="submitButton">Submit</button>
      </div>
    </div>
    <div class="popup" v-if="show">
      <div class="popup-content">
        <span class="closebtn" @click="closeAlert">&times;</span>
        {{ statusText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      show: false,
      studentGrade: {
        student: "",
        grade: "",
        statusText: "",
      },
      professorId: "",
      courses: [],
      students: [],
      faculties: [],
    };
  },
  created() {
    this.whoami();
    this.getCourses();
    this.getFaculties();
    this.getStudents();
  },
  methods: {
    async getCourses() {
      var response = await fetch("http://127.0.0.1:8000/course/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      this.courses = await response.json();
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
    async submit() {
      var response = await fetch("http://127.0.0.1:8000/professor/setgrade/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        body: JSON.stringify(this.studentGrade),
      });
      this.statusText = response.statusText
      this.show  = true
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
.input-wrapper {
}

.custom-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}

.custom-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
.submitButton {
  background-color: #007bff;
  margin-top: 20px;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
}
.submitButton:hover {
  background-color: #0056b3;
}
.centerd_input-wrapper {
  display: flex;
  justify-content: center;
  text-align: center;
}
.centeredHeader {
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
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  justify-content: center;
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
</style>
