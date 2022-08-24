const openEls = document.querySelectorAll("[data-open]");
const isVisible = "is-visible";
const clickSpan = document.getElementById("click-count")
let clickCount = localStorage.getItem("clickCount")

if (!clickCount) {
    clickCount = 0;
}

for (const el of openEls) {
    el.addEventListener("click", function () {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
        clickCount++;
        clickSpan.innerHTML = clickCount;

        if (clickCount >= 5) {
            document.getElementById("resetCountButton").classList.add(isVisible);
        }

        localStorage.setItem('clickCount', clickCount)
    });
}

document.addEventListener("click", e => {
    if (e.target == document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
});
document.addEventListener("click", e => {
    if (e.target == document.querySelector(".close-modal")) {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
});
document.addEventListener("click", e => {
    if (e.target == document.querySelector(".reset-count-button.is-visible")) {
        clickCount = 0;
        localStorage.setItem('clickCount', clickCount)
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
        document.querySelector(".reset-count-button.is-visible").classList.remove(isVisible);
        
    }
});
document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
});