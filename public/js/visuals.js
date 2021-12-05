const percentToRange = document.getElementById("percentageValue");
const define = document.getElementById("def");
const manage = document.getElementById("manage");
const use = document.getElementById("use");
const defDiv = document.getElementById("defData");
const manageDiv = document.getElementById("manageData");
const useDiv = document.getElementById("useData");

const value = percentToRange.innerText;
const def = define.innerText;
const manage1 = manage.innerText;
const use1 = use.innerText;
const defVal = defDiv.innerText;
const manageVal = manageDiv.innerText.split(",");
const useVal = useDiv.innerText.split(",");

const username = document.getElementById("username").innerText;

let questions = [
  "Establishing threat hunting goals.",
  "Current coverage of threat hunting goals.",
  "Hirining personnel dedicated to threat hunting.",
  "Formulating a threat hunting hypothesis.",
  "Acquiring specialized datasets and tools.",
  "Threat hunting training.",
  "SOC members who can develop needed cybersecurity scripts.",
  "Ability to scale threat hunting program.",
  "Utlzing system memory.",
  "Utlzing windows registry keys.",
  "Utlzing full packet capture.",
];

let values = [defVal, ...manageVal, ...useVal];
let category = [
  "blue",
  "blue",
  "blue",
  "orange",
  "orange",
  "orange",
  "orange",
  "orange",
  "orange",
  "orange",
  "red",
];

var barChartData = [
  {
    type: "bar",
    x: values,
    y: questions,
    orientation: "h",
    marker: {
      color: category,
    },
  },
];

var data = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: value,
    title: { text: "Thread Hunting" },
    type: "indicator",
    mode: "gauge+number",
    delta: { reference: 400 },
    gauge: { axis: { range: [0, 4] } },
  },
];

var layout = { width: 600, height: 400 };
Plotly.newPlot("plot", data, layout);

var gauge1 = [
  {
    type: "indicator",
    mode: "number+gauge",
    gauge: { shape: "bullet", axis: { range: [0, 4] } },
    value: def,
    domain: { x: [0, 1], y: [0, 1] },
    title: { text: "Define" },
  },
];
var gauge2 = [
  {
    type: "indicator",
    mode: "number+gauge",
    gauge: { shape: "bullet", axis: { range: [0, 4] } },
    value: manage1,
    domain: { x: [0, 1], y: [0, 1] },
    title: { text: "Manage" },
  },
];

var gauge3 = [
  {
    type: "indicator",
    mode: "number+gauge",
    gauge: { shape: "bullet", axis: { range: [0, 4] } },
    value: use1,
    domain: { x: [0, 1], y: [0, 1] },
    title: { text: "Use" },
  },
];

var layout = {
  width: 600,
  height: 150,
  margin: { t: 25 },
};
Plotly.newPlot("gauge", gauge1, layout);
Plotly.newPlot("gauge2", gauge2, layout);
Plotly.newPlot("gauge3", gauge3, layout);
Plotly.newPlot("chart", barChartData, {
  title: `${username} Threat Hunting`,
  yaxis: {
    fixedrange: true,
    automargin: true,
    tickmode: "array",
    title: "Items",
  },
  xaxis: { fixedrange: true, title: "Percentage" },
});
