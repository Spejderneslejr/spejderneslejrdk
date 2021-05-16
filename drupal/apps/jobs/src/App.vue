<template>
  <Layout class="jobs-app">
    <h1>Opgavebanken</h1>
    <!-- <h1 style="text-align:center;color:red;">UNDER UDARBEJDELSE</h1> -->
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
import moment from 'moment';
import da from 'moment/locale/da';

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
          "https://api.spejderneslejr.dk/campos/jobs";
        const response = await axios.get(url);
        const results = response.data;
        this.jobs = results.map((job) => ({
          area: this.formatArea(job.organization_id),
          name: job.name,
          teaser: job.teaser,
          description: job.description,
          description_scope: job.description_time_and_scope,
          description_you_give: job.description_you_give,
          description_we_give: job.description_we_give,
          state: job.state,
          user_name: job.user_name,
          user_email: job.user_email,
          write_date: job.write_date,
          create_date: job.create_date,
          no_of_recruitment: job.no_of_recruitment,
          no_of_hired_employee: job.no_of_hired_employee,
          formatted_write_date: this.formatDate(job.write_date),
          formatted_create_date: this.formatDate(job.create_date),
        }));
        this.jobs = this.jobs.filter((job) => {
          return (job.state == "recruit"); //Filter open jobs
        });
        this.jobs = this.jobs.filter((job) => {
          return (job.no_of_recruitment != job.no_of_hired_employee); //Filter fully staffed jobs
        });
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
      formatDate(date) {
      moment.locale('da');
      return moment(String(date)).format('DD/MM/YYYY')
      //return moment(String(date)).format('LL');
    },
      formatArea(org) {
        var areas = org[1].split(" - ");
        return areas[1];
      },
    sortJobs() {
      switch (this.sortBy) {
        case "0":
          this.jobs = this.jobs.sort(
            (a, b) =>
              new Date(a.create_date).getDate() -
              new Date(b.create_date).getDate()
          );
          break;
        case "1":
          this.jobs = this.jobs.slice().sort(function (a, b) {
            return a.name > b.name ? 1 : -1;
          });
          break;
        case "2":
          this.jobs = this.jobs.slice().sort(function (a, b) {
            return a.area > b.area ? 1 : -1;
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