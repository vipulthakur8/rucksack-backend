
const crypto = require('crypto');

function randomSevenDigitGen() {
    const randomNumber = crypto.randomBytes(4).readUInt32LE(0);

    // Convert the random number to a 7-digit string
    const formattedRandomNumber = randomNumber.toString().padStart(7, '0');

    return formattedRandomNumber;
}

module.exports = randomSevenDigitGen;