function extractMulExpressions(text) {
  const regex = /(do\(\)|don't\(\)|mul\((\d+),\s*(\d+)\))/g; // Matches mul(X, Y) format and do or don't
  const matches = [...text.matchAll(regex)];
  let isEnabled = true;
  let results = [];
  let totalSum = 0;

  for (const match of matches) {
    if (match[0] === "do()") {
      isEnabled = true;
    } else if (match[0] === "don't()") {
      isEnabled = false;
    } else if (isEnabled && match[2] !== undefined && match[3] !== undefined) {
      // Extract numbers and compute product
      let X = parseInt(match[2], 10);
      let Y = parseInt(match[3], 10);
      let product = X * Y;

      results.push({ X, Y, product });
      totalSum += product;
    }
  }

  return { results, totalSum };
}
function processText() {
  const text = document.getElementById("textInput").value;
  const { results, totalSum } = extractMulExpressions(text);

  if (results.length === 0) {
    document.getElementById("output").textContent =
      "No mul() expressions found.";
    return;
  }

  let outputText = results
    .map((res) => `mul(${res.X}, ${res.Y}) = ${res.product}`)
    .join("\n");
  outputText += `\n\nTotal sum of products: ${totalSum}`;

  document.getElementById("output").textContent = outputText;
}
