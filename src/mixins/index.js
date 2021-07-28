export default {
  props: {
    data: Object,
  },
  methods: {
    compareText(value) {
      if (value > 0) return "an increase";
      if (value < 0) return "a decrease";
      return "no change";
    },
    formatDate(value) {
      if (!value) return value;
      return new Date(value).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
    daysAgo(value, days = 7) {
      if (!value) return value;
      const d = new Date(value);
      const newDate = d.setDate(d.getDate() - days);
      return this.formatDate(newDate);
    },
  },
};
