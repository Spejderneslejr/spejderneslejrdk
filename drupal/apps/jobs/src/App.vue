<template>
  <Layout class="jobs-app">
    <h1>Opgaver til lejrfrivillige</h1>
    <p>
      Der er mange forskellige muligheder for at hjælpe som lejrfrivillig både før, under og efter Spejdernes Lejr 2022. Hvis du gerne vil vide mere kan du læse mere <a href="/da/lejrfrivillig">via dette link</a>. Hvis du allerede er klar til at hjælpe til på lejren så fortsæt med at læse på denne side.
    </p>
    <h2>Opgavebanken</h2>
    <div class="paragraph--type--text">
    <p>
      I opgavebanken finder du konkrete opgaver lejren har brug for hjælp til. Klik ind på de enkelte opgaver for at se beskrivelsen. Her finder du også et link til at ansøge.
    </p>
    <ul>
      <li>Har du allerede en aftale om et konkret job - så brug <a href="https://tilmelding.spejderneslejr.dk/da/member/job/110">dette link</a></li>
      <li>Har du ikke fundet et konkret job, men gerne vil være lejrfrivillig - så brug <a href="https://tilmelding.spejderneslejr.dk/da/member/job/111">dette link</a> i stedet</li>
      <li>Sign-up for IST - International Service Team - <a href="https://tilmelding.spejderneslejr.dk/en/member/job/257">use this link</a>.</li>
    </ul>
    </div>
    <!-- <DepartmentSelector /> -->
    <hr />
    <JobFilter v-model="sortBy" v-on:search="searchFilter" :fetch="sortJobs" />
    <JobList v-on:JobModal="showModal" :jobs="jobs" />
    <JobModal v-scroll-lock="isModalVisible" :job="job" v-show="isModalVisible" @close="closeModal"/>
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
      unfilteredJobs: [],
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
          id: job.id,
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
        this.unfilteredJobs = this.jobs;
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

      this.detectDeeplink();
    },
    detectDeeplink() {
      // Check if the url fragment (the part after #) contains a number
      if (window.location.hash && window.location.hash.match(/^\#\d+$/)) {
        // Get the number from the fragment.
        const jobId = parseInt(window.location.hash.substring(1));

        // See if we've loaded jobs, and if we have find the job with the id
        // from the fragment and trigger the modal.
        if (this.jobs && this.jobs.length > 0) {
          this.showModal(this.jobs.find(job => job.id === jobId));
        }
      }
    },
    mounted() {
      this.fetchJobs();
    },
      showModal(job) {
        // Protect against bad invocations.
        if (!job) {
          return;
        }
        this.job = job;
        this.isModalVisible = true;

        // Add the job-id to the url fragment so that the url reflects the job.
        window.location.hash = job.id;
    },
    closeModal() {
      this.isModalVisible = false;
      window.location.hash = '';
    },
      searchFilter(searchValue) {
        this.jobs = this.unfilteredJobs.filter((job) => {
          return job.name
            .toUpperCase()
            .includes(searchValue.toUpperCase())
        })
        this.sortJobs();
    },
      formatDate(date) {
        if(!date) {
          return "";
        }
      moment.locale('da');
      return moment(String(date)).format('DD/MM/YYYY')
      //return moment(String(date)).format('LL');
    },
      formatArea(org) {
        if (!org) {
          return "";
        }
        var areas = org[1].split(" - ");
        var area = areas[1].replace(/\d+/g, '').trim();
        return area;
      },
    sortJobs() {
      switch (this.sortBy) {
        case "0":
          this.jobs = this.jobs.sort(
            (a, b) =>
              new Date(b.create_date) -
              new Date(a.create_date)
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
