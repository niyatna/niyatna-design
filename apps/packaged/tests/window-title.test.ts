import { describe, expect, it } from "vitest";

import { resolvePackagedWindowTitle } from "../src/window-title.js";

describe("resolvePackagedWindowTitle", () => {
  it("uses an explicit packaged product name ahead of release-channel defaults", () => {
    expect(resolvePackagedWindowTitle({
      appVersion: "0.18.1",
      namespace: "open-open-design",
      productName: "Open Open Design",
    })).toBe("Open Open Design");
  });

  it("keeps stable windows on the public product name", () => {
    expect(resolvePackagedWindowTitle({ appVersion: "0.10.0", namespace: "release-stable-win" })).toBe("Open Design");
  });

  it("uses channel product names for non-stable release versions", () => {
    expect(resolvePackagedWindowTitle({ appVersion: "0.10.0-beta.1", namespace: "release-beta-win" })).toBe("Open Design Beta");
    expect(resolvePackagedWindowTitle({ appVersion: "0.10.0-prerelease.1", namespace: "release-prerelease-win" })).toBe("Open Design Prerelease");
    expect(resolvePackagedWindowTitle({ appVersion: "0.10.0-preview.1", namespace: "release-preview-win" })).toBe("Open Design Preview");
  });

  it("falls back to official release namespaces when app version is unavailable", () => {
    expect(resolvePackagedWindowTitle({ appVersion: null, namespace: "release-beta-win" })).toBe("Open Design Beta");
    expect(resolvePackagedWindowTitle({ appVersion: null, namespace: "release-prerelease-win" })).toBe("Open Design Prerelease");
    expect(resolvePackagedWindowTitle({ appVersion: null, namespace: "release-preview-win" })).toBe("Open Design Preview");
  });

  it("keeps ad hoc namespaces on the default window title", () => {
    expect(resolvePackagedWindowTitle({ appVersion: null, namespace: "beta-local-flow" })).toBe("Open Design");
  });
});
