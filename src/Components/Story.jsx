import { useEffect, useState } from "react"

function Story({ text }) {
    
    //In our instructions to ChatGPT we ask it to enclose a title inside of {{}}
    //This function parses for our title and the story body so we can style them differently in this component
    //The function returns these pieces of data as an object with the appropriate names for intuitive object rendering
    function getParsedText(text) {
        const start = text.indexOf("{{"); // Find the starting index of the double curly brackets
        const end = text.indexOf("}}", start); // Find the ending index of the double curly brackets, starting from the start index
        const title = text.slice(start + 2, end).trim(); // Get the text inside the double curly brackets, trimming any whitespace
        const body = text.slice(0, start) + text.slice(end + 2)
        return {
            title: title,
            body: body
        }
    }
    const [storyData, setStoryData] = useState('')

    //By default our story is blank while we're waiting for ChatGPT to get back to us,
    //When we finally get a response, we'll parse it into title and body using the function above
    //And render it using conditional rendering
    useEffect(() => {
        if (text) {
            setStoryData(getParsedText(text))
        }
    }, [text])
    return (
        // When storyData is blank (i.e. we haven't asked/gotten data back from ChatGPT yet - render nothing)
        // When we actually have data to render (storyData!==''), render a div with an h1 + p tag with the respective text inside 
        <>
            {storyData === "" ? (
                <></>
            ) : (
                <div className="story-container">
                    <h1 className="story-header">{storyData.title}</h1>
                    <p className="story-body">{storyData.body}</p>
                </div>
            )}
        </>
    );
}

export default Story

