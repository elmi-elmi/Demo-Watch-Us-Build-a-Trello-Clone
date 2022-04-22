<template>
  <div
    draggable
    @dragstart.self="onDrag($event)"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'AppDrag',
  props: {
    transferFrom: {
      type: Object,
      required: true,
    }
  },
  methods: {
    onDrag (e) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('payload', JSON.stringify(this.transferFrom))
    }
  }
}
</script>

<style scoped>

</style>
