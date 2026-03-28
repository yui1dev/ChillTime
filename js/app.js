

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.5,
  spaceBetween: 30,
  centeredSlides: true,
  loop: false, // 👈 o‘chirildi

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1
    },
    550: {
      slidesPerView: 1.2
    },
    768: {
      slidesPerView: 1.5
    }
  }
});






// menu nav list

let link1 = document.querySelector(".muz-link1");
let link2 = document.querySelector(".muz-link2");

let container1 = document.querySelector(".muz-ichimlik");
let container = document.querySelector(".muz-muzqaymoq");

link2.addEventListener("click", (e) => {
  e.preventDefault(); // 🔥 MUHIM

  container1.style.display = "none";
  container.style.display = "grid";

  link2.classList.add("act");
  link1.classList.remove("act");
});

link1.addEventListener("click", (e) => {
  e.preventDefault(); // 🔥 MUHIM

  container.style.display = "none";
  container1.style.display = "grid";

  link1.classList.add("act");
  link2.classList.remove("act");
});