<template>
  <div class="my-12 ma-12">
  <v-hover>
    <template v-slot="{ hover }">
      <div :class="`elevation-${hover ? 24 : 6}`" class="mx-auto pa-6 transition-swing">
        <div v-if="i < 4">
        <h2>{{titre[i]}}</h2>
          <v-checkbox v-model="selected" class="mx-2" label="Oui" value="oui"></v-checkbox>
          <v-checkbox v-model="selected" class="mx-2" label="Non" value="non"></v-checkbox>
          <v-checkbox v-model="selected" class="mx-2" label="Je ne sais pas" value="jsp"></v-checkbox>
          <v-checkbox v-model="selected" class="mx-2" label="Peut-être" value="peutetre"></v-checkbox>
          <v-btn color="error" class="mr-4" @click="validateQuestion">Question suivante</v-btn>
        </div>
        <div v-else-if="i == 4">
          <h2>Questionnaire fini</h2>
          <v-btn color="success" class="mr-4" @click="resultat">Valider</v-btn>
          <p>{{score}}</p>
        </div>
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
      i: 0,
      selected: [],
      score: 1
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
      if (this.i <= 4) {
        if (this.selected[0] === this.reponse[this.i]) {
          this.score = this.score + 10
          console.log(this.score)
        }
        this.selected = []
      } else {
        console.log(this.score)
      }
      this.i = this.i + 1
    },
    resultat () {
      this.$router.push({ name: 'DisplayResult', params: { score: this.score } })
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
