function leftPartition(fullRhythm) {

    let length = fullRhythm.length;
    let half = Math.floor(length / 2);

    const newArray = new Array(length).fill(0);

    for (let i = 0; i < half; i++) {

        newArray[i] = fullRhythm[i];

        let remainingIndices = half - i;

        if (newArray[i] > remainingIndices) {

            newArray[i] = remainingIndices;
        }
    }

    return newArray;
}

function rightPartition(fullRhythm) {

    let length = fullRhythm.length;
    let offset = Math.floor(length / 2);

    const newArray = new Array(length).fill(0);

    for (let i = 0; i < offset; i++) {
        newArray[offset + i] = fullRhythm[i];
    }

    for (let i = offset; i < length; i++) {

        let remainingIndices = length - i;

        if (newArray[i] > remainingIndices) {
            newArray[i] = remainingIndices;
        }
    }

    return newArray;
}



 function deepCopyMap(originalMap) {
    const newMap = new Map();

    for (const [key, value] of originalMap) {
        // If the value is an array, create a new array with the same elements
        newMap.set(key, Array.isArray(value) ? [...value] : value);
    }

    return newMap;
}



let piano1 = [16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];



console.log(rightPartition(piano1))