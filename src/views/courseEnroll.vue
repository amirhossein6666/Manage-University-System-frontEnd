<template>
  <div class="background">
    <myHeader></myHeader>
    <div class="inputContainer">
      <p class="inputHeader">what is your faculty of your desired course</p>
      <input
        class="facultyInput"
        type="text"
        placeholder="course faculty"
        v-model="courseFaculty"
      />
      <button @click="submit" class="facultyButton">search the courses</button>
    </div>
    <div v-if="showCourses">
      <div
        v-for="mycourse in myCourses"
        :key="mycourse.id"
        class="mainContainer"
      >
        <div v-for="course in courses" :key="course.id">
          <div v-if="course.id == mycourse">
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
            </div>
          </div>
        </div>
      </div>
      <div class="enroll">
        <h2 class="enrollHeader">Enroll In Courses</h2>
        <div class="secondContainer">
          <input
            type="text"
            placeholder="courseName"
            v-model="enroll.course"
            class="enrollInput"
          />
          <button @click="enrollment" class="enrollButton">Enroll</button>
        </div>
      </div>
    </div>
    <div class="popup" v-if="show">
      <div class="popup-content">
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
import myHeader from "../components/myHeader.vue";
export default defineComponent({
  data() {
    return {
      myCourses: [],
      showCourses: false,
      courseFaculty: "",
      professors: [],
      faculties: [],
      courses: [],
      enroll: {
        course: "",
      },
      show: false,
      statusText: "",
    };
  },
  components: {
    myHeader,
  },
  created() {
    this.getProfessors();
    this.getFaculties();
    this.getCourses();
  },
  methods: {
    async submit() {
      var response = await fetch("http://127.0.0.1:8000/faculty/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      var faculties = await response.json();
      for (let i = 0; i < faculties.length; i++) {
        if (faculties[i].name == this.courseFaculty) {
          this.showCourses = true;
          this.myCourses = faculties[i].courses;
        }
      }
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
    async enrollment() {
      var response = await fetch("http://127.0.0.1:8000/student/enroll/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        body: JSON.stringify(this.enroll),
      });
      this.statusText = response.statusText;
      this.show = true;
    },
    closeAlert() {
      this.show = false;
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
.popup {
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
.inputContainer {
  justify-content: center;
  text-align: center;
}
.inputHeader {
  font-size: x-large;
}
.facultyInput {
  width: 40%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease-in-out;
  margin-right: 10px;
}
.facultyInput:focus {
  border-color: #443ad4;
}

.enrollHeader {
  margin-top: 50px;
  text-align: center;
}
.facultyButton {
  background-color: #3498db;
  color: #fff;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.facultyButton:hover {
  background-color: #2980b9;
}

.facultyButton:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.7);
}

.facultyButton:active {
  background-color: #1f6da6;
}
.enrollInput {
  width: 40%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease-in-out;
  margin-right: 10px;
  margin-right: 30px;
}
.enrollInput:focus {
  border-color: #443ad4;
}
.enrollButton {
  background-color: #3498db;
  color: #fff;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.enrollButton:hover {
  background-color: #2980b9;
}
.enrollButton:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.7);
}
.enroll {
  display: block;
}
.secondContainer {
  display: flex;
  justify-content: center;
  text-align: center;
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
</style>
