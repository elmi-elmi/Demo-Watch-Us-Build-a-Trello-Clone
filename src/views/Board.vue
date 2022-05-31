<template>
  <div class="board">
    <div class="flex flex-row items-start">
        <Column
          v-for="(column, $columnIndex) in board.columns"
          :key="$columnIndex"
          :column="column"
          :columnIndex="$columnIndex"
        />
      <div class="column flex">
        <input
          class=" p-2 mr-2 flex-grow bg-transparent"
          type="text"
          placeholder="+ New column name"
          v-model="newColumnName"
          @keyup.enter="createColumn">
      </div>

    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Column from '@/components/Column'

export default {
  name: 'Board',
  components: { Column },
  data () {
    return {
      newColumnName: ''
    }
  },
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
    createColumn () {
      this.$store.commit('CREATE_COLUMN', { name: this.newColumnName })
      this.newColumnName = ''
    },

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
