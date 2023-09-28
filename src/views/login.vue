<template>
  <div class="background">
    <myHeader></myHeader>
    <div class="mainContainer">
      <div class="loginContainer">
        <div class="inputContainer">
          <input
            class="input"
            type="text"
            v-model="user.username"
            placeholder="username"
          />
          <input
            class="input"
            type="text"
            v-model="user.password"
            placeholder="password"
          />
        </div>
        <select name="role" v-model="selectedRole" class="selectRole">
          <option disabled selected value="select Your Role">
            Select your role
          </option>
          <option value="student">student</option>
          <option value="professor">professor</option>
          <option value="admin">admin</option>
        </select>
        <button @click="login" class="login-button">login</button>
      </div>
      <div class="popup" v-if="show">
        <div class="popup-content">
          <span class="closebtn" @click="closeAlert">&times;</span>
          {{ statusText }}
        </div>
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
      statusText: "",
      show: false,
      selectedRole: "select Your Role",
      token: "",
      user: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    myHeader,
  },
  methods: {
    async login() {
      if (this.selectedRole == "student") {
        var response = await fetch("http://127.0.0.1:8000/student/login/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.user),
        });
        this.token = await response.json();
        console.log(this.token)
        localStorage.setItem("token", this.token.token);
        this.statusText = response.statusText;
        this.show = true;
      } else if (this.selectedRole == "admin") {
        var response = await fetch("http://127.0.0.1:8000/myadmin/login/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.user),
        });
        this.token = await response.json();
        localStorage.setItem("token", this.token.token);
        this.statusText = response.statusText;
        this.show = true;
      } else if (this.selectedRole == "professor") {
        var response = await fetch("http://127.0.0.1:8000/professor/login/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.user),
        });
        this.token = await response.json();
        localStorage.setItem("token", this.token.token);
        this.statusText = response.statusText;
        this.show = true;
      }
    },
    closeAlert() {
      this.show = false;
    },
  },
});
</script>

<style scoped>
.background {
  justify-content: center;
  text-align: center;
}
.loginContainer {
  /* display: flex; */
  justify-content: center;
  text-align: center;
}
.mainContainer {
  justify-content: center;
  text-align: center;
  display: flex;
}
.inputContainer {
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
}
.input {
  width: 98%;
  height: 50px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.login-button {
  background-color: #010102;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}
.selectRole {
  margin-right: 20px;
  appearance: none;
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
}
.selectRole:focus {
  outline: none;
  border-color: #007bff;
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
.BackToHomeContainer {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
