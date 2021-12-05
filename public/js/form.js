const select = document.getElementsByClassName("percentage");
const def = document.getElementById("def").innerText.split(",");
const manage = document.getElementById("manage").innerText.split(",");
const use = document.getElementById("use").innerText.split(",");
const mergeArray = [...def, ...manage, ...use];

for (let i = 0; i < select.length; i++) {
  for (let j = 0; j <= 20; j++) {
    const option = document.createElement("option");
    option.value = j * 5;
    option.textContent = j * 5;
    if (option.value == mergeArray[i]) {
      option.selected = true;
    }
    select[i].appendChild(option);
  }
}
