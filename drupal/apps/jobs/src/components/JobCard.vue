<template>
  <section class="job card pointer" v-on:click="onJobModal(job)">
      <p class="title">{{job.name}}</p>
      <p class="content">{{job.description}}</p><div class="button-wrapper">
      <button v-on:click.stop="onJobModal(job)">LÆS MERE</button>
      </div>
      <i class="far fa-compass"></i>
  </section>
</template>

<script>


export default {
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