<template>
  <div>
    <myHeader></myHeader>
    <h1 class="header">Dashbord</h1>
    <div class="mainContainer">
      <div v-if="!isLogin" class="container">
        <p class="youNeedToLogin">first of all you need to login</p>
        <router-link to="/login">
          <button class="loginButton">login</button>
        </router-link>
      </div>
    </div>
    <div class="logout">
      <button @click="logout" v-if="isLogin" class="logout-button">
        Logout
      </button>
    </div>
    <div class="adminPanel" v-if="isAdmin">
      <h2 class="adminHeader">Admin Panel</h2>
      <div class="panelContainer">
        <div class="adminPanels">
          <p class="paragraph">1 : the list of courses</p>
          <p class="paragraph">2 : create new course</p>
          <p class="paragraph">3 : list of students of any course</p>
          <p class="paragraph">4 : Detail page of any students</p>
          <router-link to="/courses" class="routerlink">
            <button class="panelsButton">courses</button>
          </router-link>
        </div>
        <div class="adminPanels">
          <p class="paragraph">1 : the list of faculties</p>
          <p class="paragraph">2 : create new faculty</p>
          <p class="paragraph">3 : list of courses of any faculty</p>
          <p class="paragraph">4 : Detail page of any Courses</p>
          <router-link to="/faculty" class="routerlink">
            <button class="panelsButton">faculty</button>
          </router-link>
        </div>
        <div class="adminPanels">
          <p class="paragraph">1 : the list of students</p>
          <p class="paragraph">2 : create new student</p>
          <p class="paragraph">3 : list of course of any student</p>
          <p class="paragraph">4 : Detail page of any Courses</p>

          <router-link to="/students">
            <button class="panelsButton">students</button>
          </router-link>
        </div>
        <div class="adminPanels">
          <p class="paragraph">1 : the list of professors</p>
          <p class="paragraph">2 : create new professor</p>
          <p class="paragraph">
            3 : list of course and students of any professor
          </p>
          <p class="paragraph">
            4 : Detail page of any Courses and students
          </p>
          <router-link to="professors">
            <button class="professorsButton">professors</button>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="isProfessor" class="professorPanel">
      <h1 class="professorPanelHeader">Professor Panel</h1>
      <div class="panelContainer">
        <div class="professorPanels">
          <p class="paragraph">1 : list of your courses</p>
          <p class="paragraph">2 : list of your studenst</p>
          <router-link to="/professor/courses">
            <button class="panelsButton">prrofessorCourses</button>
          </router-link>
        </div>
        <div class="professorPanels">
          <p class="paragraph">1 : list of your students</p>
          <p class="paragraph">2 : the studenst id</p>
          <router-link to="/professor/stuList">
            <button class="panelsButton">professorStuList</button>
          </router-link>
        </div>
        <div class="professorPanels">
          <p class="paragraph">1 : set grade for your student</p>
          <p class="paragraph">1 : see the list of courses and students</p>
          <router-link to="/professor/setGrades">
            <button class="panelsButton">professorSetGrades</button>
          </router-link>
        </div>
        <div class="professorPanels">
          <p class="paragraph">1  :  see the list of student's protests</p>
          <router-link to="/professor/protests">
            <button class="panelsButton" style="margin-top: 100px;">protests</button>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="isStudent" class="studentPanel">
      <h1 class="studentPanelHeader">studentPanel</h1>
      <div class="panelContainer">
        <div class="studentPanels">
          <p class="paragraph">1 : the list of your courses</p>
          <p class="paragraph">2 : the list of your professors</p>
          <p class="paragraph">3 : the list of your grades</p>
          <p class="paragraph">4 : protest to your grades</p>
          <router-link to="/student/courses">
            <button class="panelsButton">courses</button>
          </router-link>
        </div>
        <div class="studentPanels">
          <p class="paragraph">1 : enroll in courses</p>
          <p class="paragraph">2 : see all of available courses</p>
          <p class="paragraph">3 : see the professor of any courses</p>
          <p class="paragraph">4 : see the faculty of any courses</p>
          <router-link to="/student/enroll">
            <button class="panelsButton">enroll</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import myHeader from "./myHeader.vue";
export default defineComponent({
  data() {
    return {
      isLogin: true,
      isAdmin: false,
      isProfessor: false,
      isStudent: false,
    };
  },
  components: {
    myHeader,
  },
  created() {
    this.isLoggedIn();
    this.isAdminUser();
    this.isProfessorUser();
    this.isStudentUser();
  },
  methods: {
    logout() {
      localStorage.clear();
      this.isLoggedIn();
      this.isAdmin = false;
      this.isProfessor = false;
      this.isStudent = false;
    },
    isLoggedIn() {
      if (localStorage.getItem("token") == null) {
        this.isLogin = false;
      }
    },
    async isAdminUser() {
      var response = await fetch("http://127.0.0.1:8000/token/admin/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      let tokens = await response.json();

      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].key == localStorage.getItem("token")) {
          this.isAdmin = true;
        }
      }
    },
    async isProfessorUser() {
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
          this.isProfessor = true;
        }
      }
    },
    async isStudentUser() {
      var response = await fetch("http://127.0.0.1:8000/token/student/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      let tokens = await response.json();

      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].key == localStorage.getItem("token")) {
          this.isStudent = true;
        }
      }
    },
  },
});
</script>

<style scoped>
.header {
  justify-content: center;
  margin-top: 50px;
  text-align: center;
  display: flex;
}
.mainContainer {
  display: flex;
  justify-content: center;
  text-align: center;
}
.youNeedToLogin {
  font-size: xx-large;
  color: blueviolet;
}
.loginButton {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  cursor: pointer;
}
.loginButton:hover {
  background-color: #2f279c;
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
.logout {
  direction: rtl;
  margin-right: 60px;
}
.logout-button {
  background-color: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #2980b9;
}

.logout-button:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}
.adminHeader {
  text-align: center;
  justify-content: center;
}
.panelContainer {
  justify-content: center;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(430px, 1fr));
}

.adminPanels {
  width: 400px;
  height: 400px;
  background-color: white;
  margin-top: 100px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-left: 60px;
  border-radius: 3%;
}
.paragraph {
  font-size: x-large;
  margin-top: 30px;
}
.panelsButton {
  background-color: #131d24;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  margin-top: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.panelsButton:hover {
  background-color: #293fb9;
}
.panelsButton:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}
.professorsButton {
  background-color: #131d24;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.professorsButton:hover {
  background-color: #293fb9;
}
.professorsButton:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}
.professorPanels {
  width: 400px;
  height: 250px;
  background-color: white;
  margin-top: 100px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-left: 20px;
  border-radius: 3%;
}
.professorPanelHeader {
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
  transition: background-color 0.3s ease;
}

.back-to-home:hover {
  background-color: #0056b3;
}
.test {
  display: flex;
  justify-content: center;
}
.studentPanelHeader {
  justify-content: center;
  text-align: center;
}
.studentPanels {
  width: 400px;
  height: 400px;
  background-color: white;
  margin-top: 100px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-left: 60px;
  border-radius: 3%;
}
</style>
