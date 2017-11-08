import makeCloudLayout from './cloud';

let request = new XMLHttpRequest();
request.onreadystatechange = () => {
    if (request.readyState === 4) {
        if (request.status === 200) {
            let parser = new DOMParser();
            let tDocument = parser.parseFromString(request.responseText, "text/html");

            let table = tDocument.getElementById("confirmit_agg_table_4");
            table.style.display = 'none';
            let body = document.getElementsByTagName('body')[0];
            body.appendChild(table);

            makeCloudLayout({
                elementFromId: "confirmit_agg_table_4",
                elementToId: 'cloud',
                countId: 1,
                sentimentId: 2,
                clickFunc: () => {
                    alert("hello");
                },
                colorConfig: [
                    {
                        range: [1, 5],
                        color: '#008000'
                    },
                    {
                        range: [-1, 1],
                        color: '#FFED00'
                    },
                    {
                        range: [-5, -1],
                        color: '#FF0000'
                    }
                ]
            });
        }
    }
};

request.open('GET', 't2.html', true);
request.send();