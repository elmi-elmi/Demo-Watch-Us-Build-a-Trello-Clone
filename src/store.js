import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from '@/utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard
export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        description: '',
        id: uuid()
      })
    },
    UPDATE_TASK (state, { task, key, value }) {
      task[key] = value
    },
    MOVE_TASK (state, { indexFromColumn, indexFromTask, toTaskIndex, toColumnIndex }) {
      const task = state.board.columns[indexFromColumn].tasks.splice(indexFromTask, 1)[0]
      state.board.columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task)
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const column = state.board.columns.splice(fromColumnIndex, 1)[0]
      state.board.columns.splice(toColumnIndex, 0, column)
    },
    CREATE_COLUMN (state, { name }) {
      const tasks = []
      state.board.columns.push({ name, tasks })
    }
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) return task
          }
        }
      }
    }
  }
})
