import { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";

export default function useGetStory() {
    //Set up connection with OpenAI
    const configuration = new Configuration({
        apiKey: import.meta.env.VITE_API_KEY,
    });
    delete configuration.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(configuration);

    //API-related state setup
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const fetchStory = async (prompt) => {
        setIsLoading(true);
        try {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a skilled storyteller, adept at weaving tales based on user input." },
                    { role: "user", content: prompt }
                ],
            });
            setData(response); //change back to jsonData
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };
    return { data, isLoading, error, fetchStory };
}

