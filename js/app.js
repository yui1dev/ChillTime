// var swiper = new Swiper(".mySwiper", {
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//       },
//     });

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.5,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 1,
    }
  }
});