<template>
  <div
    draggable
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @drop="dropTask($event,taskIndex, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    class="task"
    @click="openTask(task)">
    <span class="w-full flex-no-shrink font-bold">{{ task.name }} {{ taskIndex }} -- {{ columnIndex }}</span>
    <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">{{ task.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'TaskColumn',
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    openTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    pickupTask (e, taskIndex, columnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      if (taskIndex !== undefined) {
        e.dataTransfer.setData('task-index', taskIndex)
        e.dataTransfer.setData('column-index', columnIndex)
        e.dataTransfer.setData('type', 'task')
      }
    },
    dropTask (e, toTaskIndex, toColumnIndex) {
      if (e.dataTransfer.getData('type') === 'task') {
        const indexFromColumn = e.dataTransfer.getData('column-index')
        const indexFromTask = e.dataTransfer.getData('task-index')
        this.$store.commit('MOVE_TASK', { indexFromColumn, indexFromTask, toTaskIndex, toColumnIndex })
      }
    }
  }
}
</script>

<style scoped>

</style>
