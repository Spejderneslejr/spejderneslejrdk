<template>
  <section class="job card pointer" v-on:click="onJobModal(job)">
      <p class="title">{{job.name}}</p>
      <p class="content">{{job.teaser}}</p><div class="button-wrapper">
      <button v-on:click.stop="onJobModal(job)">LÆS MERE</button>
      </div>
      <JobIcon :area="job.area" />
  </section>
</template>

<script>

import JobIcon from "./JobIcon.vue";

export default {
    components: {
      JobIcon,
  },
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onJobModal: function (job) {
    this.$emit('JobModal', job);
  },
  },
}
</script>