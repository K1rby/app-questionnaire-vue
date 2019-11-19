<template>
  <div class="hello">
    <h1>Ce questionnaire est terminer</h1>
    <h2>Bravo, vous avez réaliser un score de {{qfScores}} / 10</h2>
  </div>
</template>

<script>
export default {
  name: 'Resultat',
  props: ['score'],
  data: function () {
    return {
      qfScores: ''
    }
  },
  created () {
    // récupération du score passer en GET
    this.qfScores = this.$route.params.score
  }
}
</script>

<style scoped>

</style>
