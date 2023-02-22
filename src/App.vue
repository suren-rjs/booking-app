<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Booking App</router-link>
      <div class="navbar-nav mr-auto" v-if="driver">
        <li class="nav-item">
          <p @click="allBookings" class="nav-link">All Bookings</p>
        </li>
        <li class="nav-item">
          <p to="/dashboard" @click="dashBoard" class="nav-link">Dashbooard</p>
        </li>
      </div>
      <button v-if="isAuth" type="submit" @click="logout">Logout</button>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      driver: localStorage.getItem("userType") == "Driver",
      isAuth: localStorage.getItem("auth") == "true",
    }
  },
  methods: {
    logout() {
      localStorage.setItem("auth", false);
      localStorage.removeItem("userType");
      localStorage.removeItem("userId");
      window.location = window.location.origin + "/dashboard";
    },
    allBookings() {
      localStorage.removeItem("dashBoard");
      localStorage.setItem("allBookings", true);
      window.location = window.location.origin + "/bookings";
    },
    dashBoard() {
      localStorage.removeItem("allBookings");
      localStorage.setItem("dashBoard", true);
      window.location = window.location.origin + "/dashboard";
    }
  },
  name: "app"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  cursor: pointer;
  align-items: baseline !important;
}
</style>