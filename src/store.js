import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin } from '@/utils'

Vue.use(Vuex)

// const board = JSON.parse(localStorage.getItem('board')) || defaultBoard
const board = JSON.parse(localStorage.getItem('board')) || defaultBoard
export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {},
  getters: {
    getTask (state) {
      return (id) => {
        return state.board.columns.find(column => {
          return column.tasks.find(task => task.id === id)
        })
      }
    }
  }
})
