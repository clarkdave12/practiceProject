<template>
    <div class="container py-3 px-4 d-flex justify-content-center">
        
        <div class="form-group py-3 px-3">
            <div class="mb-4">
                <h5>Login</h5>
            </div>
            <form @submit.prevent="login()">
                <div v-if="hasError" class="error mb-4">
                    {{ errorMessage }}
                </div>
                <label>Email</label>
                <input v-model="email" type="text" placeholder="example@email.com" class="form-control mb-4">

                <label>Password</label>
                <input v-model="password" type="password" placeholder="********" class="form-control">

                <div class="d-flex justify-content-end mt-3">
                    <button type="submit" class="btn">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            email: '',
            password: '',
            hasError: false,
            errorMessage: 'Invalid Email or Password'
        }
    },

    methods: {
        login() {
            var data = {
                client_id: 2,
                client_secret: 'AtVMlbPBGpWqCqQ3THH2TMisZHncewQFcez2U9jm',
                grant_type: 'password',
                username: this.email,
                password: this.password
            }

            var authUser = {}

            axios.post(loginURL, data)
                .then(response => {
                    if(response.status == 200) {
                        window.localStorage.setItem('access_token', response.data.access_token)
                        window.localStorage.setItem('refresh_token', response.data.refresh_token)

                        axios.get(userURL, {headers: getHeader()})
                            .then(response => {
                                authUser.id = response.data.id
                                authUser.name = response.data.name
                                authUser.email = response.data.email
                                window.localStorage.setItem('user', JSON.stringify(authUser))
                                this.hasError = false
                                bus.$emit('loggedIn')
                                this.$router.push('/home')
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                })
                .catch(error => {
                    this.hasError = true
                })
        }
    }
}
</script>

<style scoped>
    .form-group {
        border: 1px #77a6f7 solid;
        border-radius: 10px;
        width: 50%;   
    }
    h5 {
        color: #00887a;
        font-weight: 600;
        font-size: 2em;
    }

    label {
        color: #00887a;
    }

    .form-control {
        border: 1px #77a6f7 solid;
        border-radius: 10px;

    }

    .btn {
        color: #ffffff;
        background: #77a6f7;
        border-radius: 5px;
    }

    .error {
        color: #DC143C;
    }
</style>