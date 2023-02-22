<template>
  <div class="auth-page">
    <div class="auth-form">

      <h2>{{ isLogin ? "Login" : "Signup" }}</h2>
      <div class="user-type">
        <button :class="{ 'active': isPassengerActive }" @click="toggleUserType(true)">
          User
        </button>
        <button :class="{ 'active': isDriverActive }" @click="toggleUserType(false)">
          Driver
        </button>
      </div>
      <br />
      <div v-if="isLogin">
        <form class="login-form" @submit.prevent="login">
          <div class="form-group">
            <label for="username">email</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit" class="btn btn-primary auth">Login</button>
        </form>
        <div class="switch-form">
          Don't have an account? <a href="#" @click.prevent="toggleForm">Signup</a>
        </div>
      </div>
      <div v-else>
        <form class="signup-form" @submit.prevent="signup">
          <div class="form-group">
            <label for="new-username">email</label>
            <input type="text" id="new-username" v-model="newUsername" required>
          </div>
          <div class="form-group">
            <label for="new-password">Password</label>
            <input type="password" id="new-password" v-model="newPassword" required>
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" v-model="confirmPassword" required>
          </div>
          <button type="submit" class="btn btn-primary auth">Signup</button>
        </form>
        <div class="switch-form">
          Already have an account? <a href="#" @click.prevent="toggleForm">Login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiController from "../controller/apiController";

export default {
  beforeMount() {
    if (localStorage.getItem("auth") == "true") {
      this.$router.push("Dashboard");
    }
  },
  data() {
    return {
      isLogin: true,
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      confirmPassword: '',
      isPassengerActive: true,
      isDriverActive: false
    }
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
    async login() {
      this.newUsername = "";
      this.newPassword = "";
      this.confirmPassword = "";
      let user = { mail: this.username, password: this.password, userType: this.isDriverActive ? "Driver" : "Passenger" };
      await ApiController.loginUser(user).then((isSuccess) => {
        if (isSuccess) {
          this.username = "";
          this.password = "";
          localStorage.setItem("dashBoard", true);
          window.location = window.location.origin + "/dashboard";
        } else {
          window.alert("Invalid Credentials");
          console.log("Invalid Credentials");
        }
      });
    },
    async signup() {
      this.username = "";
      this.password = "";
      let user = { mail: this.newUsername, password: this.newPassword, userType: this.isDriverActive ? "Driver" : "Passenger" };
      await ApiController.signUpUser(user).then((isSuccess) => {
        if (isSuccess) {
          this.isLogin = !this.isLogin;
          this.newUsername = "";
          this.newPassword = "";
          this.confirmPassword = "";
        } else {
          window.alert("Email already exixts");
          console.log("Email already exixts");
        }
      });
    },
    toggleUserType(isPassenger) {
      this.isPassengerActive = isPassenger;
      this.isDriverActive = !isPassenger;
    },
  }
}
</script>

<style>
.auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background-color: #f5f5f5;
}

.auth-form {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}



form {
  align-items: center;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
}

button.btn.btn-primary.auth {
  border-radius: 17px;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  font-weight: bold;
  color: white;
  background-color: rgb(9, 18, 30);
  transition: background-color 0.3s ease;
}

.user-type button {
  border-radius: 12px;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  font-weight: bold;
  color: white;
  background-color: #999;
  transition: background-color 0.3s ease;
}

.user-type button.active {
  background-color: rgb(116, 178, 255);
}

.auth-form {
  width: 450px;
  padding: 40px;
}


.switch-form {
  padding: 25px;
}
</style>
