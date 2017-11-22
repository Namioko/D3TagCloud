import makeCloudLayout from './cloud';

let request = new XMLHttpRequest();
request.onreadystatechange = () => {
    if (request.readyState === 4) {
        if (request.status === 200) {
            let parser = new DOMParser();
            let tDocument = parser.parseFromString(request.responseText, "text/html");

            let table = tDocument.getElementById("confirmit_agg_table");
            table.style.display = 'none';
            let body = document.getElementsByTagName('body')[0];
            body.appendChild(table);

            makeCloudLayout({
                elementFromId: "confirmit_agg_table",
                elementToId: 'cloud',
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
        }
    }
};

request.open('GET', 't3.html', true);
request.send();