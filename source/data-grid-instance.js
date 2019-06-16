const dxDataGrid = require("devextreme/ui/data_grid")
const { generateData } = require("./data-grid-generate-data");

const dataGridOptions = {
    dataSource: generateData(100000),
    allowColumnReordering: true,
    allowColumnResizing: true,
    columnAutoWidth: true,
    showBorders: true,
    columnChooser: {
        enabled: true
    },
    columnFixing: { 
        enabled: true
    },
    customizeColumns: function (columns) {
        columns[0].width = 70;
    },
    loadPanel: {
        enabled: true
    },
    scrolling: {
        mode: "virtual",
        rowRenderingMode:"virtual",
    },
    sorting: {
        mode: "none"
    },
    onContentReady: function (e) {
        e.component.option("loadPanel.enabled", false);
    }
};

var dataGrid = new dxDataGrid("#sales", dataGridOptions);

module.exports = {
    dataGrid,
};