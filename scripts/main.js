
import {TicTacToe} from "./lib/TicTacToe.js";

console.log('INITIAL PROJECT');

window.addEventListener('DOMContentLoaded', initCustomCursor);
function initCustomCursor() {
    const cursor = document.querySelector("#cursor");
    const cursorBorder = document.querySelector("#cursor-border");
    const cursorPos = { x: 0, y: 0 };
    const cursorBorderPos = { x: 0, y: 0 };

    document.addEventListener("mousemove", (e) => {
        cursorPos.x = e.clientX;
        cursorPos.y = e.clientY;

        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    requestAnimationFrame(function loop() {
        const easting = 8;
        cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
        cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;

        cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
        requestAnimationFrame(loop);
    });

    document.querySelectorAll("[data-cursor]").forEach((item) => {
        item.addEventListener("mouseover", (e) => {
            if (item.dataset.cursor === "pointer") {
                cursorBorder.style.backgroundColor = "rgba(255, 255, 255, .6)";
                cursorBorder.style.setProperty("--size", "30px");
            }
            if (item.dataset.cursor === "pointer2") {
                cursorBorder.style.backgroundColor = "white";
                cursorBorder.style.mixBlendMode = "difference";
                cursorBorder.style.setProperty("--size", "80px");
            }
        });
        item.addEventListener("mouseout", (e) => {
            cursorBorder.style.backgroundColor = "unset";
            cursorBorder.style.mixBlendMode = "unset";
            cursorBorder.style.setProperty("--size", "50px");
        });
    });

}


window.onload = () => {
    const ticTacToe = new TicTacToe();
}
