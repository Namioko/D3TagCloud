import cloud from 'd3-cloud';
import * as d3 from 'd3';
import takeDataFromTable from './data';

const fontSize = {
    min: 13,
    max: 40
};

const makeCloudLayout = ({elementFromId, elementToId, countId, sentimentId, clickFunc, colorConfig}) => {
    let data = takeDataFromTable({elementId: elementFromId, countId, sentimentId});

    let fill = d3.scaleOrdinal(d3.schemeCategory10);
    let size = d3.scaleLinear()
        .domain([0, 1])
        .range([fontSize.min, fontSize.max]);

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
                    let index = colorConfig.limiters.findIndex((limiter, index, limiters) => {
                        return index < limiters.length - 1 && d.sentiment >= limiter && d.sentiment <= limiters[index + 1];
                    });
                    return colorConfig.colors[index];
                } else {
                    return fill(d.ratio);
                }
            })
            .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
            .text(d => d.text);
    };

    const cloudContainer = document.getElementById(elementToId);

    let layout = cloud().size([cloudContainer.clientWidth, cloudContainer.clientHeight])
        .words(data)
        .fontSize(d => size(d.ratio))
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