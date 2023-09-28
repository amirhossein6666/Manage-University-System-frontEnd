<template>
  <div>
    <myHeader></myHeader>
    <div class="background">
      <div v-for="course in courses" :key="course.id">
        <div v-if="course.id == courseID" class="container">
          <p class="courseName">{{ "course Name  :  " + course.name }}</p>
          <div v-for="professor in professors" :key="professor.id">
            <div v-if="professor.id == course.professor">
              <p
                class="courseProfessor"
                @click="NevigateToProfessorDetail(professor.id)"
              >
                {{ "course professor :  " + professor.username }}
              </p>
            </div>
          </div>
          <div v-for="faculty in listOfFaculty" :key="faculty.id">
            <div v-if="faculty.id == course.courseFaculty">
              <p class="courseFaculty">
                {{ "the course faculty :  " + faculty.name }}
              </p>
            </div>
          </div>
          <div class="haaderContainer">
            <h2>student Username && ID</h2>
          </div>
          <div v-for="student in students" :key="student.id">
            <div
              v-for="courseStudent in course.students"
              :key="courseStudent.id"
            >
              <div v-if="courseStudent == student.id">
                <div class="rowContainer">
                  <div class="firstP">
                    <p class="row" @click="nevigateToStudentDetail(student.id)">
                      {{ student.username }}
                    </p>
                  </div>
                  <div class="secondP">
                    <p class="row">{{ student.id }}</p>
                  </div>
                </div>
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
      courseID: Number,
      courses: [],
      listOfFaculty: [],
      professors: [],
      students: [],
    };
  },
  created() {
    this.courseID = this.$route.params.courseID;
    this.getCourses();
    this.getFaculties();
    this.getProfessors();
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
      this.listOfFaculty = await response.json();
    },
    nevigateToStudentDetail(studentID: number) {
      this.$router.push({
        path: `/student/${studentID}`,
        params: { studentID },
      });
    },
    NevigateToProfessorDetail(professorID: number) {
      this.$router.push({
        path: `/professor/${professorID}`,
        params: { professorID },
      });
    },
  },
});
</script>

<style scoped>
.background {
  display: flex;
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
  border-radius: 3%;
}
.courseName {
  text-align: center;
  font-size: x-large;
  color: rgb(19, 26, 22);
}
.courseProfessor {
  cursor: pointer;
  font-size: larger;
}
.courseProfessor:hover{
  color: blue;
}
.courseFaculty {
  font-size: larger;
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
.row {
  cursor: pointer;
}
.row:hover {
  color: blue;
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
