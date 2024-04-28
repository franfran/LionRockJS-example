"use strict";

(fn => document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn))(() => {
  const scrollPanes = document.querySelectorAll('.sync-scroll-x');
  scrollPanes.forEach(el => {
    el.addEventListener('scroll', evt => {
      scrollPanes.forEach(ele => {
        if (ele.scrollLeft === el.scrollLeft) return;
        ele.scrollLeft = el.scrollLeft;
      });
    });
  });
});
//# sourceMappingURL=ocgraph-series.js.map