// ================= DATA QUÀ TẶNG =================
const giftsData = [
    {
        id: 1, giftName: "Quà Bí Mật 1", icon: "🎁", 
        image: "https://images.unsplash.com/photo-1530103862676-de3c9da59a72?auto=format&fit=crop&w=400&q=80",
        title: "Dành cho tuổi mới!", recipient: "Gửi tới bạn yêu",
        wishText: "Chúc bạn tuổi mới luôn ngập tràn niềm vui. Mong mọi dự định của bạn đều thành hiện thực nhé!",
        signature: "- Ký tên: XYZ -"
    },
    {
        id: 2, giftName: "Quà Tinh Thần", icon: "💌",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80",
        title: "Đừng buồn nhé!", recipient: "Người bạn kiên cường",
        wishText: "Cuộc sống có lúc thăng lúc trầm, nhưng hãy nhớ mình luôn ở đây ủng hộ cậu. Chúc cậu một đời an nhiên!",
        signature: "- Best Friend -"
    },
    {
        id: 3, giftName: "Quà Chữa Lành", icon: "🍀",
        image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=400&q=80",
        title: "Nụ cười là liều thuốc", recipient: "Gửi ánh mặt trời",
        wishText: "Hãy luôn giữ nụ cười trên môi, vì nụ cười của cậu rất đẹp và truyền cảm hứng cho rất nhiều người đấy!",
        signature: "- Cậu bé nhút nhát -"
    },
    {
        id: 4, giftName: "Quà Đặc Biệt", icon: "👑",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
        title: "Thành công nhé!", recipient: "Gửi CEO tương lai",
        wishText: "Chúc dự án sắp tới của cậu thành công rực rỡ. Mình tin là cậu sẽ làm được những điều phi thường!",
        signature: "- Fan hâm mộ số 1 -"
    }
];

// ================= DOM ELEMENTS =================
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const homeScreen = document.getElementById('homeScreen');
const wishScreen = document.getElementById('wishScreen');
const cherryBlossomScreen = document.getElementById('cherryBlossomScreen');

const nameInput = document.getElementById('nameInput');
const btnSubmitLogin = document.getElementById('btnSubmitLogin');
const errorMessage = document.getElementById('errorMessage');
const greetingText = document.getElementById('greetingText');

const btnGoToGifts = document.getElementById('btnGoToGifts');
const btnGoToChill = document.getElementById('btnGoToChill');
const btnBackFromGifts = document.getElementById('btnBackFromGifts');
const btnBackFromChill = document.getElementById('btnBackFromChill');
const btnBack = document.getElementById('btnBack');
const bgMusic = document.getElementById('bgMusic');

const giftsGrid = document.getElementById('giftsGrid');
const wishImage = document.getElementById('wishImage');
const wishTitle = document.getElementById('wishTitle');
const wishRecipient = document.getElementById('wishRecipient');
const typewriterText = document.getElementById('typewriterText');
const signatureAuthor = document.getElementById('signatureAuthor');

const confirmModal = document.getElementById('confirmModal');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const fireworksContainer = document.getElementById('fireworksContainer');

// ================= LOGIC ĐĂNG NHẬP =================
function checkPassword() {
    const enteredName = nameInput.value.trim().toLowerCase();
    
    if (enteredName === "lê thùy linh" || enteredName === "cô giáo tập sự") {
        greetingText.innerText = "Chúc mừng sinh nhật " + nameInput.value.trim() + " nha! 🎉";
        loginScreen.classList.remove('active');
        loginScreen.classList.add('hidden');
        
        confetti({ particleCount: 300, spread: 100, origin: { y: 0.6 } });
        
        setTimeout(() => {
            dashboardScreen.classList.remove('hidden');
            dashboardScreen.classList.add('active');
        }, 500);
    } else {
        errorMessage.classList.remove('hidden');
        nameInput.classList.add('shake-animation');
        setTimeout(() => { nameInput.classList.remove('shake-animation'); }, 400);
    }
}

btnSubmitLogin.addEventListener('click', checkPassword);
nameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPassword(); });
nameInput.addEventListener('input', () => { errorMessage.classList.add('hidden'); });


// ================= QUẢN LÝ CHUYỂN TRANG & HIỆU ỨNG TRUNG TÂM =================

// 1. Vào/Ra Kho Quà
btnGoToGifts.addEventListener('click', () => {
    dashboardScreen.classList.remove('active');
    dashboardScreen.classList.add('hidden');
    setTimeout(() => {
        homeScreen.classList.remove('hidden');
        homeScreen.classList.add('active');
    }, 400);
});

btnBackFromGifts.addEventListener('click', () => {
    homeScreen.classList.remove('active');
    homeScreen.classList.add('hidden');
    setTimeout(() => {
        dashboardScreen.classList.remove('hidden');
        dashboardScreen.classList.add('active');
    }, 400);
});

