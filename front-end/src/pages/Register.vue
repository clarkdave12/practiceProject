<template>
    <div class="container py-3 px-4 d-flex justify-content-center">
        <div class="form-group py-3 px-3">
            <div class="mb-4">
                <h5>Register</h5>
            </div>
            <form @submit.prevent="register()">
                
                <div class="mb-4">
                    <label>Name</label>
                    <input v-model="user.name" type="text" placeholder="name" class="form-control">
                    <div v-if="errors.name" class="error"> {{ errors.name[0] }} </div>
                </div>

                <div class="mb-4">
                    <label>Email</label>
                    <input v-model="user.email" type="text" placeholder="example@email.com" class="form-control">
                    <div v-if="errors.email" class="error"> {{ errors.email[0] }} </div>
                </div>

                <div class="mb-4">
                    <label>Password</label>
                    <input v-model="user.password" type="password" placeholder="********" class="form-control">
                    <div v-if="errors.password" class="error"> {{ errors.password[0] }} </div>
                </div>

                <div class="mb-4">
                    <label>Confirm Password</label>
                    <input v-model="user.passwordConfirm" type="password" placeholder="********" class="form-control">
                    <div v-if="passwordMatch" class="error"> {{ passwordMatch }} </div>
                </div>

                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn">Register</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                passwordConfirm: ''
            },
            errors: [],
            passwordMatch: ''
        }
    },

    methods: {
        register() {
            axios.post(registerURL, this.user)
            .then(response => {
                if(this.user.password === this.user.passwordConfirm) {
                    this.errors = []
                    this.passwordMatch = ''
                    this.$router.push('/login')
                }
                else {
                    this.passwordMatch = 'The password does not match'
                }
            })
            .catch(error => {
                if(error.response.status == 422) {
                    if(this.user.password != this.user.passwordConfirm) {
                        this.passwordMatch = 'The password does not match'
                    }
                    this.errors = error.response.data.errors
                }
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