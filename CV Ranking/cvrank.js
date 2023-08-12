const fs = require('fs');
const pdfjs = require('pdfjs-dist');
const { JaroWinklerDistance } = require('natural');
const { Console } = require('console');
const { type } = require('os');
let total=0;
// Function to read the contents of a PDF file
async function extractInformationFromPDF(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const loadingTask = pdfjs.getDocument(data);
  const pdfDocument = await loadingTask.promise;

  const extractedText = [];
  for (let i = 1; i <= pdfDocument.numPages; i++) {
    const page = await pdfDocument.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    extractedText.push(pageText);
  }

  return extractedText.join('\n');
}

// Function to read the contents of a JSON file
function readJSON(filePath) {
  const rawData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(rawData);
  return jsonData;
}

function rankMatches(extractedText, jobDescription) {
    const rankedMatches = [];
    for (const key in jobDescription) {
      if (jobDescription.hasOwnProperty(key)) {
        const value = jobDescription[key];
        if (typeof value === 'string') {
            const similarity = JaroWinklerDistance(extractedText.toLowerCase(), value.toLowerCase(), { ignoreCase: true });
            const similarityScale10=Math.trunc(similarity*20);
            rankedMatches.push({ key, similarity:similarityScale10 });
          } else {
            console.warn(`Warning: Value for attribute "${key}" is not a string.`);
          }
      }
    }
    rankedMatches.sort((a, b) => b.similarity - a.similarity);
  
    return rankedMatches;
  }
const pdfFilePath = 'Mahalakshmiresume.pdf';
const jobDescriptionFilePath = 'resume.json';

Promise.all([
  extractInformationFromPDF(pdfFilePath),
  readJSON(jobDescriptionFilePath)
]).then(([extractedText, jobDescription]) => {
  // Rank the extracted information against the job description
  const rankedMatches = rankMatches(extractedText, jobDescription);
  // Display the ranked matches
  console.log('Ranked Matches:');
  rankedMatches.forEach((match, index) => {
    console.log(`${index + 1}. Attribute: ${match.key}, Similarity: ${match.similarity}`);
    total+=match.similarity;
  });
  if(total>60){
    //emailAutomation();
    }
});



