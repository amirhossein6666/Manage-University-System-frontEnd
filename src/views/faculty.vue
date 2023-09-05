<template>
  <div class="background">
    <div v-for="faculty in faculties" :key="faculty.id" class="mainContainer">
      <div class="container">
        <p class="facultyName">{{ "faculty name : " + faculty.name }}</p>
        <div class="tabel">
          <div class="headerContainer">
            <h2>courseName</h2>
          </div>
          <div v-for="course in courses" :key="course.id">
            <div
              v-for="courseFaculty in faculty.courses"
              :key="courseFaculty.id"
            >
              <div v-if="courseFaculty == course.id">
                <div class="nameContainer">
                  <p class="courseName">{{ course.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="createContainer">
      <div class="createFaculty">
        <input
          class="input"
          type="text"
          placeholder="faculty Name"
          v-model="faculty.name"
        />
        <button class="button" @click="createFaculty">create</button>
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
export default defineComponent({
  data() {
    return {
      faculty: {
        name: "",
      },
      courses: [],
      faculties: [],
    };
  },
  async created() {
    this.getFaculties();
    var response = await fetch("http://127.0.0.1:8000/course/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
    this.courses = await response.json();
  },
  methods: {
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
    async createFaculty() {
      var response = await fetch("http://127.0.0.1:8000/faculty/create/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        body: JSON.stringify(this.faculty),
      });
      console.log(response.statusText);
      this.getFaculties();
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
.facultyName {
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
.headerContainer {
  text-align: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  background-color: #cccccc4b;
}
.nameContainer {
  text-align: center;
  border: 1px solid #ccc;
}
.courseName {
  font-size: large;
}
form {
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
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
.createFaculty {
  justify-content: center;
  text-align: center;
  width: 35%;
}
.createContainer {
  margin-top: 70px;
  display: flex;
  justify-content: center;
  text-align: center;
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
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.button:hover {
  background-color: #0056b3;
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
