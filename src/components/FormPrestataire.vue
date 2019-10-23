<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Valider
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset
    </v-btn>
  </v-form>
</template>

<script>
import PouchDB from 'pouchdb'

export default {
  name: 'FormPrestataire',
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}

var db = new PouchDB('dbname')

db.put({
  _id: 'daniel@gmail.com',
  name: 'Daniel',
  age: 19,
  _rev: '1-989b8ec340554497de5326f1bc5b3826'
})
db.get('daniel@gmail.com').then(function (doc) {
  console.log(doc)
}).catch(function (err) {
  console.log(err)
})

db.replicate.to('http://127.0.0.1:5984/questionnaire')

</script>

<style scoped>

</style>
