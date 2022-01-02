fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const intervalBtns = document.querySelectorAll(".interval-btn");
    const titles = document.querySelectorAll(".title");
    const currentValues = document.querySelectorAll(".current");
    const previousValues = document.querySelectorAll(".previous");
    const previousTexts = document.querySelectorAll(".previous-text");

    const changeFrequency = (frequency) => {
      currentValues.forEach((currentValue, index) => {
        currentValue.innerHTML = data[index].timeframes[`${frequency}`].current;
      });
      previousValues.forEach((previousValue, index) => {
        previousValue.innerHTML = data[index].timeframes[`${frequency}`].previous;
      });
      previousTexts.forEach((previousText) => {
        switch (frequency) {
          case "daily":
            previousText.innerText = "Yesterday";
            break;
          case "weekly":
            previousText.innerText = "Last Week";
            break;
          case "monthly":
            previousText.innerText = "Last Month";
            break;
        }
      });
    };

    titles.forEach((element, index) => {
      element.innerHTML = data[index].title;
    });

    intervalBtns.forEach((intervalBtn) => {
      let frequency = intervalBtn.innerHTML.toLowerCase();

      if (intervalBtn.getAttribute("aria-selected") === "true") {
        changeFrequency(frequency);
      }

      intervalBtn.addEventListener("click", () => {
        intervalBtns.forEach((intervalBtn) => {
          intervalBtn.setAttribute("aria-selected", false);
        });
        intervalBtn.setAttribute("aria-selected", true);
        changeFrequency(frequency);
      });
    });
  });
