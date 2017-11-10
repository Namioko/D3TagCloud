import cloud from 'd3-cloud';
import * as d3 from 'd3';
import takeDataFromTable from './data';

let makeCloudLayout = ({elementFromId, elementToId, countId, sentimentId, clickFunc, colorConfig, initialFontSize, fontSizeMultiplier}) => {
    let data = takeDataFromTable({elementId: elementFromId, countId, sentimentId});

    let fill = d3.scaleOrdinal(d3.schemeCategory10);

    let end = (words) => {
        d3.select('#cloud').append('svg')
            .attr('width', layout.size()[0])
            .attr('height', layout.size()[1])
            .append('g')
            .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
            .selectAll('text')
            .data(words)
            .enter().append('text')
            .attr('class', 'tag')
            .attr('text-anchor', 'middle')
            .style('font-size', d => d.size + 'px')
            .style('fill', d => {
                if (colorConfig !== undefined) {
                    return colorConfig.find(element => {
                        if (d.sentiment >= element.range[0] && d.sentiment <= element.range[1]) {
                            return true;
                        }
                    }).color;
                } else {
                    return fill(d.ratio);
                }
            })
            .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
            .text(d => d.text);
    };

    let cloudContainer = document.getElementById(elementToId);

    let layout = cloud().size([cloudContainer.clientWidth, cloudContainer.clientHeight])
        .words(data)
        .fontSize(d => Math.floor(initialFontSize + initialFontSize * d.ratio * fontSizeMultiplier))
        .padding(5)
        .rotate(0)
        .font('Impact')
        .text(d => d.text)
        .on('end', end);

    layout.start();

    let tags = Array.from(document.getElementsByClassName('tag'));
    tags.forEach(element => {
        element.onclick = clickFunc;
    });
};

export default makeCloudLayout;