//For a given document determine if a given ransom note can be produced from it.

//So, I'll need to know if the words of the ransom note can be found in the words of the document,
// and at the right quatities.  What if I was just counting letters?  I would spin through the whole string
// and store a count against each character, then I do the same for the word I want to create from those letters
// and I would check the one is wholey contained within the other.
let fs = require('fs');
let document = fs.readFileSync('document.txt');
let ransom = "give 21 Sterling if the game is not lost or grim Harry will be shot"
let ransom2 = "give 21 Sterling if the game is not lost or if grim Harry scores he will be shot"

function createWordMap(doc) {
    var map = new Map();
    //split the document up into a list of words
    wordArray = doc.toString().split(/[\W]+/);
    //spin through list adding to map or incrementing count
    for (let x = 0; x < wordArray.length; x++) {
        var match = map.get(wordArray[x]);
        if (match) {
            match++;
        } else {
            match = 1;
        }
        if (wordArray[x] !== '') {
            map.set(wordArray[x], match);
        }
    }
    return map;
}

function checkRansom(ransom, document) {
    ransomMap = createWordMap(ransom);
    documentMap = createWordMap(document);
    //ensure ransom is entirely enclosed by document, ransom is shorter so use that
    var result = true;
    ransomMap.forEach((value, key, map) => {
        let match = documentMap.get(key);
        //console.log(`${value}:${key}:${map.size}:${match}`);
        if ((!match) || (match < value)) {
            console.log(`word not found in documemnt:${key} (required count:${value};found count:${match})`);
            result = false;
        }
    });
    //all words found and found surplus to requirement
    return result;
}

console.log(ransom);
var result = checkRansom(ransom, document);
console.log(`result = ${result}`);
console.log(ransom2);
var result = checkRansom(ransom2, document);
console.log(`result = ${result}`);

//This spins through document and ransom note and then ransome note again, 
//but ransom note is much smaller than document, so this scales at size of document O(d)
//A slight improvement might be to create my lookup of word quantities in ransom and then walk
//through document counting up words until I know I can do it (so stop) or I've reached end.
//Or I could filter document for words in ransom and then work on that list (more work, but might be nicer code)
//or perhaps when I am walking thtough the ransom I could skip words that don't start with start letters of my
//ransome words (or some other similar method to skip large chunks)
//also note this implementation is case sensitive - for balckmailers who care about capitalisation.  |:-)