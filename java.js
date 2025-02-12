function extractMulExpressions(text) {
  const regex = /mul\((\d+),\s*(\d+)\)/g; // Matches mul(X, Y) format
  const matches = [...text.matchAll(regex)];

  const results = matches.map((match) => ({
    X: parseInt(match[1], 10),
    Y: parseInt(match[2], 10),
    product: parseInt(match[1], 10) * parseInt(match[2], 10), // Multiplication calculation
  }));

  const totalSum = results.reduce((sum, item) => sum + item.product, 0);

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
