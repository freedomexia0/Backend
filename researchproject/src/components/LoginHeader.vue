<template>
  <div class="login">
    <h1> {{account_name}} </h1>
      <div class="Login_nav">
    <router-link to="/login">Login</router-link>|
      <router-link to="/signup">Sign up</router-link>
      </div>

  </div>
</template>

<script>
export default {
  name: 'LoginHeader',
  props: {
  account_name: String,
  password: String
  }

}

</script>

<style lang="css" scoped>
.Login_nav a {
  font-weight: bold;
  color: #2c3e50;
}

.Login_nav a.router-link-exact-active {
  color: #42b983;
}
</style>