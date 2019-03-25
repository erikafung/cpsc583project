
window.onload = function() {
    setup3();
    var reloading = sessionStorage.getItem("reloading");
    var reloading2 = sessionStorage.getItem("reloading2");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        setup();
    }
    if (reloading2) {
        sessionStorage.removeItem("reloading2");
        setup2();
    }
}

function reloadP() {
    sessionStorage.setItem("reloading", "true");
    document.location.reload();
}
function reloadP2() {
    sessionStorage.setItem("reloading2", "true");
    document.location.reload();
}
function setup3() {

    var dataset = [];
    d3.csv('ForestAreaEdited.csv',function (d) {

        d.forEach(function(d) {
            d.EPS = +d.EPS;
            d.ForestArea= +d.ForestArea;
            d.Year = +d.Year;
            //d.Country = +d["Country"];
            d.EPIR = +d.EPIR;
        });

        dataset = d.map(function(d) {
            if (d.Year > 2017) {
                return [ d["Country"], d.EPIR ];
            }
        });

        dataset = dataset.filter(function( element ) {
            return element !== undefined;
        });

        var table = d3.select("#vis2").append("table");
        var header = table.append("thead").append("tr");
        header
            .selectAll("th")
            .data(["Country", "EPI Ranking"])
            .enter()
            .append("th")
            .text(function(d) { return d; });
        var tablebody = table.append("tbody");
        rows = tablebody
            .selectAll("tr")
            .data(dataset)
            .enter()
            .append("tr");
        // We built the rows using the nested array - now each row has its own array.
        cells = rows.selectAll("td")
        // each row has data associated; we get it and enter it for the cells.
            .data(function(d) {
                return d;
            })
            .enter()
            .append("td")
            .text(function(d) {
                return d;
            });

        // table.selectAll("tbody tr")
        //      .sort(function(a, b) {
        //         return d3.descending(a.EPIR, b.EPIR);
        //     });



    })

}
function setup2() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 1100 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 100]);

    var z = d3.scale.category10();

    var svg = d3.select("#vis").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("ForestAreaEdited.csv", function(error, data) {
        if (error) throw error;
        // Compute the series names ("y1", "y2", etc.) from the loaded CSV.
        var seriesNames = ["EPS"]

        // Map the data to an array of arrays of {x, y} tuples.
        var series = seriesNames.map(function(series) {
            return data.map(function(d) {
                return {x: +d.Year, y: +d[series]};
            });
        });

        // Compute the scales’ domains.
        x.domain(d3.extent(d3.merge(series), function(d) { return d.x; })).nice();
        y.domain(d3.extent(d3.merge(series), function(d) { return d.y; })).nice();

        // Add the x-axis.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"));

        // Add the y-axis.
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.svg.axis().scale(y).orient("left"));

        var countries = ["Australia", "Austria", "Brazil", "Canada", "China", "Czech Republic", "Denmark", "Finland",
            "France", "Germany", "Greece", 'Hungary', "India", "Indonesia", "Italy", "Japan", "Korea", "Netherlands", "Norway"
            , "Poland", "Portugal", "Russia", "Slovak Republic", "South Africa", "Spain", "Sweden", "Switzerland", "Turkey",
            "United Kingdom", "United States"];

        // Add the points!
        svg.selectAll(".series")
            .data(series)
            .enter().append("g")
            .attr("class", "series")
            .style("fill", function(d, i) { return z(i); })
            .selectAll(".point")
            .data(function(d) { return d; })
            .enter().append("circle")
            .attr("class", "point")
            .attr("r", 4.5)
            .style("stroke", "white")
            .attr("cx", function(d) { return x(d.x); })
            .attr("cy", function(d) { return y(d.y); });

        svg.selectAll(".point")
            .append("svg:title")
            .text(function(d) {return d.y;});

    });

}
function setup() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 1100 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 100]);

    var z = d3.scale.category10();

    var svg = d3.select("#vis").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("ForestAreaEdited.csv", function(error, data) {
        if (error) throw error;
        // Compute the series names ("y1", "y2", etc.) from the loaded CSV.
        // var seriesNames = ["ForestArea"]

        // Map the data to an array of arrays of {x, y} tuples.
        // var series = seriesNames.map(function(series) {
        //     return data.map(function(d) {
        //         return {x: +d.Year, y: +d[series]};
        //     });
        // });

        // var parseDate = d3.date("%Y");

        data.forEach(function(d) {
           d.EPS = +d.EPS;
           d.ForestArea= +d.ForestArea;
           d.Year = +d.Year;
           d.Country = d["Country"];
        });


        // Compute the scales’ domains.
        x.domain(d3.extent(d3.merge(data), function(d) { return d.Year; })).nice();
        y.domain(d3.extent(d3.merge(data), function(d) { return d.ForestArea; })).nice();

        console.log(x.domain);
        // Add the x-axis.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"));

        // Add the y-axis.
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.svg.axis().scale(y).orient("left"));

        // Add the points!
        svg.selectAll(data)
            .data(data)
            .enter().append("g")
            .attr("class", "series")
            .style("fill", function(d, i) { return z(i); })
            .selectAll(".point")
            .data(function(d) { return d; })
            .enter().append("circle")
            .attr("class", "point")
            .attr("r", 4.5)
            .style("stroke", "white")
            .attr("cx", function(d) { return x(d.Year); })
            .attr("cy", function(d) { return y(d.ForestArea); });

        svg.selectAll(".point")
            .append("svg:title")
            .text(function(d) {return d.ForestArea;});

    });
}
