import cloud from 'd3-cloud';
import * as d3 from 'd3';

const initialFontSize = 13;
const fontSizeMultiplier = 5;

let makeCloudLayout = ({data}) => {
    let cloudContainer = document.getElementById('cloud');

    let fill = d3.scaleOrdinal(d3.schemeCategory20);

    let layout = cloud().size([cloudContainer.clientWidth, cloudContainer.clientHeight])
        .words(data)
        .fontSize(function (d) {
            return Math.floor(initialFontSize + initialFontSize * d.size * fontSizeMultiplier);
        })
        .padding(5)
        .rotate(0)
        .font("Impact")
        .text(function(d) { return d.text; })
        .on("end", end);

    layout.start();

    function end(words) {
        d3.select("#cloud").append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .attr("text-anchor", "middle")
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .style("fill", function (d, i) {
                return fill(i);
            })
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) {
                return d.text;
            });
    }
};

export default makeCloudLayout;