// 2. Vào/Ra Góc Bình Yên (Xử lý riêng rẽ Pháo hoa & Tua rua)
btnGoToChill.addEventListener('click', () => {
    dashboardScreen.classList.remove('active');
    dashboardScreen.classList.add('hidden');
    
    stopContinuousFestive(); // TẮT TUA RUA
    
    setTimeout(() => {
        cherryBlossomScreen.classList.remove('hidden');
        cherryBlossomScreen.classList.add('active');
        bgMusic.play().catch(e => console.log("Cần tương tác để bật nhạc"));
        
        startFireworksLoop(); // BẬT PHÁO HOA MẠNH
    }, 400);
});

btnBackFromChill.addEventListener('click', () => {
    cherryBlossomScreen.classList.remove('active');
    cherryBlossomScreen.classList.add('hidden');
    bgMusic.pause(); 
    
    stopFireworksLoop(); // TẮT PHÁO HOA
    startContinuousFestive(); // BẬT LẠI TUA RUA
    
    setTimeout(() => {
        dashboardScreen.classList.remove('hidden');
        dashboardScreen.classList.add('active');
    }, 400);
});


// ================= LOGIC HIỂN THỊ QUÀ & NÚT TROLL =================
function renderGifts() {
    giftsData.forEach(gift => {
        const giftEl = document.createElement('div');
        giftEl.classList.add('gift-item');
        giftEl.innerHTML = `<div class="gift-icon">${gift.icon}</div><div class="gift-name">${gift.giftName}</div>`;
        giftEl.addEventListener('click', () => showConfirmModal(gift));
        giftsGrid.appendChild(giftEl);
    });
}

let currentSelectedGift = null;
let noClickCount = 0;
const noTexts = ["Từ chối 😒", "Nghĩ lại đi!", "Chọn Đồng Ý đi!", "Cơ hội cuối nè!"];

function showConfirmModal(gift) {
    currentSelectedGift = gift;
    noClickCount = 0;
    btnYes.style.fontSize = `16px`; btnYes.style.padding = `12px 25px`;
    btnNo.style.fontSize = `16px`; btnNo.style.padding = `12px 25px`;
    btnNo.style.display = 'inline-block';
    btnNo.innerText = noTexts[0];
    confirmModal.classList.remove('hidden');
}

btnNo.addEventListener('click', () => {
    noClickCount++;
    if (noClickCount < 4) {
        let yesSize = 16 * Math.pow(1.5, noClickCount); let yesPad = 12 * Math.pow(1.5, noClickCount); let yesPadX = 25 * Math.pow(1.5, noClickCount);
        btnYes.style.fontSize = `${yesSize}px`; btnYes.style.padding = `${yesPad}px ${yesPadX}px`;
        let noSize = 16 / Math.pow(1.5, noClickCount); let noPad = 12 / Math.pow(1.5, noClickCount); let noPadX = 25 / Math.pow(1.5, noClickCount);
        btnNo.style.fontSize = `${noSize}px`; btnNo.style.padding = `${noPad}px ${noPadX}px`;
        btnNo.innerText = noTexts[noClickCount];
    } 
    if (noClickCount === 4) { btnNo.style.display = 'none'; }
});

btnYes.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
    if (currentSelectedGift) { openGift(currentSelectedGift); }
});

// ================= LOGIC MỞ QUÀ VÀ HIỆU ỨNG CHỮ =================
let typewriterTimeout;
let currentWishText = "";
let charIndex = 0;

function openGift(gift) {
    wishImage.src = gift.image;
    wishTitle.innerText = gift.title;
    wishRecipient.innerText = gift.recipient;
    signatureAuthor.innerText = gift.signature;
    typewriterText.innerHTML = "";
    signatureAuthor.style.opacity = '0';
    currentWishText = gift.wishText;
    charIndex = 0;
    clearTimeout(typewriterTimeout);
    
    homeScreen.classList.remove('active');
    homeScreen.classList.add('hidden');
    
    setTimeout(() => {
        wishScreen.classList.remove('hidden');
        wishScreen.classList.add('active');
        
        // --- HIỆU ỨNG BẮN TUA RUA MẠNH KHI MỞ QUÀ ---
        launchCelebrationConfetti(); // Bắn liên tục 2 góc trong 3 giây
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } }); // Bắn 1 phát cực mạnh ở giữa
        
        startTypewriterEffect();
    }, 300);
}

function startTypewriterEffect() {
    if (charIndex < currentWishText.length) {
        typewriterText.innerHTML += currentWishText.charAt(charIndex);
        charIndex++;
        typewriterTimeout = setTimeout(startTypewriterEffect, 35);
    } else {
        signatureAuthor.style.opacity = '1';
    }
}

btnBack.addEventListener('click', () => {
    clearTimeout(typewriterTimeout);
    wishScreen.classList.remove('active');
    wishScreen.classList.add('hidden');
    setTimeout(() => {
        homeScreen.classList.remove('hidden');
        homeScreen.classList.add('active');
    }, 300);
});

