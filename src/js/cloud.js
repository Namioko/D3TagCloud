import cloud from 'd3-cloud';
import * as d3 from 'd3';

const initialFontSize = 13;
const fontSizeMultiplier = 5;

let makeCloudLayout = ({data}) => {
    let cloudContainer = document.getElementById('cloud');

    let fill = d3.scaleOrdinal(d3.schemeCategory20);

    let end = (words) => {
        d3.select("#cloud").append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .attr("text-anchor", "middle")
            .attr("onclick", d => `(function(ref) { location.href = ref; })(\'${d.reference}\')`)
            .style("font-size", d => d.size + "px")
            .style("fill", (d, i) => fill(i))
            .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
            .text( d => d.text);
    };

    let layout = cloud().size([cloudContainer.clientWidth, cloudContainer.clientHeight])
        .words(data)
        .fontSize(d => Math.floor(initialFontSize + initialFontSize * d.size * fontSizeMultiplier))
        .padding(5)
        .rotate(0)
        .font("Impact")
        .text(d => d.text)
        .on("end", end);

    layout.start();
};

export default makeCloudLayout;