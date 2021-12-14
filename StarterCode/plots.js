console.log('plots.js loaded');

function drawBarChart(sampleId) {
    console.log(`drawBarChart (${sampleId})`);
};

function drawBubbleChart(sampleId) {
    console.log(`drawBubbleChart (${sampleId})`);
};

function showMetaData(sampleId) {
    console.log{`showMetaData (${sampleId})`};
};


function optionChanged(id) {
    console.log(`optionchanged(${id})`);

    drawBubbleChart(id);
    drawBarChart(id);
    showMetaData(id);

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

    });
};