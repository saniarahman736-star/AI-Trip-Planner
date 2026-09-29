import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const groq=new Groq({
    apiKey:process.env.GROQ_API_KEY,
});
export const generateItinerary=async({
    destination,days,budget,travellers,travelStyle,itinerary,
})=>{
    const prompt=
    `You are an expert travel planner.

Create a personalized ${days}-day travel itinerary for ${destination}.

Trip details:
- Destination: ${destination}
- Number of days: ${days}
- Budget: ${budget}
- Number of travelers: ${travellers}
- Travel style: ${travelStyle}
-User itinerary preferences:${itinerary || "No specific preferences"}

Use the user itinerary preferences when creating the travel plan

For each day, provide:
1. Morning activity
2. Afternoon activity
3. Evening activity
4. Food recommendations
5. Approximate daily cost

Also provide:
- Recommended areas to stay
- Important travel tips
- Estimated total trip cost

Make sure the itinerary fits the user's budget,number of travellers,travel style and preferences.

Keep the itinerary practical and easy to follow.
`;
const completions=await groq.chat.completions.create({
    messages:[
        {
         role:"user",
         content:prompt
        }
    ],
    model: "openai/gpt-oss-20b",
    temperature:0.7,
});
return completions.choices[0].message.content
}