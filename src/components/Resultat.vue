<template>
  <div class="hello">
    <h1>Ce questionnaire est terminer</h1>
    <h2>Bravo, vous avez réaliser un score de {{scores}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Resultat',
  props: ['score'],
  data: function () {
    return {
      scores: ''
    }
  },
  created () {
    this.scores = this.$route.params.score
  }
}
</script>

<style scoped>

</style>
