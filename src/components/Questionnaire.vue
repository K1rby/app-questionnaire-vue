<template>
  <div class="my-12 ma-12">
  <v-hover>
    <template v-slot="{ hover }">
      <div :class="`elevation-${hover ? 24 : 6}`" class="mx-auto pa-6 transition-swing">
        <h2>{{titre[i]}}</h2>
        <h2>{{fini}}</h2>
        <v-checkbox v-model="disabled" class="mx-2" label="Oui"></v-checkbox>
        <v-checkbox v-model="readonly" class="mx-2" label="Non"></v-checkbox>
        <v-checkbox v-model="error" class="mx-2" label="Je ne sais pas"></v-checkbox>
        <v-checkbox v-model="success" class="mx-2" label="Peut-être"></v-checkbox>
        <v-btn color="error" class="mr-4" @click="validateQuestion">Question suivante</v-btn>
      </div>
    </template>
  </v-hover>
</div>
</template>

<script>
import PouchDB from 'pouchdb'
import json from '../json/question.json'
var db = new PouchDB('questionnaire')
export default {
  name: 'Question',
  props: ['id'],
  data: function () {
    return {
      nom: '',
      prenom: '',
      societe: '',
      i: 1,
      fini: ''
    }
  },
  created: function () {
    this.recupUser()
  },
  methods: {
    recupUser () {
      db.get(this.$route.params.id).then((doc) => {
        console.log(doc)
        this.nom = doc.nom
        this.prenom = doc.prenom
        this.societe = doc.societe
      }).catch((err) => {
        console.log(err)
      })
    },
    validateQuestion () {
      if (this.i <= 10) {
        this.i = this.i + 1
      } else {
        this.fini = 'Questionnaire fini'
      }
    }
  },
  computed: {
    titre () {
      return json.questions.map((item) => {
        return item.title
      })
    },
    reponse () {
      return json.questions.map((item) => {
        return item.reponse
      })
    }
  }
}
</script>

<style scoped>

</style>
