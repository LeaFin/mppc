var storage = new Array();

function getWord(index) {
    if (storage[index] !== undefined && storage[index + 1] !== undefined) {
        return storage[index] + storage[index + 1];
    } else {
        return "0000000000000000";
    }
}

function saveWord(index, word) {
    storage[index] = word.substr(0,8);
    storage[index + 1] = word.substr(8, 8);
}