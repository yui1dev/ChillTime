
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






// 1. O'zgaruvchilarni e'lon qilish
let mahsulotSoni = 1;
let basePrice = 0; 
let joriyMahsulotNomi = "";
let savatdagiJami = parseInt(localStorage.getItem('savatSoni')) || 0;

const priceElement = document.getElementById("m-price");
const countText = document.getElementById("count");
const cartSpan = document.getElementById("cart-count");

// 2. Sahifa yuklanganda savatdagi sonni chiqarish
window.onload = function() {
    if (cartSpan) {
        cartSpan.innerText = savatdagiJami;
    }
};

// 3. MODALNI OCHISH VA MA'LUMOTLARNI TO'LDIRISH
document.querySelectorAll(".muz-box-btn").forEach((btn, i) => {
    btn.onclick = () => {
        let box = document.querySelectorAll(".muz-box")[i];

        // Modal elementlarini to'ldirish
        document.getElementById("m-img").src = box.querySelector("img").src;
        joriyMahsulotNomi = box.querySelector(".muz-box-texts-titlee").innerText;
        document.getElementById("m-title").innerText = joriyMahsulotNomi;
        document.getElementById("m-size").innerText = box.querySelector(".muz-box-texts-textt").innerText;

        // Narxni raqamga aylantirib olish
        let priceText = box.querySelector(".muz-box-texts-grr").innerText;
        basePrice = parseInt(priceText.replace(/\D/g,'')); 
        
        mahsulotSoni = 1; // Har gal ochilganda 1 ga qaytarish
        if (countText) countText.innerText = mahsulotSoni;
        updatePrice();

        show("orderModal");
    };
});

// 4. Narxni yangilash funksiyasi
function updatePrice() {
    if (priceElement) {
        let total = basePrice * mahsulotSoni;
        priceElement.innerText = total.toLocaleString('uz-UZ') + " so’m";
    }
}

// 5. SAVATGA QO'SHISH (Asosiy funksiya)
function goForm() {
    // Savat sonini hisoblash va yangilash
    savatdagiJami += mahsulotSoni;
    if (cartSpan) {
        cartSpan.innerText = savatdagiJami;
    }
    localStorage.setItem('savatSoni', savatdagiJami);

    // Buyurtmalar ro'yxatini shakllantirish
    let buyurtmalar = JSON.parse(localStorage.getItem('buyurtmalarim')) || [];
    
    buyurtmalar.push({
        nomi: joriyMahsulotNomi,
        narxi: basePrice,
        soni: mahsulotSoni,
        jamiNarxi: basePrice * mahsulotSoni,
        vaqti: new Date().toLocaleTimeString()
    });

    localStorage.setItem('buyurtmalarim', JSON.stringify(buyurtmalar));

    // Modallarni yopish va natijani ko'rsatish
    closeAll();
    show("successModal");
}

// 6. Plus va Minus tugmalari
function plus() {
    mahsulotSoni++;
    if (countText) countText.innerText = mahsulotSoni;
    updatePrice();
}

function minus() {
    if (mahsulotSoni > 1) {
        mahsulotSoni--;
        if (countText) countText.innerText = mahsulotSoni;
        updatePrice();
    }
}

// 7. Modalni ko'rsatish va yopish
function show(id) {
    let modal = document.getElementById(id);
    let overlay = document.getElementById("overlay");
    if (overlay) overlay.style.display = "block";
    if (modal) modal.style.display = "block";
}

function closeAll() {
    let overlay = document.getElementById("overlay");
    if (overlay) overlay.style.display = "none";
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}

// 8. Savat sahifasiga o'tish
function savatgaOtish() {
    window.location.href = "buyurtmalarim/buyurtmalarim.html";
}

// Overlay bosilganda yopish
if (document.getElementById("overlay")) {
    document.getElementById("overlay").onclick = closeAll;
}

