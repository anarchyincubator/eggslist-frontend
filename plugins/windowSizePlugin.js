import throttle from "lodash.throttle";

export default ({ store }) => {
  store.commit("changeWindowSize", {
    windowWidth: window.innerWidth,
  });

  const handleResize = ({ target }) => {
    store.commit("changeWindowSize", {
      windowWidth: target.innerWidth,
    });
  };

  window.addEventListener("resize", handleResize);
};
