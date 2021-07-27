import axios from "axios";

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
  }),
  actions: {
    async fetchSummary({ commit, state }) {
      if (state.summary.testing.latest_value > 0) return;
      const baseUrl =
        "https://malaysia-coronavirus-default-rtdb.asia-southeast1.firebasedatabase.app";
      const url = `${baseUrl}/summary.json`;
      const data = (await axios.get(url)).data;
      return commit("setSummary", data);
    },
  },
  mutations: {
    setSummary(state, summary) {
      state.summary = summary;
    },
  },
};
