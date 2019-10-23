<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/questionnaire.png">
    <FormPrestataire></FormPrestataire>
  </div>
</template>

<script>
// @ is an alias to /src
import FormPrestataire from '../components/FormPrestataire'

export default {
  name: 'home',
  components: {
    FormPrestataire
  }
}
</script>
