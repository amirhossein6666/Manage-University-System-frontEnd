<template>
  <div class="background">
    <myHeader></myHeader>
    <div v-for="student in students" :key="student.id" class="mainContainer">
      <div class="container" v-if="student.id == studentID">
        <p class="studentUsername">{{ "username :  " + student.username }}</p>
        <p class="studentId">{{ "id : " + student.id }}</p>
        <div class="coursesHeader">
          <div class="courses">
            <p>course</p>
          </div>
          <div class="grades">
            <p>grade</p>
          </div>
        </div>
        <div v-for="course in courses" :key="course.id">
          <div v-for="studentCourse in student.courses" :key="studentCourse.id">
            <div class="showGrades" v-if="course.id == studentCourse">
              <div class="courseName">
                <p @click="nevigateToCourseDetail(course.id)" class="row">
                  {{ course.name }}
                </p>
              </div>
              <div class="courseGrade">
                <p>{{ " " + student.grades[course.id] }}</p>
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
      studentID: Number,
      students: [],
      courses: [],
    };
  },
  created() {
    this.studentID = this.$route.params.studentID;
    this.getStudents();
    this.getCourses();
  },
  components: {
    myHeader,
  },
  methods: {
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
.container {
  width: 500px;
  height: fit-content;
  background-color: white;
  margin-top: 100px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 3%;
}
.mainContainer {
  display: flex;
  justify-content: center;
  text-align: center;
}
.studentUsername {
  font-size: x-large;
}
.studentId {
  font-size: large;
}
.coursesHeader {
  width: 100%;
  display: flex;
  background-color: rgba(133, 99, 83, 0.144);
}
.courses {
  width: 50%;
  border: 1px solid #ccc;
}
.grades {
  width: 50%;
  border: 1px solid #ccc;
}

.showGrades {
  display: flex;
  width: 100%;
  justify-content: center;
  text-align: center;
}
.courseName {
  width: 50%;
  display: flex;
  justify-content: center;
  text-align: center;
  border: 1px solid #dddddd;
}
.courseGrade {
  width: 50%;
  display: flex;
  justify-content: center;
  text-align: center;
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
.row{
  cursor: pointer;
}
.row:hover{
  color: blue;
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
