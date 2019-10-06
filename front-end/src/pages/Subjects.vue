<template>
    <div class="container">
        <home-navbar></home-navbar>
        <h1>Subjects</h1>
        <div class="row">
            <!-- subjects control -->
            <div class="col-md-5">
                <!-- Adding a subject -->
                <div class="form-group">
                    <header class="mb-3">Add Subject</header>
                    <form @submit.prevent="addSubject()">
                        <label> Code </label>
                        <input v-model="subject.code" type="text" class="form-control">
                        <div class="error mb-2" v-if="addErrors.code">
                            <span> {{ addErrors.code[0] }} </span>
                        </div>

                        <label> Description </label>
                        <input v-model="subject.description" type="text" class="form-control">
                        <div class="error mb-2" v-if="addErrors.description">
                            <span> {{ addErrors.description[0] }} </span>
                        </div>
                        <button type="submit" class="btn btn-success mt-3">Add</button>
                    </form>
                </div>

                <!-- Updating a subject record -->
                <div v-if="toUpdate.id" class="form-group">
                    <header class="mb-3">Update Subject</header>
                    <form @submit.prevent="update()">
                        <label> Code </label>
                        <input v-model="toUpdate.code" type="text" class="form-control">
                        <div class="error mb-3" v-if="updateErrors.code">
                            <span> {{ updateErrors.code[0] }} </span>
                        </div>

                        <label> Description </label>
                        <input v-model="toUpdate.description" type="text" class="form-control">
                        <div class="error mb-3" v-if="updateErrors.description">
                            <span> {{ updateErrors.description[0] }} </span>
                        </div>

                        <button type="submit" class="btn btn-success mt-3">Update</button>
                    </form>
                </div>
            </div>

            <!-- Subjects List -->
            <div class="col-md-7">
                <table class="table table-hover">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">Subject Code</th>
                            <th scope="col">Subject Description</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sub in subjects" :key="sub.id">
                            <td> {{ sub.code }} </td>
                            <td> {{ sub.description }} </td>
                            <td>
                                <div class="row d-flex justify-content-center">
                                    <span class="mr-5">
                                        <button @click="forUpdate(sub.id, sub.code, sub.description)" class="btn btn-outline-primary">Update</button>
                                    </span>
                                    
                                    <span>
                                        <button @click="deleteSubject(sub.id)" class="btn btn-outline-danger">Delete</button>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            subject: {
                code: '',
                description: '',
                user_id: ''
            },

            subjects: [],
            addErrors: {},
            updateErrors: {},

            toUpdate: {
                id: '',
                code: '',
                description: ''
            }
        }
    },
    
    mounted () {
        this.showSubjects()
    },

    methods: {
        addSubject() {
            var user = JSON.parse(window.localStorage.getItem('user'))
            this.subject.user_id = user.id

            axios.post(subjectURL, this.subject)
                .then(response => {
                    this.subject.code = ''
                    this.subject.description = ''
                    this.showSubjects()
                })
                .catch(error => {
                    this.addErrors = error.response.data.errors
                })
        },

        showSubjects() {
            var user = JSON.parse(window.localStorage.getItem('user'))
            axios.get(subjectURL + '/' + user.id)
                .then(response => {
                    this.subjects = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },

        forUpdate (id, code, description) {
            this.toUpdate.id = id
            this.toUpdate.code = code
            this.toUpdate.description = description
        },

        update() {
            axios.put(subjectURL + '/' + this.toUpdate.id, this.toUpdate)
                .then(response => {
                    this.toUpdate = []
                    this.showSubjects()
                })
                .catch(error => {
                    this.updateErrors = error.response.data.errors
                })
        },



        deleteSubject(id) {
            
            axios.delete(subjectURL + '/' + id)
                .then(response => {
                    console.log('deleted')
                    this.showSubjects()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>