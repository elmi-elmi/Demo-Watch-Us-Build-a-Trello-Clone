<template>
  <div
    @drop.stop="onDrop($event)"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'AppDrop',
  props: {
    transferTo: {
      required: true,
      type: Object
    }
  },
  methods: {
    onDrop (e) {
      const transferdData = JSON.parse(e.dataTransfer.getData('payload'))
      this.$store.commit(transferdData.type === 'task' ? 'MOVE_TASK' : 'MOVE_COLUMN', { ...transferdData, ...this.transferTo })
    }
  }

}
</script>

<style scoped>

</style>
