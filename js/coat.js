document.addEventListener("DOMContentLoaded", function() {
    // 1. Ma'lumotni xotiradan olish
    let saqlanganData = localStorage.getItem('buyurtmalarim');
    let buyurtmalar = JSON.parse(saqlanganData) || [];
    
    // 2. HTML elementni tanlash
    let ruyxatDiv = document.getElementById('buyurtma-ruyxati-ichki');

    // ELEMENTNI TEKSHIRISH (Xatolikni oldini olish)
    if (!ruyxatDiv) {
        console.error("Xato: HTML sahifada 'buyurtma-ruyxati-ichki' topilmadi!");
        return;
    }



    if (buyurtmalar.length === 0) {
        ruyxatDiv.innerHTML = "<p style='text-align:center;'>Savat hozircha bo'sh</p>";
    } else {
        ruyxatDiv.innerHTML = ""; 
        let jamiSumma = 0;

        buyurtmalar.forEach(item => {
            let narx = Number(item.narxi) || 0;
            let soni = Number(item.soni) || 1;
            let mahsulotJami = narx * soni;
            jamiSumma += mahsulotJami;

            
            ruyxatDiv.innerHTML += `
                <div class="order-item" style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid rgba(71,71,64,0.2);">
                    <div class="order-info">
                        <h3 style="margin: 0;">${item.nomi}</h3>
                        <p style="margin: 5px 0; opacity: 0.8;">Soni: ${soni} dona | Vaqt: ${item.vaqti || ''}</p>
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
});

function savatniTozalash() {
    if (confirm("Savatni bo'shatmoqchimisiz?")) {
        localStorage.removeItem('buyurtmalarim');
        localStorage.setItem('savatSoni', 0);
        location.reload();
    }
}

