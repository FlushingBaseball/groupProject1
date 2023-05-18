let movieDescription = "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."

// Generate rewritten movie description using Chat GPT 3.5 API
async function rewriteText() {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{role: "user", content: `Rewrite the following as Shakespeare: ${movieDescription} Be concise.`}],
      max_tokens: 50
    })
  })

  // Throw error message if POST request fails
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  // Display rewritten movie description on page
  const data = await response.json()
  document.getElementById('result').textContent = data.choices[0].message.content;
}