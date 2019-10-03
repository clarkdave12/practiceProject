<template>
    <div>
        <nav class="navbar navbar-expand-lg" id="navbar">
            <router-link to="/" class="navbar-brand ml-5">ATTENDANCE</router-link>

            <ul class="navbar-nav ml-auto mr-5">
                <li class="nav-item mr-3">
                    <router-link to="/login" class="nav-link">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/register" class="nav-link">Register</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
    #navbar {
        background: #77a8f7;
    }

    .navbar-brand {
        color: #ffffff;
        font-weight: bold;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        letter-spacing: 2px;
    }

    .nav-link {
        color: #ffffff;
        letter-spacing: 1px;
    }
</style>