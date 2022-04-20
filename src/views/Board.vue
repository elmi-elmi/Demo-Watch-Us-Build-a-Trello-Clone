<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        @drop="dropTask($event, column.tasks)"
        @dragover.prevent
        @dragenter.prevent
        class="column"
        v-for="(column, $columnIndex) in board.columns"
        :key="$columnIndex">
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            draggable
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            class="task"
            v-for="(task, $taskIndex) in column.tasks"
            :key="$taskIndex"
            @click="openTask(task)">
            <span class="w-full flex-no-shrink font-bold">{{ task.name }} {{ $taskIndex }} {{ $columnIndex }}</span>
            <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">{{ task.description }}</p>
          </div>
          <input
            @keyup.enter="createTask($event, column.tasks)"
            type="text"
            class="block p-2 w-full bg-transparent outline-none " placeholder="+ Enter new task"/>
        </div>
      </div>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Board',
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    openTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    close () {
      this.$router.push({ name: 'board' })
    },
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK', { tasks, name: e.target.value })
      e.target.value = ''
    },
    pickupTask (e, $taskIndex, $columnIndex) {
      e.dataTransfer.setData('task-index', $taskIndex)
      e.dataTransfer.setData('column-index', $columnIndex)
    },
    dropTask (e, tasks) {
      const indexColumn = e.dataTransfer.getData('column-index')
      const indexTask = e.dataTransfer.getData('task-index')

      this.$store.commit('MOVE_TASK', { tasks, indexColumn, indexTask })
    }
  }

}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
