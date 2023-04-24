export const generatePrompt = ({ firstName, occupation, funFact, storyGenre, famousAuthor }) => {
    // Check if there is an author that the user inputted with ternary operator
    const basePrompt = `Generate an interesting, brief (<100 words), and well-written ${storyGenre} short story about a person named ${firstName} who works as a(n) ${occupation}. An interesting fact about ${firstName}: ${funFact}.` 
                        + (famousAuthor.trim().length !== 0 ? ` Write the story in the style of ${famousAuthor}. If you don't know ${famousAuthor} ignore this last instruction.` : ``) + "Lastly, make a name for this story and enclose it in double curly brackets";
    return basePrompt;
}