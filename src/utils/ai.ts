import Groq from 'groq-sdk';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

let groq: Groq | null = null;

if (GROQ_API_KEY) {
    groq = new Groq({
        apiKey: GROQ_API_KEY,
        dangerouslyAllowBrowser: true // Required for client-side usage
    });
}

export type AIResponse = {
    text: string;
    action?: {
        type: 'open-app' | 'toggle-setting';
        value: string;
    };
};

const SYSTEM_PROMPT = `
You are an intelligent, witty, and helpful AI assistant built into a web-based operating system (WebOS).
Your name is "Spotlight AI".
You are concise and to the point.
You can perform system actions. If the user asks to open an app or toggle a setting, you should include a JSON action in your response key.
Available Apps: Finder, Safari, Music, Maps, Terminal, Calculator, Notes, Reminders, Photos, Calendar, FaceTime, Preview, Screen Saver.

Format your response as a slightly casual but professional OS assistant.
If you need to perform an action, append a JSON block at the very end of your response like this:
\n\n\`\`\`json
{ "type": "open-app", "value": "music" }
\`\`\`
`;

export const getAIResponse = async (query: string): Promise<AIResponse> => {
    if (!groq) {
        return {
            text: "I need a brain! Please set the VITE_GROQ_API_KEY environment variable to enable my AI features."
        };
    }

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: query }
            ],
            model: "mixtral-8x7b-32768",
            temperature: 0.7,
            max_tokens: 150,
        });

        const content = completion.choices[0]?.message?.content || "I'm not sure what to say.";

        // Parse for actions
        const actionMatch = content.match(/```json\n([\s\S]*?)\n```/);
        let text = content;
        let action;

        if (actionMatch) {
            try {
                action = JSON.parse(actionMatch[1]);
                text = content.replace(actionMatch[0], '').trim();
            } catch (e) {
                console.error("Failed to parse AI action", e);
            }
        }

        return { text, action };

    } catch (error) {
        console.error("Groq API Error:", error);
        return {
            text: "My neural networks are tangled. Please try again later."
        };
    }
};
