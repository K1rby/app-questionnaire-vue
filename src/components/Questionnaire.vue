<template>
  <div class="my-12 ma-12">
  <v-hover>
    <template v-slot="{ hover }">
      <div :class="`elevation-${hover ? 24 : 6}`" class="mx-auto pa-6 transition-swing">
        <div v-if="qfNbrQuestion < 10">
        <h2>{{qfTitre[qfNbrQuestion]}}</h2>
          <div v-bind:key="displayReponse" v-for="displayReponse in qfReponse[qfNbrQuestion]">
            <v-checkbox v-model="qfSelected" class="mx-2" v-bind:label="displayReponse" v-bind:value="displayReponse"></v-checkbox>
          </div>
          <v-btn color="error" class="mr-4" @click="qfValidateQuestion">Question suivante</v-btn>
        </div>
        <div v-else-if="qfNbrQuestion === 10">
          <h2>Questionnaire fini</h2>
          <v-btn color="success" class="mr-4" @click="qfResultat">Valider</v-btn>
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
  // récuperation de l'id user passer en param de la route
  props: ['id'],
  data: function () {
    return {
      qfNom: '',
      qfPrenom: '',
      qfSociete: '',
      qfNbrQuestion: 0,
      qfSelected: [],
      qfScore: 0
    }
  },
  created: function () {
    // récupere l'utilisateur au lancement de cette vue
    this.qfRecupUser()
  },
  methods: {
    qfRecupUser () {
      db.get(this.$route.params.id).then((doc) => {
        this.qfNom = doc.nom
        this.qfPrenom = doc.prenom
        this.qfSociete = doc.societe
      }).catch((err) => {
        console.log(err)
      })
    },
    qfValidateQuestion () {
      // ce compteur permet d'incrémenter le tableau des questions et des réponses pour l'affichage et la vérif des réponses
      if (this.qfNbrQuestion <= 10) {
        let testSuccess = false
        // Permet de tester si l'utilisateur a cocher le nombre suffisant de réponse par rapport au réponse du JSON
        if (this.qfSelected.length === this.qfReponseQuestion[this.qfNbrQuestion].length) {
          for (let d = 0; d < this.qfSelected.length; d++) {
            // Permet de tester si les réponses donner par l'utilisateur sont correct
            if (this.qfReponseQuestion[this.qfNbrQuestion].includes(this.qfSelected[d])) {
              testSuccess = true
            }
          }
          if (testSuccess === true) {
            // ajout +1 au score de l'utilisateur
            this.qfScore = this.qfScore + 1
          }
        }
        // réinitialisation de la sélection du user avant la prochaine question
        this.qfSelected = []
        this.qfNbrQuestion = this.qfNbrQuestion + 1
      }
    },
    qfResultat () {
      // envoie du score a la page des Résultat pour l'affichage
      this.$router.push({ name: 'DisplayResult', params: { score: this.qfScore } })
    }
  },
  computed: {
    qfTitre () {
      // Récupération des questions depuis le fichier JSON
      return json.questions.map((item) => {
        return item.title
      })
    },
    qfReponse () {
      // Récupération des réponses depuis le fichier JSON
      return json.questions.map((item) => {
        return item.reponse
      })
    },
    qfReponseQuestion () {
      // Récupération des réponses depuis le fichier JSON
      return json.questions.map((item) => {
        return item.reponseQuestion
      })
    }
  }
}
</script>

<style scoped>

</style>
