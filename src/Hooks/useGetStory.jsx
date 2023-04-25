import { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";

export default function useGetStory() {
    //Set up connection with OpenAI - this is all found on the openAi documentation:
    //https://platform.openai.com/docs/api-reference/authentication
    const configuration = new Configuration({
        apiKey: import.meta.env.VITE_API_KEY,
    });

    //OpenAI doesn't like it when we send requests from the frontend - so we're gonna be a little naughty and delete the safeguard for that
    delete configuration.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(configuration);

    //API-related state setup - will condense these all together in return statement for easy state management outside of
    //this hook
    
    //This is where all ChatGPT responses will be stored
    const [data, setData] = useState(null);

    //This will be set to true while we're waiting for a response from chatgpt and back to false when we get a response
    const [isLoading, setIsLoading] = useState(false);

    //If we run into any errors it will be set here
    const [error, setError] = useState(null);

    //A callback function that calls the gpt-3.5-turbo (same model as chatgpt) with our prompt
    //and manages state
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

    //return all of our states and, most importantly, the function that actually calls chatGPT
    return { data, isLoading, error, fetchStory };
}

