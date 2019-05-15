Array.prototype.max = function() {
    return Math.max.apply({}, this);
};
Array.prototype.min = function() {
    return Math.min.apply({}, this);
};

var d3Charts = {
    drawTwoLines: function (options, callbackUnitTxt) { //options:   id,data,width,ratio
        var margin = {
            top: 6,
            bottom: 25,
            left: 40,
            right: 40
        };
        if(options.margin!=undefined){
            margin=options.margin;
        }
        var data = options.data;
        var lastName = data[data.length - 1].name;

        var width = options.width;
        var height = width * options.ratio;

        var svg = d3.select("#" + options.id).html('').append("svg")
            .attr("width", width)
            .attr("height", height);

        //-------------------bar x轴序数比例尺
        var xScale = d3.scale.ordinal()
            .domain(data.map(function (d) { return d.name;}))
            .rangePoints([margin.left, width - margin.right]);

        //--------bar y轴scale
        var yMin = d3.min(data, function (d) {return [d.lineValue1].min();});
        var yMax = d3.max(data, function (d) {return [d.lineValue1].max();});

        var yScale = d3.scale.linear()
            .domain([yMin, yMax])
            .range([height - margin.bottom, margin.top]).nice(); //限制柱状图的高度


        //---------line线的y轴scale
        var yMin2 = d3.min(data, function (d) { return [d.lineValue2].min(); });
        var yMax2 = d3.max(data, function (d) { return [d.lineValue2].max(); });
        yMin2 = options.y2FromZero ? 0 : yMin2;
        var yScale2 = d3.scale.linear()
            .domain([yMin2, yMax2])
            .range([height - margin.bottom, margin.top]).nice();


        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .tickSize(0)
            // .tickValues(tickValues)
            .tickPadding(8)
            .tickFormat(function (d) {
                return d;
            });
        var xAxisSvg = svg.append("g")
            .attr("class", "axis axis_bottom")
            .attr("transform", "translate(" + 0 + "," + (height - margin.bottom) + ")")
            .call(xAxis);
        xAxisSvg.selectAll('text')
            .attr('class', 'size_11 color_axis_gray family_num');


        //------------------------y轴刻度1
        var y1Suffix = options.y1Suffix == undefined ? '' : options.y1Suffix;
        var yAxie = d3.svg.axis()
            .scale(yScale)
            .tickSize(-width+margin.left+margin.right)
            // .tickSize(-7)
            .ticks(7)
            .tickPadding(1)
            .tickFormat(function (d) {
            return (d).toFixed(options.y1Format) + y1Suffix;
        })
            .orient("left");
        var yAxisSvg = svg.append("g")
            .attr("class", "axis axis_right")
            .attr("transform", function (d) {
            return "translate(" + (margin.left - 5) + "," + 0 + ")";
        })
            .call(yAxie);
        yAxisSvg.selectAll('text')
            .attr('class', 'color_axis_yellow size_10');
        yAxisSvg.selectAll('line')
            .attr('class', 'line_gray');


        //------------------------y轴刻度2
        var y2Suffix = options.y2Suffix == undefined ? '' : options.y2Suffix;
        var yAxie2 = d3.svg.axis()
            .scale(yScale2)
            // .tickSize(-width+margin.left+margin.right)
            .tickSize(4)
            .ticks(7)
            .tickPadding(1)
            .tickFormat(function (d) {
            return d + y2Suffix;
        })
            .orient("right");
        var yAxisSvg2 = svg.append("g")
            .attr("class", "axis axis_right")
            .attr("transform", function (d) {
            return "translate(" + (width - margin.right) + "," + 0 + ")";
        })
            .call(yAxie2);
        yAxisSvg2.selectAll('text')
            .attr('class', 'color_axis_blue size_10');
        yAxisSvg2.selectAll('line')
            .attr('class', 'line_gray none');

        //-----------------------画y轴竖线
        svg.append("line")
            .attr("class", "line_gray line_solid")
            .attr("x1", margin.left)
            .attr("y1", height - margin.bottom)
            .attr("x2", width - margin.right)
            .attr("y2", height - margin.bottom);



        //------------------------画线
        var line1 = d3.svg.line()
            .x(function (d) {
            return xScale(d.name);
        })
            .y(function (d) {
            return yScale(d.lineValue1);
        });
        //画折线
        svg.append("g")
            .attr("class", "g_line")
            .append("path")
            .attr("class", "line_yellow")
            .attr("d", function (d) {
            return line1(data);
        });


        //------------------------画线
        var line2 = d3.svg.line()
            .x(function (d) {
            return xScale(d.name);
        })
            .y(function (d) {
            return yScale2(d.lineValue2);
        });
        //画折线
        svg.append("g")
            .attr("class", "g_line")
            .append("path")
            .attr("class", "line_blue")
            .attr("d", function (d) {
            return line2(data);
        });

    },
}
