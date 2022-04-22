<template>
  <AppDrop
    :transfer-to="{
    toTask:taskIndex,
    toCol:columnIndex
    }">
    <AppDrag
      :transfer-from="{
      fromTask:taskIndex,
      fromCol:columnIndex,
      type:'task'}"
      class="task"
      @click="openTask(task)">
      <span class="w-full flex-no-shrink font-bold">{{ task.name }} {{ taskIndex }} -- {{ columnIndex }}</span>
      <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">{{ task.description }}</p>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from '@/components/AppDrag'
import AppDrop from '@/components/AppDrop'

export default {
  name: 'TaskColumn',
  components: { AppDrag, AppDrop },
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
    }
  }
}
</script>

<style scoped>

</style>
