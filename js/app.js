

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.5,
  spaceBetween: 30,
  centeredSlides: true,
  loop: false, 

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





//  openmodel

let count = 1;
let basePrice = 0; // har bir mahsulotning bitta narxi
let priceElement = document.getElementById("m-price");

// OCHISH - CARDS
document.querySelectorAll(".muz-box-btn").forEach((btn, i) => {
    btn.onclick = () => {
        let box = document.querySelectorAll(".muz-box")[i];

        document.getElementById("m-img").src =
            box.querySelector("img").src;

        document.getElementById("m-title").innerText =
            box.querySelector(".muz-box-texts-titlee").innerText;

        document.getElementById("m-size").innerText =
            box.querySelector(".muz-box-texts-textt").innerText;

        // Narxni olish (so‘mni raqam sifatida)
        let priceText = box.querySelector(".muz-box-texts-grr").innerText;
        basePrice = parseInt(priceText.replace(/\D/g,'')); // 15000 so’m -> 15000
        updatePrice();

        count = 1;
        document.getElementById("count").innerText = count;

        show("orderModal");
    };
});

function updatePrice() {
    let total = basePrice * count;
    priceElement.innerText = total.toLocaleString('uz-UZ') + " so’m";
}

function show(id) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById(id).style.display = "block";
}

function closeAll() {
    document.getElementById("overlay").style.display = "none";
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}

function goForm() {
    document.getElementById("orderModal").style.display = "none";
    document.getElementById("formModal").style.display = "block";
}

function success() {
    document.getElementById("formModal").style.display = "none";
    document.getElementById("successModal").style.display = "block";
}

function plus() {
    count++;
    document.getElementById("count").innerText = count;
    updatePrice();
}

function minus() {
    if (count > 1) {
        count--;
        document.getElementById("count").innerText = count;
        updatePrice();
    }
}

document.getElementById("overlay").onclick = closeAll;
