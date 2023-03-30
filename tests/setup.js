import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import crypto, { randomFillSync } from "crypto";

Object.defineProperty(global.self, "crypto", {
  value: {
    subtle: crypto.webcrypto.subtle,
    getRandomValues: randomFillSync,
  },
});

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
