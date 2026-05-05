window.chiqarish = function() {
    let saqlanganData = localStorage.getItem('buyurtmalarim');
    let buyurtmalar = JSON.parse(saqlanganData) || [];
    let ruyxatDiv = document.getElementById('buyurtma-ruyxati-ichki');

    if (!ruyxatDiv) return;

    if (buyurtmalar.length === 0) {
        ruyxatDiv.innerHTML = "<p style='text-align:center;'>Savat hozircha bo'sh</p>";
    } else {
        ruyxatDiv.innerHTML = ""; 
        let jamiSumma = 0;

        buyurtmalar.forEach((item, index) => {
            let narx = Number(item.narxi) || 0;
            let soni = Number(item.soni) || 1;
            let mahsulotJami = narx * soni;
            jamiSumma += mahsulotJami;

            ruyxatDiv.innerHTML += `
                <div class="order-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid rgba(71,71,64,0.2);">
                    <div class="order-info">
                        <h3 style="margin: 0;">${item.nomi}</h3>
                        <p style="margin: 5px 0; opacity: 0.8;">Vaqt: ${item.vaqti || ''}</p>
                        
                        <div style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
                            <button onclick="miqdorOzgarti(${index}, -1)" style="cursor:pointer; padding: 2px 8px;">-</button>
                            <span style="font-weight: bold;">${soni}</span>
                            <button onclick="miqdorOzgarti(${index}, 1)" style="cursor:pointer; padding: 2px 8px;">+</button>
                            
                            <button onclick="mahsulotniOchir(${index})" style="background:none; border:none; cursor:pointer; margin-left:10px; color: #ff4d4d;" title="O'chirish">
                                🗑️
                            </button>
                        </div>
                    </div>
                    <div class="price" style="font-weight: bold; font-size: 1.1rem;">
                        ${mahsulotJami.toLocaleString()} so'm
                    </div>
                </div>
            `;
        });

        ruyxatDiv.innerHTML += `
            <div style="text-align: right; margin-top: 20px; font-weight: bold; font-size: 1.2rem; border-top: 2px solid #474740; padding-top: 10px;">
                Umumiy: ${jamiSumma.toLocaleString()} so'm
            </div>
        `;
    }
}

// MAHSULOTNI O'CHIRISH FUNKSIYASI
window.mahsulotniOchir = function(index) {
    if (confirm("Ushbu mahsulotni savatdan o'chirmoqchimisiz?")) {
        let buyurtmalar = JSON.parse(localStorage.getItem('buyurtmalarim')) || [];
        
        // Tanlangan elementni massivdan olib tashlaymiz
        buyurtmalar.splice(index, 1);
        
        // Yangilangan massivni xotiraga saqlaymiz
        localStorage.setItem('buyurtmalarim', JSON.stringify(buyurtmalar));
        
        // Savat sonini ham yangilab qo'yamiz (agar kerak bo'lsa)
        localStorage.setItem('savatSoni', buyurtmalar.length);
        
        // Ekranni qayta chizamiz
        window.chiqarish();
    }
}

window.miqdorOzgarti = function(index, farq) {
    let buyurtmalar = JSON.parse(localStorage.getItem('buyurtmalarim')) || [];
    if (buyurtmalar[index]) {
        let joriySoni = Number(buyurtmalar[index].soni) || 1;
        let yangiSoni = joriySoni + farq;
        if (yangiSoni >= 1) {
            buyurtmalar[index].soni = yangiSoni;
            localStorage.setItem('buyurtmalarim', JSON.stringify(buyurtmalar));
            window.chiqarish();
        }
    }
}

document.addEventListener("DOMContentLoaded", window.chiqarish);

function savatniTozalash() {
    if (confirm("Savatni bo'shatmoqchimisiz?")) {
        localStorage.removeItem('buyurtmalarim');
        localStorage.setItem('savatSoni', 0);
        location.reload();
    }
}



const sendBtn = document.getElementById('send-btn');
const successModal = document.getElementById('successModal');

// Telegram bot ma'lumotlari
const botToken = "8723680962:AAHpQyJ9JFirT5mq75LiF6QPRdtTqQDZLBc";
const chatId = "5574305333";

sendBtn.addEventListener('click', () => {
    const xabar = "Yangi buyurtma qabul qilindi! ✅";

    // 1. Telegramga yuborish
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: xabar
        })
    })
    .then(response => {
        if (response.ok) {
            // 2. Modalni ko'rsatish
            successModal.style.display = 'block';
        } else {
            alert("Xatolik yuz berdi. Bot token yoki Chat IDni tekshiring.");
        }
    })
    .catch(error => console.error('Xatolik:', error));
});

// Modalni yopish funksiyasi
function closeAll() {
    successModal.style.display = 'none';
}