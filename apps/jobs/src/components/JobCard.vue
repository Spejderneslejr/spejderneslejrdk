<template>
  <section class="card">
      <p class="title">{{job.name}}</p>
      <p class="content">{{job.description}}</p><div class="button-wrapper">
      <button>LÆS MERE</button><button>SØG OPGAVE</button>
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
  },
}
</script>