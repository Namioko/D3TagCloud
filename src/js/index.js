import takeDataFromTable from './data';
import makeCloudLayout from './cloud';

let request = new XMLHttpRequest();
request.onreadystatechange = () => {
    if (request.readyState === 4)
        if (request.status === 200) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(request.responseText, "text/html");

            let data = takeDataFromTable({document: doc});

            makeCloudLayout({data, leftLimit: -1, rightLimit: 1})
        }
};
request.open('GET', 't2.html', true);
request.send();