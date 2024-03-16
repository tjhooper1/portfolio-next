import { OpenAI } from "openai";
import { readFileSync } from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extract the prompt from the request body
    const { messages: requestMessages } = req.body;
    // Assuming you have your OpenAI API key stored in your environment variables
    const OPENAI_KEY = process.env.OPENAI_KEY;
    const openai = new OpenAI({ apiKey: OPENAI_KEY });

    const filePath = path.join(process.cwd(), "app", "tom.txt");
    const initialPrompt = readFileSync(filePath, "utf-8");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: initialPrompt,
          },
          ...requestMessages,
        ],
        max_tokens: 150,
      });
      console.log({ response });
      const data = await response.choices[0];
      console.log("IN API", { data });

      // Send the response from OpenAI back to the client
      res.status(200).json({ success: true, response: data });
    } catch (error) {
      console.error("OpenAI API request failed:", error);
      res
        .status(500)
        .json({ success: false, error: "OpenAI API request failed" });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
