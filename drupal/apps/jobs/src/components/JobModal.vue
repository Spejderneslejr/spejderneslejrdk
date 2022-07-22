<template>
  <div @click.self="close" class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h4><JobIcon :area="job.area" /><span style="margin-left:5px">{{job.area}}</span></h4>
          <h2 class="header">{{job.name}}</h2>
          <p class="teaser">{{job.teaser}}</p>
          </slot>
        <button type="button" class="btn-close" @click="close"><i class="fas fa-times fa-lg"></i></button>
      </header>
      <hr>
      <section class="modal-body">
        <slot name="body">
          <div class="content">
          <p class="title">Beskrivelse</p>
          {{job.description}}
          </div>
          <div v-if="job.description_you_give" class="content">
          <p class="title">Du giver</p>
          {{job.description_you_give}}
          </div>
          <div v-if="job.description_we_give" class="content">
          <p class="title">Vi giver</p>
          {{job.description_we_give}}
          </div>
          <div v-if="job.description_scope" class="content">
          <p class="title">Tid og omfang</p>
          {{job.description_scope}}
          </div>
          <div class="content">
          <p class="title">Ansøg</p>
          For at ansøge dette job, skal du klikke på <a v-bind:href="'https://tilmelding.spejderneslejr.dk/da/member/job/' + job.id">dette link</a>. Linket fører dig videre til tilmeldings-systemet, hvor du hvis du er medlem af et spejderkorps kan logge på og fuldføre din ansøgning. Hvis du ikke er medlem af et spejderkorps skal du oprette en bruger først.
          </div>
          <div class="content">
          <p class="title">Om Spejdernes Lejr</p>
          <AboutSL />
          </div>
          </slot>
      </section>
      <hr>
      <footer class="modal-footer">
        <slot name="footer"></slot>
        <span class="date">Oprettet {{job.formatted_create_date}}</span>
        <div class="button-wrapper">
          <a v-bind:href="'https://tilmelding.spejderneslejr.dk/da/member/job/' + job.id" class="button button-secondary" target="_blank">ANSØG JOB</a>
          <button type="button" class="button-primary" @click="close">LUK</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import JobIcon from "./JobIcon.vue";
import AboutSL from "./AboutSL.vue";

export default {
      components: {
      JobIcon,
      AboutSL,
  },
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
