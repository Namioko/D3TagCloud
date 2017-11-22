let takeDataFromTable = ({elementId, countId, sentimentId}) => {
    let data = [];

    let minCount;
    let maxCount = -1;

    let element = document.getElementById(elementId);
    let tableBody = element.children[1];

    for (let i = 0; i < tableBody.children.length; i++) {
        let row = tableBody.children[i]; //row = tr
        let element = {};

        element.text = row.children[0].innerText;

        element.count = parseInt(row.children[countId].innerText);
        if (sentimentId !== undefined) {
            element.sentiment = parseFloat(row.children[sentimentId].innerText);
        }

        //if row doesn't have any data
        if (isNaN(element.count) || sentimentId !== undefined && isNaN(element.sentiment) || element.count === 0) {
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