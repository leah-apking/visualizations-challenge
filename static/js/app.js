// Get the samples endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

function init() {

    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
        console.log(data);

        // Pull names data from JSON
        let names = data.names;

        // Create dropdown menu 
        let dropdownMenu = d3.select("#selDataset");

        names.forEach((name) => {
            dropdownMenu.append("option").text(name).property("value", name);
        });

        // Set starting default ID
        let startID = names[0];

        // Create intial demographics panel, bar graph, and bubble chart for starting ID
        demographics(startID);
        createPlotly(startID);

        // Allow user to change information based on dropdown ID selection
        d3.selectAll("#selDataset").on("change", updatePlotly);

        // Update demographics, bar graph, and bubble chart for user selected ID
        function updatePlotly() {
            let dropdownMenu = d3.select("#selDataset");
            let selectedID = dropdownMenu.property("value");
            demographics(selectedID);
            createPlotly(selectedID);
        };

        // Demographics
        function demographics(selectedID) {

            // Pull metadata from JSON
            let metadata = data.metadata;
            
            // Change ID selected from 'names' to integer to allow for filtering
            let intSelectedID = parseInt(selectedID);

            // Filter metadata for infomation related to selected ID
            let selectedInfo = metadata.filter((meta) => meta.id === intSelectedID);

            let startDemo = selectedInfo[0];

            // Append key value pairs for selected ID from metadata to demographics panel
            d3.select("#sample-metadata").html("");
            let demoPairs = Object.entries(startDemo);
            demoPairs.forEach(([key,value]) => {
                d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        // Gauge
            gaugeData = selectedInfo[0].wfreq;

            let traceGauge = [{
                domain: {x: [0,1], y: [0,1]},
                value: gaugeData,
                title:{
                    text: `Weekly Washing Frequency of ${selectedID}`
                },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: {range: [0,9]},
                    bar: {color: "rgb(255,255,255)"},
                    steps: [
                        { range: [0, 1], color: "rgb(231, 0, 95)"},
                        { range: [1, 2], color: "rgb(228, 0, 113)"},
                        { range: [2, 3], color: "rgb(223, 0, 132)"},
                        { range: [3, 4], color: "rgb(214, 0, 153)"},
                        { range: [4, 5], color: "rgb(200, 0, 174)"},
                        { range: [5, 6], color: "rgb(182, 0, 195)"},
                        { range: [6, 7], color: "rgb(156, 0, 216)"},
                        { range: [7, 8], color: "rgb(119, 0, 236)"},
                        { range: [8, 9], color: "rgb(44, 29, 255)"}
                    ]
                }
            }];

            let gaugeLayout = {
                width: 600,
                height: 500,
                margin: {t:0, b:0}
            };
            Plotly.newPlot("gauge", traceGauge, gaugeLayout);

        };

        // Bar Graph
        // createPlotly function builds both bar graph and bubble chart, using samples data
        function createPlotly(selectedID) {

            // Pull samples data from JSON
            let samples = data.samples;
            
            // Filter samples data for desired ID
            let selectedData = samples.filter((samp) => samp.id === selectedID);

            // Sort UTOs in descending order
            let sortSelected = selectedData.sort((a, b) => b.sample_values - a.sample_values);
            
            // Slice top ten UTOs and assign to variable
            let xBar = sortSelected[0].sample_values.slice(0,10);
            let yBar = sortSelected[0].otu_ids.slice(0,10);
            let textBar = sortSelected[0].otu_labels.slice(0,10);

            // Define trace for bar graph, selecting color, hoizontal orientation, and title
            let traceBar = {
                x: xBar.reverse(),
                y: yBar.map((yBar) => `OTU ${yBar}`).reverse(),
                text: textBar.reverse(),
                type: "bar",
                marker: {
                    color: "rgb(119, 0, 236)"},
                orientation: "h"
            };
            let barData = [traceBar];
            let barLayout = {
                title: `Top 10 OTUs found in ${selectedID}`
            };

            // Create Plotly bar graph
            Plotly.newPlot("bar", barData, barLayout);


        // Bubble Chart
            // Assign unsliced and sorted data from bar graph to new variables
            let yBubble = selectedData[0].sample_values;
            let xBubble = selectedData[0].otu_ids;
            let textBubble = selectedData[0].otu_labels;

            // Define trace for bubble chart, selecting color and title
            let traceBubble = {
                x: xBubble,
                y: yBubble,
                text: textBubble,
                mode: "markers",
                marker: {
                    size: yBubble,
                    color: xBubble,
                    colorscale: `Bluered`
                }
            };
            let bubbleData = [traceBubble];
            let bubbleLayout = {
                title: `Prevalence of OTUs Present in ${selectedID}`
            };

            // Create Plotly bubble chart
            Plotly.newPlot("bubble", bubbleData, bubbleLayout);
        };
    });
};

init();