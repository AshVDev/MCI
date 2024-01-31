(async function () {
  const data = await fetch("./data.json");
  const feData = await data.json();
  let json = feData;
  let selectedEmployeeId = json[0].id;
  let selectedEmployee = json[0];
  const empListData = document.querySelector(".employeeList");
  const empInfo = document.querySelector(".employeeList--Info");

  empListData.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      const forButton = e.target;
      forButton.querySelector(".crossButton").addEventListener("click", () => {
        console.log("button,clicked");
      });
      selectedEmployeeId = e.target.id;
      renderEmployee();
      renderSingleEmployee();
    }
    if (e.target.tagName === "BUTTON") {
      json = json.filter((emp) => emp.id !== +e.target.parentElement.id);
      if (selectedEmployeeId === +e.target.parentElement.id) {
        selectedEmployeeId = json[0]?.id || -1;
        selectedEmployee = json[0] || {};
        renderSingleEmployee();
      }
      renderEmployee();
    }
  });

  const renderSingleEmployee = () => {
    empInfo.innerHTML = "";
    const { id, firstName, lastName, imageUrl } = selectedEmployee;
    empInfo.innerHTML = `<img src=${imageUrl} />
    ${id},
    ${firstName},
    ${lastName}`;
  };

  const renderEmployee = () => {
    empListData.innerHTML = "";
    console.log("render");
    json.forEach((element) => {
      const spanElement = document.createElement("span");
      spanElement.classList.add("empListItem");
      // const btnElement = document.createElement("button");
      // btnElement.textContent = ``;
      if (parseInt(selectedEmployeeId, 10) === element.id) {
        spanElement.classList.add("selected");
        selectedEmployee = element;
      }
      spanElement.setAttribute("id", element.id);
      const innerdata = `${element.firstName} ${element.lastName} <button class='crossButton' >❌</button>`;
      // spanElement.textContent = `${element.firstName} ${element.lastName}`;
      // spanElement.appendChild(btnElement);
      spanElement.innerHTML = innerdata;
      empListData.appendChild(spanElement);
      // const delfunc = document
      //   .querySelector(".crossButton")
      //   .addEventListener("click", () => {
      //     clickFn(element.id);
      //   });
    });
  };
  renderEmployee();
  renderSingleEmployee();
})();
function clickFn(id) {
  alert(`id:${id}`);
}
