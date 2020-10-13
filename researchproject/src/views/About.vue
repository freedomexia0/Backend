<template>
<v-ons-page class="page">
  Toolbar here

  <div class="background"></div>

  <div class="content">
     <div class="home">
    <Header />
    
        <div class="container">
      
        <section>
            <img src="../assets/server.svg" alt="server graphic" class="server">

            <h1>Test this head 1</h1>
            <p class="subhead">description of this test</p>

            <img src="../assets/scroll.svg" alt="scroll down" class="scroll show-desktop hide-mobile">

        </section>

    </div>

    <div class="blue-container">
        <div class="container">
            <ul>
                <li>
                    <img src="../assets/icon-1.svg" alt="Calendar icon">
                    <p>this is the test part </p>
                </li>
                <li>
                    <img src="../assets/icon-2.svg" alt="Test2 icon">
                    <p>this is the test part </p>
                </li>
                <li>
                    <img src="../assets/icon-3.svg" alt="Test3 icon">
                    <p>this is the test part </p>
                </li>
            </ul>
        </div>
    </div>

    <div class="gray-container">
        <div class="container">
            <ul>

                <li>
                    <figure>
                        <img src="../assets/user1.png" alt="User test picture">
                        <blockquote> this is a test part of user test profile</blockquote>
                        <figcaption>- Jane Doe</figcaption>
                    </figure>
                </li>

                <li>
                    <figure>
                        <img src="../assets/user2.png" alt="User test picture">
                        <blockquote> this is a test part of user test profile</blockquote>
                        <figcaption>- Jane Doe</figcaption>
                    </figure>
                </li>


            </ul>
        </div>
    </div>

    <div class="container">
        <h2>Start your free trial now!</h2>
        <a href="#" class="cta">Get Started</a>
    </div>

    <footer>
        <div class="footer-container">
            <div class="container">
                <a href="#">
                   
                </a>
                  
                    <ul class="footer-links">
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Test part</a></li>
                    </ul>
               
            </div>
        </div>
        <div class="bottom">

        </div>
    </footer>
  </div>
  </div>

  Fixed content here
</v-ons-page>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'About',
  components: {
    Header
  }
}
</script>

<style lang="css">

p, blockquote{
    font-size: .9em;
    line-height: 1.6em;
}

ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.container{
    text-align: center;
    padding: .8em 1.2em;

}

.logo{
    width: 130px;
}

header{
    display: flex;
    justify-content: space-between;
    
}

.hide-mobile {
 display: none;
}

.menu {
    width: 25px;
    margin-top: 50%;
}

.server{
    width: 70%;
    margin: 2em auto 2em 25%;
}

h1, .subhead{
    position: relative;
    z-index: 3;
}

.subhead{
    font-size: 1.1em;
}

.blue-container{
    width: 100%;
    background: #00cc80;
    color: #efeff4;
    margin-top: 15%;
    padding: 4em 0 2em;
    border-top-left-radius: 40px;
    transform: skewY(-2deg);
}
.gray-container {
    margin-top: 5%;

}

.blue-container ul{
    transform: skewY(2deg);
}

.blue-container:before{
    content: "";
    width: 40px;
    height: 40px;
    background-color: #00cc80;
    position: absolute;
    top: -39px;
    right: 0;
    z-index: -2;
}

.blue-container:after{
    content: "";
    width: 80px;
    height: 80px;
    top: -80px;
    position: absolute;
    right: 0;
    background-color: #efeff4;
    border-radius: 50%;
    z-index: -1;
}

.blue-container ul li {
    margin-bottom: 3em;
}

.blue-container ul li p{
    padding: 0 .5em;
}

.blue-container img{
    width: 14%;
}

.blue-container ul li:nth-child(3) img{
    width: 8%;
}



figure{
    margin: 0;
    padding: 0;
}

figcaption{
    font-weight: bold;
    color: #00cc80;
}

