import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const response = await openai.responses.create({
      model: "gpt-5",
      input: "Say 'Deal Beater is connected!'",
    });

    return Response.json({
      success: true,
      output: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      error: "OpenAI connection failed",
    });
  }
}