<template>
<span class="icon">
      <span v-if="area == 'Deltagere'"><i class="far fa-laugh"></i></span>
      <span v-else-if="area == 'Kommunikation'"><i class="far fa-comment-alt"></i><i class="fas fa-comment-alt reverse"></i></span>
      <span v-else-if="area == 'Aktiviteter og Events'"><i class="far fa-compass"></i></span>
      <span v-else-if="area == 'Frivillighed'"><i class="fas fa-briefcase"></i></span>
      <span v-else-if="area == 'Lejrplads og Infrastruktur'"><i class="fas fa-campground"></i></span>
      <span v-else-if="area == 'Økonomi'"><i class="fas fa-coins"></i></span>
</span>
</template>

<script>
export default {
  props: {
    area: {
      type: String,
      required: false,
    },
  },
  methods: {},
};
</script>