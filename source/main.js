var scaleX = 1000;
var scaleY = 1000;
var delta = 50;
var pausedState = true;
var reversedState = false;

window.setInterval(()=>{
  if(pausedState) return;
  $("#scaledContainer").css("transform", `scale(${scaleX/1000},${scaleY/1000})`);
  if(reversedState)
    {
      scaleX++;scaleY++;
    }
  else
    {
      scaleX--;scaleY--;
    }
}, delta);

$("#theButton").click(()=>{
  $("#sales").dxPivotGrid("instance").updateDimensions();
});

$("#startButton").click(()=>{
  pausedState = false;
});

$("#stopButton").click(()=>{
  pausedState = true;
});

$("#reverseButton").click(()=>{
  reversedState = !reversedState;
});

$("#resetButton").click(()=>{
  scaleX = 1000;
  scaleY = 1000;
  delta = 50;
  pausedState = true;
  reversedState = false;
  $("#scaledContainer").css("transform", `scale(${scaleX/1000},${scaleY/1000})`);
  window.setTimeout(()=>$("#sales").dxPivotGrid("instance").updateDimensions());
});

DevExpress.viz.currentTheme("generic.light");
$(function(){
    $("#sales").dxPivotGrid({
        allowSortingBySummary: true,
        allowSorting: true,
        allowFiltering: true,
        allowExpandAll: true,
        //height: 570,
        showBorders: true,
        "export": {
            enabled: true,
            fileName: "Adventure Works"
        },
        fieldChooser: {
            allowSearch: true
        },
        dataSource: {
            fields: [
                { dataField: "[Product].[Category]", area: "row" },
                { 
                    dataField: "[Product].[Subcategory]", 
                    area: "row",
                    headerFilter: {
                        allowSearch: true
                    } 
                },
                { dataField: "[Ship Date].[Calendar Year]", area: "column" },
                { dataField: "[Ship Date].[Month of Year]", area: "column" },
                { dataField: "[Measures].[Customer Count]", area: "data" }
            ],
            store: {
                type: "xmla",
                url: "https://demos.devexpress.com/Services/OLAP/msmdpump.dll",
                catalog: "Adventure Works DW Standard Edition",
                cube: "Adventure Works"
            }
        }
    });
});