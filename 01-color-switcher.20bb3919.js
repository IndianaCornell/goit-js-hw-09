!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body"),a=null;t.addEventListener("click",(function(){e.disabled&&(e.disabled=!1);a=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),t.disabled=!0})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(a),e.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.20bb3919.js.map
