function takeDataFromTable({document}) {
    let data = [];

    let minCount;
    let maxCount = 0; //if count is positive

    let tableBody = document.getElementsByTagName('tbody')[0];
    for (let i = 0; i < tableBody.children.length; i++) {
        let row = tableBody.children[i]; //row = tr
        let element = {};

        let a = row.children[0].getElementsByTagName('a')[0]; //tr -> td -> a
        element.text = a.innerText;
        element.reference = a.href;

        //for t.html
        // element.sentiment = parseFloat(row.children[1].innerText);
        // element.count = parseInt(row.children[3].innerText);
        //for t2.html
        element.count = parseInt(row.children[1].innerText);
        element.sentiment = parseFloat(row.children[2].innerText);

        if(isNaN(element.count) || isNaN(element.sentiment)) { //if row doesn't have any data
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
        element.size = element.count * minCount / maxCount;
    });

    return data;
}

export default takeDataFromTable;