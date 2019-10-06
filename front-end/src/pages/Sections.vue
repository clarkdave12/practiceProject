<template>
    <div class="container">
        <home-navbar></home-navbar>
        <div class="container">
            <div class="mb-4">
                <header><h3>Sections</h3></header>
            </div>

            <div class="row px-4 py-3">
                <div class="col-md-4 col">
                    <div class="form-group">
                        <form @submit.prevent="addSection()">
                            <label>Section name</label>
                            <input v-model="section.name" type="text" class="form-control mb-3">

                            <button class="btn btn-success" type="submit">Add</button>
                        </form>
                    </div>

                    <!-- For updating -->
                    <div>
                        <div class="form-group">
                            <form  v-if="update.name" @submit.prevent="updating()">
                                <label>Section name</label>
                                <input v-model="update.name" type="text" class="form-control mb-3">

                                <button type="submit" class="btn btn-warning">update</button>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- <button @click="updateSection(sec.id, sec.name)"> Update </button>
                     <button @click="deleteSection(sec.id)"> Delete </button> -->   

                <div class="col-md-8 col d-flex justify-content-center">
                    <table class="table table-hover">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Section Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>    
                        <tbody>
                            <tr v-for="sec in sections" :key="sec.id">
                                <td> {{ sec.name }} </td>
                                <td>
                                    <div class="row d-flex justify-content-center">
                                        <span class="mr-5">
                                            <button class="btn btn-outline-primary">Update</button>
                                        </span>
                                        
                                        <span>
                                            <button class="btn btn-outline-danger">Delete</button>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                    </table>   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            section: {
                name: '',
                user_id: ''
            },
            sections: [],

            update: {
                name: '',
                id: ''
            }
        }
    },

    created () {
        bus.$emit('loggedIn')
        this.showSections()
    },

    methods: {
        addSection () {
            var user = JSON.parse(window.localStorage.getItem('user'))
            this.section.user_id = user.id

            axios.post(sectionURL, this.section)
                .then(response => {
                    this.showSections()
                })
                .catch(error => {
                    console.log(error)
                })
        },

        showSections () {
            var user = JSON.parse(window.localStorage.getItem('user'))
            this.section.user_id = user.id
            axios.get(sectionURL + '/' + this.section.user_id)
                .then(response => {
                    this.sections = response.data
                    console.log(this.sections)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        updateSection(id, name) {
            this.update.id = id
            this.update.name = name
        },

        updating() {
            axios.put(sectionURL + '/' + this.update.id, this.update)
                .then(response => {
                    this.showSections()
                    this.update = {}
                })    
                .catch(error => {
                    console.log(error)
                })
        },

        deleteSection(id) {
            axios.delete(sectionURL + '/' + id)
                .then(response => {
                    console.log(response)
                    this.showSections()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style scoped>
    
    table {
        max-width: 80%;
    }

    table thead tr th {
        text-align: center;
    }

    table tbody tr td {
        text-align: center;
        font-size: 18px;
        font-weight: 500;
    }
</style>