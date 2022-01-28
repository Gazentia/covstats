export default {
  setLoadingStatus(context, payload) {
    context.commit("setLoadingStatus", {
      data: payload.data,
    });
  },
};