// ================= QUẢN LÝ TUA RUA LIÊN TỤC (CONFETTI) =================
let festiveInterval;

function startContinuousFestive() {
    if (festiveInterval) return; // Tránh tạo nhiều loop trùng lặp
    festiveInterval = setInterval(() => {
        confetti({
            particleCount: 20, angle: 60, spread: 70, origin: { x: 0, y: 0.8 },
            colors: ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#ff9a9e']
        });
        confetti({
            particleCount: 20, angle: 120, spread: 70, origin: { x: 1, y: 0.8 },
            colors: ['#a29bfe', '#fd79a8', '#ff9a9e', '#fecfef', '#55efc4']
        });
    }, 700);
}

function stopContinuousFestive() {
    clearInterval(festiveInterval);
    festiveInterval = null;
}

// Hàm hỗ trợ cho việc mở quà
function launchCelebrationConfetti() {
    const runningDuration = 3 * 1000;
    const animationEnd = Date.now() + runningDuration;
    (function animationFrame() {
        confetti({ particleCount: 15, angle: 60, spread: 80, origin: { x: 0, y: 0.85 }});
        confetti({ particleCount: 15, angle: 120, spread: 80, origin: { x: 1, y: 0.85 }});
        if (Date.now() < animationEnd) { requestAnimationFrame(animationFrame); }
    }());
}

// ================= QUẢN LÝ PHÁO HOA GÓC BÌNH YÊN =================
let fireworkInterval;
const fireworkColors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fd79a8', '#ff9a9e'];

function startFireworksLoop() {
    if (fireworkInterval) clearInterval(fireworkInterval); 
    
    // Bắn liên tục mỗi 600ms (Mật độ pháo hoa dày đặc)
    fireworkInterval = setInterval(() => {
        createFireworkRocket();
        // 30% tỷ lệ bắn đúp thêm 1 viên để bầu trời rực rỡ hơn
        if (Math.random() > 0.3) {
            setTimeout(createFireworkRocket, 200);
        }
    }, 550); 
}

function stopFireworksLoop() {
    if (fireworkInterval) clearInterval(fireworkInterval);
    if (fireworksContainer) fireworksContainer.innerHTML = ''; 
}

function createFireworkRocket() {
    if (!fireworksContainer) return;
    const rocket = document.createElement('div');
    rocket.classList.add('firework-rocket');
    
    const startX = 10 + Math.random() * 80; 
    rocket.style.left = `${startX}%`;
    const riseHeight = -(60 + Math.random() * 30); // Bay cao ngẫu nhiên
    rocket.style.setProperty('--rise-height', `${riseHeight}vh`);
    
    rocket.addEventListener('animationend', (e) => {
        if (e.animationName === 'rise') {
            const rect = rocket.getBoundingClientRect();
            launchExplosion(rect.left + rect.width / 2, rect.top);
            rocket.remove(); 
        }
    });
    fireworksContainer.appendChild(rocket);
}

function launchExplosion(x, y) {
    if (!fireworksContainer) return;
    const particleCount = 75 + Math.floor(Math.random() * 20); // Chùm 40-60 hạt
    const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework-particle');
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`; 
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        const angle = Math.random() * Math.PI * 2; 
        const velocity = 60 + Math.random() * 120; 
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity + 25; 
        
        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);
        
        particle.addEventListener('animationend', () => { particle.remove(); });
        fireworksContainer.appendChild(particle);
    }
}

// ================= TRANG TRÍ CHUNG (BONG BÓNG & CÁNH HOA) =================
const balloonColors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fd79a8'];
const balloonContainer = document.getElementById('balloonContainer');
setInterval(() => {
    if(!balloonContainer) return;
    for(let i=0; i<2; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.backgroundColor = randomColor;
        balloon.style.color = randomColor;
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.animationDelay = `${Math.random() * 2}s`; 
        balloon.style.animationDuration = `${5 + Math.random() * 4}s`; 
        balloon.style.transform = `scale(${0.5 + Math.random() * 0.7})`; 
        balloonContainer.appendChild(balloon);
        setTimeout(() => balloon.remove(), 9000);
    }
}, 400);

function createPetals() {
    const container = document.getElementById('petalsContainer');
    if (!container) return;
    for (let i = 0; i < 40; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        const size = Math.random() * 8 + 10; 
        petal.style.width = `${size}px`; petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        const fallDuration = Math.random() * 5 + 6; 
        const fallDelay = Math.random() * 5;
        petal.style.animationDuration = `${fallDuration}s`; petal.style.animationDelay = `${fallDelay}s`;
        container.appendChild(petal);
    }
}

// ================= KHỞI CHẠY HỆ THỐNG =================
renderGifts();
createPetals();
startContinuousFestive(); // Mặc định bật tua rua khi vừa vào trang