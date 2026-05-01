// autopred.js
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Bakery demo prediction
  ========================= */
  const demoCategory = document.getElementById("demoCategory");
  const demoTime = document.getElementById("demoTime");
  const demoDay = document.getElementById("demoDay");
  const demoWeather = document.getElementById("demoWeather");
  const predictionOutput = document.getElementById("predictionOutput");
  const demandBar = document.getElementById("demandBar");
  const demandNote = document.getElementById("demandNote");
  const decisionQuestion = document.getElementById("decisionQuestion");

  const categoryBase = {
    pastry: 280,
    bread: 220,
    coffee: 180,
    cake: 310
  };

  const categoryLabel = {
    pastry: "pastry",
    bread: "bread",
    coffee: "coffee",
    cake: "cake"
  };

  function calculatePrediction(){
    if (!demoCategory || !demoTime || !demoDay || !demoWeather) return;
    if (!predictionOutput || !demandBar || !demandNote || !decisionQuestion) return;

    const category = demoCategory.value;
    const time = demoTime.value;
    const day = demoDay.value;
    const weather = demoWeather.value;

    let value = categoryBase[category] || 0;
    let reasons = [];

    if (time === "morning") {
      value *= category === "coffee" ? 1.35 : 1.15;
      reasons.push("morning trade lifts early demand");
    } else {
      value *= category === "cake" ? 1.22 : 0.92;
      reasons.push("afternoon trade changes the product mix");
    }

    if (day === "weekend") {
      value *= category === "pastry" || category === "cake" ? 1.32 : 1.18;
      reasons.push("weekend footfall increases expected sales");
    } else {
      reasons.push("weekday demand gives a steadier baseline");
    }

    if (weather === "rain") {
      value *= category === "coffee" ? 1.12 : 0.88;
      reasons.push("rain shifts demand towards hot drinks and reduces browsing");
    }

    if (weather === "sunny") {
      value *= 1.10;
      reasons.push("sunny weather improves local footfall");
    }

    if (weather === "event") {
      value *= 1.38;
      reasons.push("a nearby event creates extra customer flow");
    }

    const predicted = Math.round(value / 5) * 5;
    const low = Math.round((predicted * 0.85) / 5) * 5;
    const high = Math.round((predicted * 1.15) / 5) * 5;
    const demand = Math.max(18, Math.min(96, Math.round((predicted / 520) * 100)));

    predictionOutput.innerHTML = `
      <div style="font-size:2rem; font-weight:800;">£${predicted}</div>
      <div style="color:rgba(15,31,23,0.68); margin-top:0.35rem;">Expected range: £${low}–£${high}</div>
      <div style="color:rgba(15,31,23,0.68); margin-top:0.75rem;">Main driver: ${reasons[reasons.length - 1]}.</div>
    `;

    demandBar.style.width = `${demand}%`;
    demandNote.textContent =
      demand >= 70 ? "High demand scenario." :
      demand >= 45 ? "Medium demand scenario." :
      "Lower demand scenario.";

    decisionQuestion.textContent =
      `What revenue should I expect for ${categoryLabel[category]} sales on a ${day} ${time}?`;
  }

  document.getElementById("runPredictionBtn")?.addEventListener("click", calculatePrediction);

  document.getElementById("resetPredictionBtn")?.addEventListener("click", () => {
    if (!demoCategory || !demoTime || !demoDay || !demoWeather) return;

    demoCategory.value = "pastry";
    demoTime.value = "morning";
    demoDay.value = "weekday";
    demoWeather.value = "normal";

    calculatePrediction();
  });

  [demoCategory, demoTime, demoDay, demoWeather].forEach(control => {
    control?.addEventListener("change", calculatePrediction);
  });

  calculatePrediction();

});


/* =========================
   Plot carousel
========================= */
function scrollPlots(button, direction) {
  const carousel = button.closest(".plot-carousel");
  if (!carousel) return;

  const container = carousel.querySelector(
    ".product-plot-strip, .product-plot-strip-wide"
  );

  if (!container) return;

  const scrollAmount = container.clientWidth * 0.8;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}