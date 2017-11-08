import cloud from 'd3-cloud';
import * as d3 from 'd3';
import takeDataFromTable from "./data";

const initialFontSize = 13;
const fontSizeMultiplier = 5;

let makeCloudLayout = ({elementFromId, elementToId, countId, sentimentId, clickFunc, colorConfig}) => {
    let data = takeDataFromTable({elementId: elementFromId, countId, sentimentId});

    let end = (words) => {
        d3.select("#cloud").append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .attr("class", "tag")
            .attr("text-anchor", "middle")
            // .attr("onclick", d => `(${clickFunc})()`)
            .style("font-size", d => d.size + "px")
            .style("fill", d => {
                for(let i = 0; i < colorConfig.length; i++) {
                    if(d.sentiment >= colorConfig[i].range[0] && d.sentiment <= colorConfig[i].range[1]) {
                        return colorConfig[i].color;
                    }
                }
            })
            .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
            .text(d => d.text);
    };

    let cloudContainer = document.getElementById(elementToId);
    let layout = cloud().size([cloudContainer.clientWidth, cloudContainer.clientHeight])
        .words(data)
        .fontSize(d => Math.floor(initialFontSize + initialFontSize * d.size * fontSizeMultiplier))
        .padding(5)
        .rotate(0)
        .font("Impact")
        .text(d => d.text)
        .on("end", end);

    layout.start();

    let tags = document.getElementsByClassName('tag');
    for(let i = 0; i < tags.length; i++) {
        tags[i].onclick = clickFunc;
    }
};

export default makeCloudLayout;