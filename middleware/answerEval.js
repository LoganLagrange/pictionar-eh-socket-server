function checkForWinningPhrase(inboundString, randomlySelectedWord) {
    // Split the inbound string into individual words
    const words = inboundString.split(' ');
    
    // Create an array of word pairs
    const wordPairs = words.slice(0, -1).map((word, index) => `${word} ${words[index + 1]}`);
    
    // Check if any word pair or individual word matches the randomlySelectedWord
    return wordPairs.some(pair => pair === randomlySelectedWord) || words.some(word => word === randomlySelectedWord);
}

// // Example usage
// const inboundStringWithPair = "This is a test string";
// const randomlySelectedWordPair = "test string";
// const resultWithPair = checkForWinningPhrase(inboundStringWithPair, randomlySelectedWordPair);
// console.log(resultWithPair);  // Output will be true

// const inboundStringSingleWord = "This is another test";
// const randomlySelectedWordSingle = "test";
// const resultSingleWord = checkForWinningPhrase(inboundStringSingleWord, randomlySelectedWordSingle);
// console.log(resultSingleWord);  // Output will be true