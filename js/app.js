

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