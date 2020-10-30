export const mockIntersectionObserver = () => {
  class IntersectionObserver {
    observe = () => null;
    unobserve = () => null;
  }
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: IntersectionObserver
  });
  Object.defineProperty(global, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: IntersectionObserver
  });
};
