<template>
  <Layout>
    <h1>Opgavebanken</h1>
    <!-- <DepartmentSelector /> -->
    <hr />
    <JobFilter v-model="sortBy" :fetch="sortJobs" />
    <JobList v-on:JobModal="showModal" :jobs="jobs" />
    <JobModal :job="job" v-show="isModalVisible" @close="closeModal"/>
  </Layout>
</template>


<script>
import Layout from "./components/Layout.vue";
import JobFilter from "./components/JobFilter.vue";
import JobList from "./components/JobList.vue";
import DepartmentSelector from "./components/DepartmentSelector.vue";
import JobModal from "./components/JobModal.vue";

import axios from "axios";

export default {
  components: {
    Layout,
    JobFilter,
    JobList,
    DepartmentSelector,
    JobModal,
  },
  data() {
    return {
      isModalVisible: false,
      sortBy: "0",
      jobs: [],
      job: Object,
    };
  },
  beforeMount() {
    this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      try {
        const url =
          "https://api.pr-139-qvrewla-kigwipdp3tsiq.eu-4.platformsh.site/campos/jobs";
        const response = await axios.get(url);
        const results = response.data;
        this.jobs = results.map((job) => ({
          name: job.name,
          description: job.description,
          state: job.state,
          write_date: job.write_date,
        }));
        this.job = this.jobs.slice(0, 1); //Get first job and pass to JobModal
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("Server Error:", err);
        } else if (err.request) {
          // client never received a response, or request never left
          console.log("Network Error:", err);
        } else {
          console.log("Client Error:", err);
        }
      }
      // Sort the found jobs
      this.sortJobs();
    },
    mounted() {
      this.fetchJobs();
    },
      showModal(job) {
      this.job = job;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    sortJobs() {
      console.log(this.sortBy);
      switch (this.sortBy) {
        case "0":
          this.jobs = this.jobs.sort(
            (a, b) =>
              new Date(a.write_date).getDate() -
              new Date(b.write_date).getDate()
          );
          break;
        case "1":
          this.jobs = this.jobs.slice().sort(function (a, b) {
            return a.name > b.name ? 1 : -1;
          });
          break;
        default:
          break;
      }
    },
    mounted() {
      this.sortJobs();
    },
  },
};
</script>