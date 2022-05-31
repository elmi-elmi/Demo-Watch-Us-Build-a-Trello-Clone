<template>
  <AppDrop
    :transfer-to="{
    toCol:columnIndex
    }">
    <AppDrag
      :transfer-from="{
      fromCol:columnIndex,
      type:'column'}"
      class="column">
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}_________{{ columnIndex }}
      </div>
      <div class="list-reset">
        <TaskColumn
          v-for="(task, $taskIndex) in column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :columnIndex="columnIndex"
        />
        <input
          @keyup.enter="createTask($event, column.tasks)"
          type="text"
          class="block p-2 w-full bg-transparent outline-none " placeholder="+ Enter new task"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import TaskColumn from '@/components/TaskColumn'
import AppDrag from '@/components/AppDrag'
import AppDrop from '@/components/AppDrop'

export default {
  name: 'Column',
  components: { TaskColumn, AppDrag, AppDrop },
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
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK', { tasks, name: e.target.value })
      e.target.value = ''
    }
  }
}
</script>

<style scoped>

</style>
