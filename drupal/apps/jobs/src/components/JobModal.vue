<template>
  <div @click.self="close" class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h4><i class="far fa-compass"></i><span style="margin-left:5px">Område</span></h4>
          <h2 style="margin:0;">{{job.name}}</h2>
          </slot>
        <button type="button" class="btn-close" @click="close"><i class="fas fa-times fa-lg"></i></button>
      </header>
      <hr>
      <section class="modal-body">
        <slot name="body">
          <p class="title">Beskrivelse</p>
          {{job.description}}
          </slot>
      </section>
      <hr>
      <footer class="modal-footer">
        <slot name="footer"></slot>
        <button type="button" class="right" @click="close">
          LUK
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    close() {
      this.$emit("close");
    },
  },
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
};
</script>
