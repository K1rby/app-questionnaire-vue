<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="qfNom"
      :rules="qfNomRules"
      label="Nom"
      required
    ></v-text-field>
    <v-text-field
      v-model="qfPrenom"
      :rules="qfPrenomRules"
      label="Prenom"
      required
    ></v-text-field>

    <v-text-field
      v-model="qfSociete"
      :rules="qfSocieteRules"
      label="Nom de société"
      required
    ></v-text-field>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="qfValidate">Commencer le test</v-btn>
    <v-btn color="error" class="mr-4" @click="qfReset">Reset</v-btn>
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
    qfNom: '',
    qfNomRules: [
      // vérifie si l'utilisateur à rentrer un élément dans le champs nom
      v => !!v || 'Un nom est requis'
    ],
    qfPrenom: '',
    qfPrenomRules: [
      v => !!v || 'Un prenom est requis'
    ],
    qfSociete: '',
    qfSocieteRules: [
      v => !!v || 'Le nom de votre société est requis'
    ]
  }),
  methods: {
    qfValidate () {
      // géneration d'un id user unique
      let qfIdUser = shortid.generate()
      if (this.$refs.form.validate()) {
        // insertion des données venant du formulaire dans pouchDB
        db.put({
          _id: qfIdUser,
          nom: this.qfNom,
          prenom: this.qfPrenom,
          societe: this.qfSociete
        })
        db.changes().on('change', function () {
          console.log('Ch-Ch-Changes')
        })
        // Replicate de la base local vers le remote
        db.replicate.to('http://127.0.0.1:5984/questionnaire/')
        this.$router.push({ name: 'question', params: { id: qfIdUser } })
      }
    },
    qfReset () {
      // reset tout les champs du formulaire
      this.$refs.form.reset()
    }
  }
}

</script>

<style scoped>

</style>
