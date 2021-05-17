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
          <div class="content">
          <p class="title">Du giver</p>
          {{job.description_you_give}}
          </div>
          <div class="content">
          <p class="title">Vi giver</p>
          {{job.description_we_give}}
          </div>
          <div class="content">
          <p class="title">Ansøg</p>
          For at ansøge dette job, skal du sende en mail til <a href="mailto:sljob@sl2022.dk">sljob@sl2022.dk</a>, hvor du i emnefeltet skriver "SL job {{job.id}}".<br> 
          Efterfølgende vil du blive kontaktet af kontaktpersonen til jobbet. Har du yderligere spørgsmål, er du velkommen til at skrive til <a href="mailto:sljob@sl2022.dk">sljob@sl2022.dk</a>.<br> 
          OBS. Af hensyn til GDPR, skal du kun oplyse navn og alder i ansøgning. Andre oplysninger bliver indhentet, når det bliver nødvendigt. 
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
        <button type="button" class="right" @click="close">
          LUK
        </button>
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
