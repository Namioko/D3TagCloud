let tableId = "confirmit_agg_table_4";
let request = new XMLHttpRequest();
request.onreadystatechange = () => {
    if (request.readyState === 4) {
        if (request.status === 200) {
            const parser = new DOMParser();
            const tDocument = parser.parseFromString(request.responseText, "text/html");

            const table = tDocument.getElementById(tableId);
            table.style.display = 'none';
            const body = document.getElementsByTagName('body')[0];
            body.appendChild(table);

            const data = takeDataFromTable({
                elementId: tableId,
                countId: 1,
                // sentimentId: 2
            });
            const selectContainer = document.createElement('div');
            selectContainer.id = 'exceptions';
            const select = document.createElement('select');
            select.setAttribute('multiple', 'true');
            data.forEach((item, index) => {
                const option = document.createElement('option');
                option.text = item.text.toUpperCase();
                select.add(option, index);
            });
            selectContainer.appendChild(select);
            body.appendChild(selectContainer);

            const {restart: restartCloud} = makeCloudLayout({
                elementFromId: tableId,
                elementToId: "cloud",
                exceptionsFromId: "exceptions",
                countId: 1,
                // sentimentId: 2,
                clickFunc: () => {
                    alert("hello");
                },
                // colorConfig: {
                //     limiters: [-5, -1, 1, 5],
                //     colors: ['#FF0000', '#FFED00', '#008000']
                // }
            });

            const applyButton = document.createElement('button');
            applyButton.innerText = 'Apply';
            applyButton.style.marginLeft = '10px';
            applyButton.onclick = () => {
                restartCloud();
            };
            body.appendChild(applyButton);
        }
    }
};

request.open('GET', 't2.html', true);
request.send();