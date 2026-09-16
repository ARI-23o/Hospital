import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// Window mock utilities for JSDOM testing
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  // Mock scrollTo
  window.scrollTo = () => {};
}

// Global Framer Motion mock for reliable JSDOM rendering
vi.mock("framer-motion", () => {
  const dummyMotion = (Tag) =>
    React.forwardRef((props, ref) => {
      const {
        initial: _initial,
        animate: _animate,
        exit: _exit,
        transition: _transition,
        whileHover: _whileHover,
        whileTap: _whileTap,
        ...rest
      } = props;
      return React.createElement(Tag, { ref, ...rest });
    });

  const motion = new Proxy(
    {},
    {
      get: (_target, prop) => dummyMotion(prop),
    }
  );

  return {
    motion,
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
  };
});
