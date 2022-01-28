export default {
  setError(context, payload) {
    context.commit("setErrorData", {
      errorTitle: payload.errorTitle,
      errorMessage: payload.errorMessage,
    });
  },
  resetError(context) {
    context.dispatch("setError", {
      errorTitle: null,
      errorMessage: null,
    });
  },
};
