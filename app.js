fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const intervalBtns = document.querySelectorAll(".interval-btn");
    const titles = document.querySelectorAll(".title");
    const currentValues = document.querySelectorAll(".current");
    const previousValues = document.querySelectorAll(".previous");

    const changeValue = (frequency) => {
      currentValues.forEach((currentValue, index) => {
        currentValue.innerHTML = data[index].timeframes[`${frequency}`].current;
      });
      previousValues.forEach((previousValue, index) => {
        previousValue.innerHTML = data[index].timeframes[`${frequency}`].previous;
      });
    };

    intervalBtns.forEach((intervalBtn) => {
      if (intervalBtn.getAttribute("aria-selected") === "true") {
        let frequency = intervalBtn.innerHTML.toLowerCase();
        changeValue(frequency);
      }
    });

    titles.forEach((element, index) => {
      element.innerHTML = data[index].title;
    });

    intervalBtns.forEach((intervalBtn) => {
      intervalBtn.addEventListener("click", (e) => {
        intervalBtns.forEach((intervalBtn) => {
          intervalBtn.setAttribute("aria-selected", false);
        });
        intervalBtn.setAttribute("aria-selected", true);

        let frequency = intervalBtn.innerHTML.toLowerCase();
        changeValue(frequency);
      });
    });
  });
