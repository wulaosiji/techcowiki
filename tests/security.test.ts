import { describe, expect, test } from "vitest";
import { scriptJson } from "../src/lib/json";

describe("JSON-LD script serialization", () => {
  test.each(["</script><script>alert(1)</script>", "</ScRiPt >", "<!--", "台积电 & NVIDIA"])(
    "round-trips data without breaking out of its script: %s", (value) => {
      const json = scriptJson({ value });
      expect(json).not.toContain("<");
      expect(JSON.parse(json)).toEqual({ value });
    },
  );
});
