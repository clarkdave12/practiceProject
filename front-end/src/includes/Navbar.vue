<template>
    <div>
        <nav class="navbar navbar-expand-lg" id="navbar">
            <router-link to="/" class="navbar-brand ml-5">ATTENDANCE</router-link>

            <ul class="navbar-nav ml-auto mr-5">
                <li class="nav-item mr-3" v-if="!isAuth">
                    <router-link to="/login" class="nav-link">Login</router-link>
                </li>
                <li class="nav-item" v-if="!isAuth">
                    <router-link to="/register" class="nav-link">Register</router-link>
                </li>

                <!-- Show if the user has logged in -->
                <li class="nav-item mr-3" v-if="isAuth">
                    <router-link to="/login" class="nav-link"> {{ user_name }} </router-link>
                </li>
                <li class="nav-item" v-if="isAuth">
                    <a @click="logout()" href="" class="nav-link">Logout</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isAuth: false,
            user_name: ''
        }
    },

    methods: {
        logout () {
            window.localStorage.removeItem('access_token')
            window.localStorage.removeItem('refresh_token')
            window.localStorage.removeItem('user')
        },
        getUserData () {
            const user = JSON.parse(window.localStorage.getItem('user'))
            this.user_name = user.name
        }
    },

    created () {
        bus.$on('loggedIn', () => {
            const access_token = window.localStorage.getItem('access_token')

            if(access_token) {
                this.isAuth = true
                this.getUserData()
            }
            else {
                this.isAuth = false
            }
        })
    },
}
</script>

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