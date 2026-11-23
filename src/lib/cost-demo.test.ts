import { test } from "node:test";
import assert from "node:assert/strict";
import { costPeriods, formatAmount, formatChange, getCostSnapshot, type Comparison } from "./cost-demo";

test("October totals and changes derive from the same monthly costs", () => {
  const snapshot = getCostSnapshot("Oktober 2026", "MoM");
  assert.equal(snapshot.total, 18.42);
  assert.equal(snapshot.ytd, 176.8);
  assert.equal(formatChange(snapshot.mom), "+4,8%");
  assert.equal(formatChange(snapshot.yoy), "+2,1%");
  assert.equal(snapshot.actual.at(-1), snapshot.total);
  assert.equal(snapshot.baseline.at(-1), 17.58);
});

test("period and comparison controls change the series without future months", () => {
  for (const period of costPeriods) {
    for (const comparison of ["MoM", "YoY", "YTD"] as Comparison[]) {
      const snapshot = getCostSnapshot(period, comparison);
      assert.equal(snapshot.labels.length, snapshot.actual.length);
      assert.equal(snapshot.labels.length, snapshot.baseline.length);
      assert.ok(snapshot.actual.every(Number.isFinite));
      assert.ok(snapshot.baseline.every(Number.isFinite));
      assert.ok(!snapshot.labels.includes("Nov") && !snapshot.labels.includes("Des"));
      if (comparison === "YTD") assert.equal(snapshot.actual.at(-1), snapshot.ytd);
    }
  }
  const september = getCostSnapshot("September 2026", "MoM");
  assert.equal(september.total, 17.58);
  assert.equal(september.labels.at(-1), "Sep");
  assert.ok(!september.labels.includes("Okt"));
  assert.notDeepEqual(getCostSnapshot("Oktober 2026", "MoM").baseline, getCostSnapshot("Oktober 2026", "YoY").baseline);
});

test("Indonesian numeric formatting preserves negative values and zero", () => {
  assert.equal(formatAmount(286400000), "286.400.000");
  assert.equal(formatAmount(-94), "-94");
  assert.equal(formatChange(0), "0%");
  assert.equal(formatChange(-2.14), "-2,1%");
});
