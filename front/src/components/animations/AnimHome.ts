var maxElements = 250;
var duration = 1500;
var toAnimate: any[] = [];
var radius = 1;
var distance = 20;
var colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];

import anime from "animejs";

export const createElements = () => {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < maxElements; i++) {
    var el = document.createElement("div");
    el.classList.add("particule");
    el.style.color = colors[anime.random(0, 3)];
    toAnimate.push(el);
    fragment.appendChild(el);
  }

  const animDiv = document.getElementById("animeHome");

  if (!animDiv) {
    return;
  }
  animDiv.appendChild(fragment);
};

var animate = (el: any, i: any) => {
  var angle = Math.random() * Math.PI * 2;
  anime({
    targets: el,
    translateX: [0, Math.cos(angle) * distance],
    translateY: [0, Math.sin(angle) * distance],
    scale: [
      { value: [0, 1], duration: 400, easing: "easeOutBack" },
      { value: 0, duration: 400, delay: duration - 800, easing: "easeInBack" }
    ],
    offset: (duration / maxElements) * Math.random(),
    duration: duration,
    easing: "easeOutSine",
    loop: true
  });
};

export const animeHome = () => {
  toAnimate.forEach(animate);
};
