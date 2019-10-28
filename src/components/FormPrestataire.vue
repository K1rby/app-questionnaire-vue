<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="nom"
      :counter="10"
      :rules="nomRules"
      label="Nom"
      required
    ></v-text-field>
    <v-text-field
      v-model="prenom"
      :counter="10"
      :rules="prenomRules"
      label="Prenom"
      required
    ></v-text-field>

    <v-text-field
      v-model="societe"
      :rules="societeRules"
      label="Nom de société"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Commencer le test
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
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
var db = new PouchDB('questionnaire')
const shortid = require('shortid')
export default {
  name: 'FormPrestataire',
  data: () => ({
    valid: true,
    nom: '',
    nomRules: [
      v => !!v || 'Un nom est requis',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    prenom: '',
    prenomRules: [
      v => !!v || 'Un prenom est requis',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    societe: '',
    societeRules: [
      v => !!v || 'Le nom de votre société est requis'
    ]
  }),
  methods: {
    validate () {
      let idUser = shortid.generate()
      if (this.$refs.form.validate()) {
        db.put({
          _id: idUser,
          nom: this.nom,
          prenom: this.prenom,
          societe: this.societe
        })
        db.changes().on('change', function () {
          console.log('Ch-Ch-Changes')
        })
        db.replicate.to('http://127.0.0.1:5984/questionnaire/')
        this.$router.push({ name: 'question', params: { id: idUser } })
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}

</script>

<style scoped>

</style>
