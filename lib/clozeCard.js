//text is full text of the clozecard
//clozeDeletion is the portion of the card we want to hide
function clozeCard(text, clozeDeletion) {

	//this code allows us to optionally create clozecards without using the new keyword
	if (!(this instanceof clozeCard)) {
		return new clozeCard()
	}

	//holds [start, end] positions for clozedeletion
	var clozePositions = clozeDelete(text, clozeDeletion);
	//builds complete text...e.g. input text without cloze deletion
	this.complete = getComplete(text, clozePositions);
	//saves the cloze deleted text for later display
	this.partial = text.slice(clozePositions[0], clozePositions[1])
	//pseudo-private functions, purposefully not on the prototype
	function getComplete(text, clozePositions) {
		var start = text.slice(0, clozePositions[0]);
		var end = text.slice(clozePositions[1], text.length);

		return start + "..." + end;
	}
	//find where cloze deletion begins in text

	//remove cloze range

	//return ellipsized version


}

function clozeDelete(text, clozeDeletion) {
	var start = text.indexOf(clozeDeletion);

	if (start !== -1) {
		return [start, start + clozeDeletion.length];
	}

	throw new Error("Cloze dleetion not found in input text");
}

clozeCard.prototype.displayCard = function displayCard() {
	return this.complete.replace(/\.\.\./, "'" + this.partial + "'");
}

module.exports = clozeCard;