let takeDataFromTable = ({elementId, countId, sentimentId}) => {
    let data = [];

    let minCount;
    let maxCount = -1;

    let element = document.getElementById(elementId);
    let tableBody = element.children[1];

    for (let i = 0; i < tableBody.children.length; i++) {
        let row = tableBody.children[i]; //row = tr
        let element = {};

        let a = row.children[0].getElementsByTagName('a')[0]; //tr -> td -> a
        element.text = a.innerText;

        element.count = parseInt(row.children[countId].innerText);
        element.sentiment = parseFloat(row.children[sentimentId].innerText);

        if (isNaN(element.count) || isNaN(element.sentiment) || element.count === 0) { //if row doesn't have any data
            continue;
        }

        if (minCount === undefined || minCount > element.count) {
            minCount = element.count;
        }
        if (maxCount < element.count) {
            maxCount = element.count;
        }

        data.push(element);
    }

    data.forEach(element => {
        element.ratio = element.count * minCount / maxCount;
    });

    return data;
};

export default takeDataFromTable;