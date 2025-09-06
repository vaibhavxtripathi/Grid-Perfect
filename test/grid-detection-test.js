// Test to verify the improved grid detection algorithm
console.log("Grid Detection Test");
console.log("==================");

const POST_W = 1080;
const POST_H = 1350;

// Test cases for different image dimensions
const testCases = [
  {
    width: 3240,
    height: 1350,
    expected: { columns: 3, rows: 1 },
    description: "3×1 grid",
  },
  {
    width: 2160,
    height: 1350,
    expected: { columns: 2, rows: 1 },
    description: "2×1 grid",
  },
  {
    width: 1080,
    height: 1350,
    expected: { columns: 1, rows: 1 },
    description: "1×1 grid",
  },
  {
    width: 3240,
    height: 2700,
    expected: { columns: 3, rows: 2 },
    description: "3×2 grid",
  },
  {
    width: 2160,
    height: 2700,
    expected: { columns: 2, rows: 2 },
    description: "2×2 grid",
  },
  {
    width: 1080,
    height: 2700,
    expected: { columns: 1, rows: 2 },
    description: "1×2 grid",
  },
  // Test with small variations
  {
    width: 3245,
    height: 1355,
    expected: { columns: 3, rows: 1 },
    description: "3×1 grid with small variation",
  },
  {
    width: 2155,
    height: 1345,
    expected: { columns: 2, rows: 1 },
    description: "2×1 grid with small variation",
  },
];

function detectMuralDimensions(width, height) {
  // Calculate how many 1080x1350 posts fit in the image
  // Use more precise detection with tolerance for small variations
  const columnsFloat = width / POST_W;
  const rowsFloat = height / POST_H;

  // Allow for small variations (within 5% tolerance)
  const columns =
    Math.abs(columnsFloat - Math.round(columnsFloat)) < 0.05
      ? Math.round(columnsFloat)
      : Math.floor(columnsFloat);

  const rows =
    Math.abs(rowsFloat - Math.round(rowsFloat)) < 0.05
      ? Math.round(rowsFloat)
      : Math.floor(rowsFloat);

  return {
    width,
    height,
    columns: Math.max(1, columns),
    rows: Math.max(1, rows),
  };
}

console.log("\nTesting grid detection:");
console.log("========================");

testCases.forEach((testCase, index) => {
  const result = detectMuralDimensions(testCase.width, testCase.height);
  const correct =
    result.columns === testCase.expected.columns &&
    result.rows === testCase.expected.rows;

  console.log(`\nTest ${index + 1}: ${testCase.description}`);
  console.log(`  Input: ${testCase.width}×${testCase.height}px`);
  console.log(
    `  Expected: ${testCase.expected.columns}×${testCase.expected.rows}`
  );
  console.log(`  Detected: ${result.columns}×${result.rows}`);
  console.log(`  Result: ${correct ? "✓" : "✗"}`);

  if (!correct) {
    console.log(
      `  Columns: ${testCase.width} / ${POST_W} = ${(
        testCase.width / POST_W
      ).toFixed(3)}`
    );
    console.log(
      `  Rows: ${testCase.height} / ${POST_H} = ${(
        testCase.height / POST_H
      ).toFixed(3)}`
    );
  }
});

console.log("\nGrid detection test complete!");
