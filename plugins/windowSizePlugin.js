import throttle from "lodash.throttle";

export default ({ store }) => {
  store.commit("changeWindowSize", {
    windowWidth: window.innerWidth,
  });

  const handleResize = throttle(({ target }) => {
    store.commit("changeWindowSize", {
      windowWidth: target.innerWidth,
    });
  }, 100);

  window.addEventListener("resize", handleResize);
};
