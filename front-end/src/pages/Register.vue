<template>
    <div class="container py-3 px-4 d-flex justify-content-center">
        <div class="form-group py-3 px-3">
            <div class="mb-4">
                <h5>Register</h5>
            </div>
            <form @submit.prevent="register()">
                
                <label>Name</label>
                <input v-model="user.name" type="text" placeholder="name" class="form-control mb-4">

                <label>Email</label>
                <input v-model="user.email" type="text" placeholder="example@email.com" class="form-control mb-4">

                <label>Password</label>
                <input v-model="user.password" type="password" placeholder="********" class="form-control mb-4">

                <label>Confirm Password</label>
                <input v-model="user.passwordConfirm" type="password" placeholder="********" class="form-control">

                <div class="d-flex justify-content-end mt-3">
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
            }
        }
    },

    methods: {
        register() {
            console.log(this.user);
            axios.post(registerURL, this.user)
                .then(response => {
                    this.$router.push('/login')
                })
                .catch(error => {
                    console.log(error)
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
</style>