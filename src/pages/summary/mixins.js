export default {
  methods: {
    compareText(value) {
      if (value > 0) return "an increase";
      if (value < 0) return "a decrease";
      return "no change";
    },
  },
  computed: {
    testing() {
      return {
        latestValue: 1013261,
        latestDate: "22 July 2021",
        changePercentage: -4.9,
        betweenDate: "16 July 2021",
        betweetValue: 6813085,
      };
    },
    cases() {
      return {
        latestValue: 31795,
        latestDate: "24 July 2021",
        changePercentage: -4.5,
        betweenDate: "18 July 2021",
        betweetValue: 286863,
      };
    },
    vaccinations() {
      return {
        first: 46519998,
        second: 36953691,
        latestDate: "23 July 2021",
      };
    },
    healthcare() {
      return {};
    },
    deaths() {
      return {};
    },
  },
};
