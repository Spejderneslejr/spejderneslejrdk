<template>
  <section>
    <h3 class="results" style="text-align: center">
      Resultater (<span>{{ jobs.length }}</span
      >)
    </h3>
    <div class="jobs">
      <div class="wrapper">
        <JobCard v-on:JobModal="onJobModal" v-for="(job, index) in jobs" :key="index" :job="job" />
      </div>
    </div>
    <!-- <pagination :records="jobs.length" v-model="page" :per-page="50" @paginate="callback">
  </pagination> -->
  </section>
</template>

<script>
import JobCard from "./JobCard.vue";
import Pagination from "vue-pagination-2";
export default {
  components: {
    JobCard,
    Pagination,
  },
  data() {
    return {
      page: 1,
    };
  },
  props: {
    jobs: {
      type: Array,
      required: true,
    },
  },
  methods: {
   onJobModal: function (job) {
    this.$emit('JobModal', job);
  },
    callback: function (page) {
      console.log(`Page ${page} was selected`);
    },
  },
};
</script>