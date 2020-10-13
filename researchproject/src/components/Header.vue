<template>
  <div id="header">
    <h1>Research Project Test Webpage</h1>

    <div   id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
      <div id="button">
        <a href="http://localhost:8080/home/#/login">Login/Sign up</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#button a {
  background: #00cc80;
  width: calc(100% - 1em);
  display: block;
  color: #fff;
  border-radius: 20px;
  padding: 0.5em;
  text-decoration: none;
  font-size: 1.5em;
  position: relative;
  margin: 3% auto 7%;
  z-index: 4;
}
h1 {
  font-weight: bold;
}


@media only screen and (min-width: 650px) {
  #header {
    display: flex;
    justify-content: space-between;
  }
  #nav {
      display: flex;
    justify-content: space-between;
  }
  #button a {
    background: #00cc80;
    width: 120px;
    display: block;
    color: #fff;
    border-radius: 20px;
    padding: 0.5em;
    text-decoration: none;
    font-size: 1.0em;
    position: relative;
    margin:-5% 5%;
    z-index: 4;
  }
}
</style>
