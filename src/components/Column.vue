<template>
  <div
    draggable
    @dragstart="pickColumn($event,columnIndex)"
    @drop="dropColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    class="column"
  >
    <div class="flex items-center mb-2 font-bold">
      {{ column.name }} -- {{ columnIndex }}
    </div>
    <div class="list-reset">
      <TaskColumn
        v-for="(task, $taskIndex) in column.tasks"
        :key="$taskIndex"
        :task="task"
        :taskIndex="$taskIndex"
        :columnIndex="columnIndex"
      />
    </div>
  </div>
</template>

<script>
import TaskColumn from '@/components/TaskColumn'

export default {
  name: 'Column',
  components: { TaskColumn },
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    dropColumn (e, tasks, toColumnIndex) {
      if (e.dataTransfer.getData('type') !== 'task') {
        const fromColumnIndex = e.dataTransfer.getData('column-index')
        this.$store.commit('MOVE_COLUMN', { fromColumnIndex, toColumnIndex })
      }
    },
    pickColumn (e, columnIndex) {
      e.dataTransfer.setData('column-index', columnIndex)
    }
  }
}
</script>

<style scoped>

</style>