h2{
    margin-top: 7%;
}

.cta{
    background: #00cc80;
    width:  calc(100% - 1em);
    display: block;
    color: #efeff4;
    border-radius: 20px;
    padding: .5em;
    text-decoration: none;
    font-size: 1.5em;
    position: relative;
    margin: 3% auto 7%;
    z-index: 4;

}

.footer-container{
    width: 100%;
    background-color: #3d444a;
    padding: 3em 0;
    border-top-right-radius: 40px;
    transform: skewY(2deg);
}
.footer-container .container{

    transform: skewY(-2deg);
}

.footer-container:before{
    content:"";
    width: 40px;
    height: 40px;
    background-color: #3d444a;
    position: absolute;
    top: -39px;
    left: 0;
    z-index: -2;

}

.footer-container:after{
    content:"";
    width: 80px;
    height: 80px;
    background-color: #efeff4;
    position: absolute;
    top: -80px;
    left: 0;
    z-index: -2;
    border-radius: 50%;

}

.bottom {
    width:100%;
    height: 100px;
    position: relative;
    margin-top: -40px;
    background-color: #3d444a;
}

ul.footer-links li{
    display: inline;
}
ul.footer-links li a{
    color: #9d9d9d;
}


nav ul{
    position: fixed;
    width: 60%;
    top: 0;
    right: 0;
    text-align: left;
    background: rgb(36, 41, 44);
    z-index: 7;
    padding-top: 3em;
}
nav ul li a{
    color: #efeff4;
    text-decoration: none;
    display: block;
    width: 100%;
    padding: 1em 2em;
    background-color: rgb(49, 55, 59);
}

nav ul li a:hover{

    background-color: rgb(65, 73, 78);
}

.exit-btn{
    margin-bottom: 1em;
    margin-top: -1.3em;
    text-align:  right;
    padding: 0 1.4em;
}


.exit-btn img{
    width: 15px;
    cursor: pointer;
}



@media only screen and (min-width:650px){
    .server {
        width: 50%;
    }
    h1 {
        font-size: 3em;
        margin: 0;
    }
    .subhead {
        font-size: 1.4em;
        margin-bottom: 12%;
    }
    .blue-container {
        margin: 0;
    }
    .blue-container img{
        width: 20%;
    }

    .blue-container ul li:nth-child(3) img{
        width: 11%;
        margin-top: 0px;
    }

    .blue-container ul {
        display: flex;
        justify-content: center;

    }
    .blue-container ul li {
        flex-grow: 1;

    }
    .gray-container ul li{
        flex-grow: 1;
    }
    .gray-container ul {
        display: flex;

    }

    .cta {
        width: 40%;
    }
    .container {
        width: 80%;
        margin: 0 auto;
    }

    .show-desktop {
        display: block;
        margin: 0 auto 13% auto;
    }

    .hide-desktop {
        display: none;
    }
    

    nav ul {
        position: inherit;
        width: auto;
        background: none;
        height: auto;
        display: flex;
        padding-top: 0;
    }
    nav ul li {
        float: left;
    }

    nav ul li a {
        color: #000;
        background-color: inherit;
        text-align: right;
        padding: 1em 2em;
    }

    nav ul li a:hover {
        background-color: inherit;
    }

    .scroll {

        width: 30px;
        animation: move 2s infinite alternate;
    }
    @keyframes move {
        from {
            transform: translateY(0px);
        }
        to {
            transform: translateY(20px);
        }
    }


}

@media only screen and (min-width:1600px){

    .server {
        width: 40%;
        margin: 5em auto 4em 15%;
    }

    .container {
        width: 70%;
    }

    .blue-container{
        padding: 7em 0 2em;
    }

    .blue-container ul li p, blockquote {
        font-size: 1.3em;
    }

    .gray-container {
        padding: 6em 0 4em;
    }

    h2 {
        margin-top: 4em;
    }


}
</style>
