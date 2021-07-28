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
      const options = { dateStyle: "long" };
      return new Intl.DateTimeFormat("en-GB", options).format(new Date(value));
    },
    daysAgo(value, days = 7) {
      if (!value) return value;
      const d = new Date(value);
      const newDate = d.setDate(d.getDate() - days + 1);
      return this.formatDate(newDate);
    },
  },
};
