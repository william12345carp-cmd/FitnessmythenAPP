/* [4] Analytics — Mock. */

export const analyticsService = {
  /** TODO: Analytics-Provider anbinden (Entscheidung liegt beim Gründer). */
  track(event, props) {
    // eslint-disable-next-line no-console
    console.log("[analytics:mock]", event, props || {});
  },
};
