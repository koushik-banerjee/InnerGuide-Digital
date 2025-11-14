import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a compassionate and supportive mental health assistant designed to help college students. Your role is to:

1. Provide empathetic listening and validation
2. Offer evidence-based coping strategies for common stressors (academic pressure, anxiety, depression, loneliness, etc.)
3. Provide psychoeducational information about mental health
4. Encourage healthy habits (sleep, exercise, social connection)
5. Recognize crisis situations and appropriately refer to professional help
6. Maintain confidentiality and non-judgmental responses
7. Use simple, clear language appropriate for college students

IMPORTANT CRISIS PROTOCOL:
If the user mentions:
- Suicidal ideation or self-harm
- Severe depression or anxiety requiring immediate help
- Acute substance abuse
- Other emergency situations

ALWAYS respond with:
1. Validation of their feelings
2. Clear recommendation to contact emergency services: "I'm concerned about your safety. Please contact emergency services immediately (911 in the US) or reach out to a crisis counselor."
3. Provide crisis resources:
   - National Suicide Prevention Lifeline: 1-800-273-8255
   - Crisis Text Line: Text HOME to 741741
   - International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

For non-emergency concerns, offer to connect them with on-campus counseling services.

Be warm, professional, and evidence-based in all responses.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const { text } = await generateText({
      model: 'openai/gpt-4o-mini',
      system: SYSTEM_PROMPT,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
      maxTokens: 1024,
    });

    return NextResponse.json(
      {
        role: 'assistant',
        content: text,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
