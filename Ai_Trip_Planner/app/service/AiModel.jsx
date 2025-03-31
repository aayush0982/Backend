export async function generateTravelPlan(aiPrompt) {
    try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        const requestBody = {
            model: "gemini-2.0-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `${aiPrompt} with ruppees currency. The response must be a **well-structured JSON object** following this format:

{
  "trip_summary": {
    "destination": "Las Vegas",
    "duration": "3 days",
    "budget_level": "cheap",
    "total_estimated_cost": "$1000"
  },
  "hotels": [
    {
      "name": "Excalibur Hotel & Casino",
      "address": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
      "price_per_night": "$45",
      "image_url": "https://example.com/hotel.jpg",
      "geo_coordinates": {
        "latitude": 36.0987,
        "longitude": -115.176
      },
      "rating": 4.2,
      "description": "A budget-friendly castle-themed hotel on the Las Vegas Strip."
    }
  ],
  "itinerary": {
    "day_1": {
      "morning": {
        "place_name": "Welcome to Las Vegas Sign",
        "details": "Start your trip with a photo at the famous Las Vegas sign.",
        "image_url": "https://example.com/vegas_sign.jpg",
        "geo_coordinates": {
          "latitude": 36.0822,
          "longitude": -115.172
        },
        "ticket_pricing": "Free",
        "rating": 4.8,
        "travel_time": "10 mins from hotel",
        "best_time_to_visit": "8 AM - 10 AM"
      }
    }
  }
}

💡 **Important Instructions:**
- Ensure the JSON is **properly formatted** and **valid** (no markdown, no backticks).
- Avoid unnecessary text. **Only return the JSON object**.
- Each location should include **name, details, image, coordinates, ticket price, rating, and travel time**.
- Provide at least **3 hotel options** and **3-day itineraries** with **morning, afternoon, and evening plans**.`
                        }
                    ]
                }
            ]
        };

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            }
        );

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Extracting response text from AI output
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // Remove any markdown formatting if AI mistakenly adds it
        const cleanedText = responseText.replace(/```json|```/g, "").trim();

        // Convert AI text response into JSON
        const jsonResponse = JSON.parse(cleanedText);
        return jsonResponse;
        // console.log(jsonResponse); 
    } catch (error) {
        console.error("Error fetching or parsing travel plan:", error);
    }
}