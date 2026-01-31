export async function predictCategory(text: string) {
  const res = await fetch("https://consumer-nlp-project.onrender.com/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) {
    throw new Error("API error")
  }

  return res.json()
}
