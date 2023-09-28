<template>
  <div class="background">
    <myheader></myheader>
    <div v-for="course in courses" :key="course.id" class="MainContainer">
      <div class="container">
        <h2 class="courseName">{{ course.name }}</h2>
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
        <div class="grade">
          <p class="gradeParagraph">
            {{ "your grade of this course is  " + grades[course.name] }}
          </p>
        </div>
        <button @click="showPopup" class="show-popup-button">protest</button>
        <div class="popup" v-if="isPopupVisible">
          <div class="popup-content">
            <input
              type="text"
              placeholder="protest message"
              v-model="this.protest.body"
              class="protestInput"
            />
            <div class="submitContainer">
              <button @click="sendProtest(course.professor)" class="sendButton">
                Send
              </button>
            </div>
            <button @click="hidePopup" class="close-button">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="popup2" v-if="show">
      <div class="popup-content2">
        <span class="closebtn" @click="closeAlert">&times;</span>
        {{ statusText }}
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
      courses: [],
      professors: [],
      faculties: [],
      grades: {},
      isPopupVisible: false,
      protest: {
        body: "",
        professor: "",
      },
      show: false,
      statusText: "",
    };
  },
  created() {
    this.getCourses();
    this.getProfessors();
    this.getFaculties();
    this.getGrades();
  },
  components: {
    myheader,
  },
  methods: {
    async getCourses() {
      var response = await fetch("http://127.0.0.1:8000/student/courses/", {
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
    async getGrades() {
      var response = await fetch("http://127.0.0.1:8000/student/grades", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      this.grades = await response.json();
    },
    showPopup() {
      this.isPopupVisible = true;
    },
    hidePopup() {
      this.isPopupVisible = false;
    },
    async sendProtest(professorID: Number) {
      this.protest.professor = professorID;
      var response = await fetch("http://127.0.0.1:8000/student/sendProtest/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        body: JSON.stringify(this.protest),
      });
      this.show = true;
      this.statusText = response.statusText;
      this.hidePopup();
    },
    closeAlert() {
      this.show = false;
    },
  },
});
</script>

<style scoped>
.MainContainer {
  display: inline-flex;
  justify-content: center;
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
  color: rgb(53, 42, 42);
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
.BackToHomeContainer {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
}
.gradeParagraph {
  font-size: large;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 50px 110px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}
.show-popup-button {
  background-color: #040b13;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 43%;
  margin-top: 20px;
}

.show-popup-button:hover {
  background-color: #0056b3;
}
.popup2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-content2 {
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

.close-button {
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.close-button:hover {
  background-color: #bb2c3c;
}
.protestInput {
  width: 350px;
  height: 40px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f5f5f5;
  color: #333;
  transition: border-color 0.2s ease-in-out;
}
.protestInput:focus {
  border-color: #007bff;
  outline: none;
}
.protestInput:disabled {
  background-color: #eee;
  cursor: not-allowed;
}
.sendButton {
  width: 120px;
  height: 40px;
  background-color: #006cd8;
  cursor: pointer;
  border-radius: 6px;
}
.sendButton:hover{
  background-color: #0026ff;
}
.submitContainer{
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
