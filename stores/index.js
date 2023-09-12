import { InvoiceModal } from "#build/components";
import { createStore } from "vuex";

export default createStore({
  state() {
    InvoiceModal: null;
  },
  mutations: {
    toggle_invoice(state) {
      state.InvoiceModal = !state.InvoiceModal;
    },
  },
  actions: {},
});
