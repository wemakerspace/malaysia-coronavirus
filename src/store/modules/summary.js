import axios from "axios";

const baseUrl =
  "https://malaysia-coronavirus-default-rtdb.asia-southeast1.firebasedatabase.app";

export default {
  namespaced: true,
  state: () => ({
    summary: {
      testing: {
        latest_date: "",
        latest_value: 0,
        oldest_date: "",
        current_seven_days_total: 0,
        previous_seven_days_total: 0,
        change: 0,
        imageUrl: "",
      },
      cases: {
        latest_date: "",
        latest_value: 0,
        oldest_date: "",
        current_seven_days_total: 0,
        previous_seven_days_total: 0,
        change: 0,
        imageUrl: "",
      },
      deaths: {
        latest_date: "",
        latest_value: 0,
        oldest_date: "",
        current_seven_days_total: 0,
        previous_seven_days_total: 0,
        change: 0,
        imageUrl: "",
      },
      vaccinations: {
        change: 0,
        current_seven_days_total: 0,
        dose1_cumul: 0,
        dose1_daily: 0,
        dose2_cumul: 0,
        dose2_daily: 0,
        imageUrl: "",
        latest_date: "",
        latest_value: 0,
        oldest_date: "",
        previous_seven_days_total: 0,
      },
      healthcare: {
        hospital: {
          change: 0,
          current_seven_days_total: 0,
          imageUrl: "",
          latest_date: "",
          latest_value: 0,
          oldest_date: "",
          previous_seven_days_total: 0,
        },
        icu: {
          change: 0,
          current_seven_days_total: 0,
          imageUrl: "",
          latest_date: "",
          latest_value: 0,
          oldest_date: "",
          previous_seven_days_total: 0,
        },
        icu_vent: {
          change: 0,
          current_seven_days_total: 0,
          imageUrl: "",
          latest_date: "",
          latest_value: 0,
          oldest_date: "",
          previous_seven_days_total: 0,
        },
        pkrc: {
          change: 0,
          current_seven_days_total: 0,
          imageUrl: "",
          latest_date: "",
          latest_value: 0,
          oldest_date: "",
          previous_seven_days_total: 0,
        },
      },
    },
    last_updated: "",
  }),
  actions: {
    async fetchSummary({ commit, state }) {
      if (state.summary.testing.latest_value > 0) return;
      const url = `${baseUrl}/summary.json`;
      const data = (await axios.get(url)).data;
      return commit("setSummary", data);
    },
    async fetchLastUpdated({ commit, state }) {
      if (state.last_updated !== "") return;
      const url = `${baseUrl}/last_updated.json`;
      const data = (await axios.get(url)).data;
      return commit("setLastUpdated", data);
    },
  },
  mutations: {
    setSummary(state, summary) {
      state.summary = summary;
    },
    setLastUpdated(state, lastUpdated) {
      state.last_updated = lastUpdated;
    },
  },
};
