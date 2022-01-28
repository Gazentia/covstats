export default {
  setFilterData(context, payload) {
    context.commit("setFilterData", {
      data: payload.data,
    });
  },
};
