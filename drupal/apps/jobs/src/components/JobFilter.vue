<template>
  <section class="wrapper search">
    <div class="input-wrapper search">
      <label>Søg efter opgaver</label>
            <input v-on:keyup.enter="$emit('search', searchValue)" v-model="searchValue" type="text" id="search" placeholder="Søg..." name="search">
            <button v-on:click="$emit('search', searchValue)"><i class="fa fa-search"></i></button>
    </div>
        <div class="input-wrapper select">
      <label>Sortering</label>
  <select v-model="sortBy" @change="fetch">
    <option value="0">Oprettelsesdato</option>
    <option value="1">Titel (A-Å)</option>
    <option value="2">Område (A-Å)</option>
  </select>
    </div>
  </section>
</template>

<script>
import { computed } from "vue"
export default {
   data() {
    return {
      sortBy: '0',
      searchValue: '',
    }
    },
  props: {
    modelValue: String,
    fetch: Function,
  },
  setup(props, { emit }) {
    const sortBy = computed({
      get: () => props.modelValue,
      set: value => emit("update:modelValue", value),
    })
    return {
      sortBy,
    }
  },
}
</script>