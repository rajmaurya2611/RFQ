
export async function getChatbotResponse(message: string, model: string): Promise<string> {

  const endpoint =
    model === "word"
      ? import.meta.env.VITE_WORD_API
      : import.meta.env.VITE_EXCEL_API;

  if (!endpoint) {
    throw new Error("API endpoint is not defined in environment variables.");
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: message }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    throw error;
  }
}
