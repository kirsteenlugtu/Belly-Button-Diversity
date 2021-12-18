console.log('plots.js loaded');

function drawBarChart(sampleId) {
    console.log(`drawBarChart (${sampleId})`);

    d3.json("samples.json").then(data => {
        
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        };

        let barArray = [barData];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            t: 30, l: 150
        };

        Plotly.newPlot("bar", barArray, barLayout);

    });
};

function drawBubbleChart(sampleId) {
    console.log(`drawBubbleChart (${sampleId})`);

    d3.json("samples.json").then(data => {
        
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        
        console.log(otu_ids);
        console.log(sample_values);

        let bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
            color: otu_ids,
            size: sample_values
            }
        };
        
        // console.log(x);
        
        let bubbleArray = [bubbleTrace];
        
        let layout = {
            title: `OTUs present on ${sampleId}`,
            showlegend: false,
            height: 600,
            width: 600
        };
        
        Plotly.newPlot('bubble', bubbleArray, layout);
    });
};

function showMetaData(sampleId) {
    console.log(`showMetaData (${sampleId})`);

    d3.json("samples.json").then(data => {

        let metadata = data.metadata;
        let resultArray = metadata.filter(s => s.id == sampleId);
        let result = resultArray[0];

        console.log('result',result);

        let metadata_div = d3.select("#sample-metadata");

        metadata_div.html("");

        Object.entries(result).forEach(([key, value]) => {
           
            console.log(`Key: ${key} and Value ${value}`);
            metadata_div.append("p").text(`${key}: ${value}`);

        });
    });
};

function drawGaugeChart (sampleId){
    console.log(`drawGaugeChart (${sampleId})`);

    d3.json("samples.json").then(data => {

        let metadata = data.metadata;
        let resultArray = metadata.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let wfreq = result.wfreq;
        console.log(`wfreq ${wfreq}`);

        var data = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Belly Button Washing Frequency <br> Scrubs per Week" },
            type: "indicator",
            mode: "gauge+number+delta",
            // delta: { reference: 380 },

            gauge: {
                axis: { range: [null, 9] },
                steps: [
                    { range: [0, 1], color: "#f5f8fa" },
                    { range: [1, 2], color: "#ebf0f5" },
                    { range: [2, 3], color: "#cfdce7" },
                    { range: [3, 4], color: "#a7bfd4" },
                    { range: [4, 5], color: "#759bbc" },
                    { range: [5, 6], color: "#3d72a0" },
                    { range: [6, 7], color: "#004582" },
                    { range: [7, 8], color: "#003a71" },
                    { range: [8, 9], color: "#002f60" },
                ],
                threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: wfreq
                }
            }
        }];

        let layout = { 
            width: 600, 
            height: 450, 
            margin: { t: 0, b: 0 } 
        };

        Plotly.newPlot('gauge', data, layout);
    });
};

// The following portion of code was taken from Dominic LaBella's office hours session 11-Dec-2021

function optionChanged(id) {
    console.log(`optionchanged(${id})`);

    drawBarChart(id);
    drawBubbleChart(id);
    showMetaData(id);
    drawGaugeChart(id);
};

function InitDashboard() {

    console.log("Initializing Dashboard");

    let selector = d3.select("#selDataset");

    d3.json("samples.json").then(data => {

        console.log(data);

        let sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);            
        });

        let sampleId = sampleNames[0];

        drawBarChart(sampleId);
        drawBubbleChart(sampleId); 
        showMetaData(sampleId);
        drawGaugeChart(sampleId);

    });
};

InitDashboard();