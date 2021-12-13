console.log('plots.js loaded');

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
    });
};