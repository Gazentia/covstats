export default {
  setErrorData(state, payload) {
    state.errorTitle = payload.errorTitle || null;
    state.errorMessage = payload.errorMessage || null;
  },
};
