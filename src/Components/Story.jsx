import { useEffect, useState } from "react"

function Story({ text }) {
    
    function getParsedText(text) {
        const start = text.indexOf("{{"); // Find the starting index of the double curly brackets
        const end = text.indexOf("}}", start); // Find the ending index of the double curly brackets, starting from the start index
        const title = text.slice(start + 2, end).trim(); // Get the text inside the double curly brackets, trimming any whitespace
        const body = text.slice(end + 2, text.length).trim();
        return [title, body]
    }
    const [storyData, setStoryData] = useState('')

    useEffect(() => {
        if (text) {
            setStoryData(getParsedText(text))
        }
    }, [text])
    return (
        <>
            {storyData === "" ? (
                <></>
            ) : (
                <div className="story-container">
                    <h1 className="story-header">{storyData[0]}</h1>
                    <p className="story-body">{storyData[1]}</p>
                </div>
            )}
        </>
    );
}

export default Story

