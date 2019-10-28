<template>
  <p>{{ $route.params.id }}</p>
</template>

<script>
export default {
  name: 'Question',
  props: ['id']
}
</script>

<style scoped>

</style>
