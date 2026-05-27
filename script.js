// ================= DATA QUÀ TẶNG =================
const giftsData = [
    {
        id: 1, giftName: "Quà Đặc Biệt", icon: "👑",
        image: "images/qua-dac-biet.jpg",
        title: "Dự án nghìn tỷ!", recipient: "Phú bà tương lai",
        wishText: "Chúc cho chặng đường tới của cô giáo thậtt bùng nổ nhaa! Deadline chạy êm ru và thi cử lúc nào cũng điểm cao chót vót luônn. Trở thành phú bà nhớ bao t ăn nhaa 👑💰",
        signature: "- Ký tên: Bạn nghèo chờ bao -"
    },
    {
        id: 2, giftName: "Quà Tinh Thần", icon: "💌",
        image: "images/qua-tinh-than.jpg",
        title: "Thẻ đen quyền lực!", recipient: "Người bạn kiên cường",
        wishText: "Lại thêm một tuổi gòi sao? Chúc m tuổi mới luôn vuii vẻ nhaa. T là tổng tài bá đạo, nay đặc cách cho m mượn thẻ đen của t để quẹt thoả thích luônn (nhưng trong hạn mức 50 cành thôii nèe 🤣). Nhớ xài tiết kiệm nhaa! 🥳🎁",
        signature: "- Ký tên: Tổng tài rỗng túi -"
    },
    {
        id: 3, giftName: "Quà Chữa Lành", icon: "🍀",
        image: "images/qua-chua-lanh.jpg",
        title: "Lệnh từ ban giám đốc!", recipient: "Nhân viên xuất sắc",
        wishText: "Có chỉ thị khẩn cấp: Bắt đầu từ hôm nay, cô bị ép buộc phải luôn xinh xẻo và cười thậtt nhiều mỗi ngày luônn á! Nếu làm trái lệnh, tổng tài sẽ phạt cô phải đi khao một chầu lẩu nhaa 🤤🍲. Rõ chưaa?",
        signature: "- Ký tên: Chủ tịch giấu tên -"
    },
    {
        id: 4, giftName: "Quà Bí Mật", icon: "🎁", 
        image: "images/qua-bi-mat.jpg",
        title: "Bản hợp đồng vô giá...", recipient: "Gửi tới cô giáo",
        wishText: "Tèn tennn! Phần bí mậtt nhất là bản hợp đồng làm bạn với t trọn đời luônn á! Không có lương đâu nhưng bù lại máy tính có lỗi hay lag là có IT fix bug giùm miễn phí luônn 😎. Tuổi mới thậtt rạng rỡ nhaa, deadline có dí quá thì ới một tiếng t phụ một tay luônn 💻✨🎁",
        signature: "- Ký tên: Demon -"
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
// Thêm khai báo này vào cùng nhóm DOM ELEMENTS
const hbMusic = document.getElementById('hbMusic');
if (hbMusic) {
    hbMusic.volume = 0.4; // Đặt âm lượng 0.4 (40%) để nhạc phát "dịu nhẹ", không bị quá to
}

// ================= LOGIC ĐĂNG NHẬP =================
function checkPassword() {
    // Thêm normalize('NFC') để đồng nhất bảng mã tiếng Việt giữa bàn phím điện thoại và máy tính
    const enteredName = nameInput.value.trim().toLowerCase().normalize('NFC');
    
    // Vì đã dùng toLowerCase(), chúng ta chỉ cần so sánh với phiên bản chữ thường chuẩn nhất
    if (enteredName === "thùy linh" || enteredName === "thuỳ linh" ||enteredName === "lê thùy linh" || enteredName === "lê thuỳ linh" || enteredName === "cô giáo tập sự") {
        
        // nameInput.value.trim() ở đây sẽ giữ nguyên định dạng viết hoa/viết thường ban đầu của người nhập để hiển thị cho đẹp
        greetingText.innerText = "Chúc mừng sinh nhật " + nameInput.value.trim() + " nha! 🎉";
        loginScreen.classList.remove('active');
        loginScreen.classList.add('hidden');

        if (hbMusic) {
            hbMusic.play().catch(e => console.log("Trình duyệt chặn autoplay, nhưng bấm nút login rồi nên sẽ chạy mượt!"));
        }

        // Vào màn hình Matrix Countdown
        startMatrixCountdown(() => {
            dashboardScreen.classList.remove('hidden');
            dashboardScreen.classList.add('active');
            confetti({ particleCount: 300, spread: 100, origin: { y: 0.6 } });
        });
    } else {
        errorMessage.classList.remove('hidden');
        nameInput.classList.add('shake-animation');
        setTimeout(() => { nameInput.classList.remove('shake-animation'); }, 400);
    }
}

btnSubmitLogin.addEventListener('click', checkPassword);
nameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkPassword(); });
nameInput.addEventListener('input', () => { errorMessage.classList.add('hidden'); });

// ================= NÚT CHẠY TRỐN =================
const btnRunaway = document.getElementById('btnRunaway');
let runawayCount = 0; // Biến đếm số lần chạm

function moveButton() {
    runawayCount++;

    // Nếu đã chạm/di chuột đủ 4 lần thì cho tàng hình luôn
    if (runawayCount >= 4) {
        btnRunaway.style.opacity = '0';
        btnRunaway.style.pointerEvents = 'none'; // Không cho bấm nữa
        setTimeout(() => {
            btnRunaway.style.display = 'none'; // Ẩn hoàn toàn khỏi giao diện
        }, 300); // Chờ hết animation opacity
        return;
    }

    // Đổi sang position fixed để nút có thể bay lượn tự do toàn bộ màn hình
    btnRunaway.style.position = 'fixed';
    btnRunaway.style.margin = '0'; // Xóa margin lúc khởi tạo
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const buttonWidth = btnRunaway.offsetWidth;
    const buttonHeight = btnRunaway.offsetHeight;
    
    // Tính toán trừ hao kích thước nút để không bị lẹm ra ngoài viền
    const randomX = Math.floor(Math.random() * (windowWidth - buttonWidth));
    const randomY = Math.floor(Math.random() * (windowHeight - buttonHeight));
    
    btnRunaway.style.left = `${randomX}px`;
    btnRunaway.style.top = `${randomY}px`;
}

// Bắt sự kiện hover trên máy tính
btnRunaway.addEventListener('mouseenter', moveButton);

// Bắt sự kiện chạm trên điện thoại
btnRunaway.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveButton();
}, {passive: false});

// Đề phòng dùng phím tab rồi enter
btnRunaway.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton(); 
});

// ================= QUẢN LÝ CHUYỂN TRANG & HIỆU ỨNG TRUNG TÂM =================

// 1. Vào/Ra Kho Quà
btnGoToGifts.addEventListener('click', () => {
    dashboardScreen.classList.remove('active');
    dashboardScreen.classList.add('hidden');
    setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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

    if (hbMusic) {
        hbMusic.pause();
    }
    
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

    if (hbMusic) {
        hbMusic.play().catch(e => console.log(e));
    }
    
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
    
    // Tọa độ logic theo phần trăm chiều ngang (10% đến 90%)
    const startX = 10 + Math.random() * 80; 
    rocket.style.left = `${startX}%`;
    
    const isMobile = window.innerWidth <= 850;
    // Độ cao bay lên (mobile bay thấp hơn để nổ trong màn hình)
    const baseRise = isMobile ? 35 : 60; 
    const riseHeight = -(baseRise + Math.random() * 20); 
    rocket.style.setProperty('--rise-height', `${riseHeight}vh`);
    
    rocket.addEventListener('animationend', (e) => {
        if (e.animationName === 'rise') {
            // TRUYỀN TRỰC TIẾP TỌA ĐỘ LOGIC sang hàm nổ (Không dùng getBoundingClientRect nữa)
            launchExplosion(startX, riseHeight);
            rocket.remove(); 
        }
    });
    fireworksContainer.appendChild(rocket);
}

function launchExplosion(startX, riseHeight) {
    if (!fireworksContainer) return;
    
    const isMobile = window.innerWidth <= 850;
    const baseParticles = isMobile ? 25 : 75;
    const particleCount = baseParticles + Math.floor(Math.random() * 15); 
    const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework-particle');
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`; 
        
        // --- CHUẨN HÓA LẠI TỌA ĐỘ ĐIỂM NỔ ---
        // Giữ nguyên trục X
        particle.style.left = `${startX}%`;
        // Trục Y: Pháo xuất phát từ bottom: -20px, cộng thêm độ cao bay lên (riseHeight)
        particle.style.bottom = `calc(${Math.abs(riseHeight)}vh - 20px)`; 
        particle.style.top = 'auto'; // Xóa thuộc tính top nếu có
        
        const angle = Math.random() * Math.PI * 2; 
        const velocity = isMobile ? (35 + Math.random() * 40) : (60 + Math.random() * 120); 
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


// ================= MATRIX COUNTDOWN =================
function startMatrixCountdown(onComplete) {
    const matrixScreen = document.getElementById('matrixScreen');
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    const countdownText = document.getElementById('countdownText');

    matrixScreen.classList.remove('hidden');
    matrixScreen.classList.add('active');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    // Màu gradient: hồng/tím giống ảnh
    const matrixColors = ['#ff69b4', '#ff1493', '#da70d6', '#ba55d3', '#ff6eb4', '#ff85c2'];

    let animFrame;
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 0, 20, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drops.forEach((y, i) => {
            const char = String.fromCharCode(0x30A0 + Math.random() * 96);
            const color = matrixColors[Math.floor(Math.random() * matrixColors.length)];
            ctx.fillStyle = color;
            ctx.font = `${fontSize}px monospace`;
            ctx.fillText(char, i * fontSize, y * fontSize);
            if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
        animFrame = requestAnimationFrame(drawMatrix);
    }
    drawMatrix();

    // Countdown: 3 → 2 → 1 → Happy Birthday to Linh
    const steps = ['3', '2', '1', '🎂 Happy Birthday to Linh! 🎂'];
    const durations = [1000, 1000, 1000, 1800];
    let step = 0;

    countdownText.style.opacity = '1';
    countdownText.textContent = steps[0];

    function nextStep() {
        step++;
        if (step >= steps.length) {
            // Kết thúc matrix → vào splash screen
            cancelAnimationFrame(animFrame);
            matrixScreen.classList.remove('active');
            matrixScreen.classList.add('hidden');
            showBirthdaySplash(onComplete);
            return;
        }
        countdownText.style.opacity = '0';
        setTimeout(() => {
            countdownText.textContent = steps[step];
            // Happy Birthday thì chữ to hơn và màu khác
            if (step === steps.length - 1) {
                countdownText.classList.add('hb-text');
            } else {
                countdownText.classList.remove('hb-text');
            }
            countdownText.style.opacity = '1';
            setTimeout(nextStep, durations[step]);
        }, 300);
    }

    setTimeout(nextStep, durations[0]);
}

// ================= BIRTHDAY SPLASH SCREEN =================
function showBirthdaySplash(onComplete) {
    const splash = document.getElementById('birthdaySplashScreen');
    const starCanvas = document.getElementById('starCanvas');
    const ctx = starCanvas.getContext('2d');

    splash.classList.remove('hidden');
    splash.classList.add('active');

    // Resize canvas
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;

    // Tạo ngôi sao
    const stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        r: Math.random() * 1.8 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.015 + 0.005
    }));

    let rafId;
    function drawStars() {
        ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        stars.forEach(s => {
            s.alpha += s.speed;
            if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${Math.abs(Math.sin(s.alpha))})`;
            ctx.fill();
        });
        rafId = requestAnimationFrame(drawStars);
    }
    drawStars();

    // Tạo nến
    const candleColors = ['#ff6b6b','#ffa94d','#ffe066','#69db7c','#74c0fc','#f783ac','#da77f2','#ff6b6b','#ffa94d'];
    const candlesContainer = document.getElementById('splashCandles');
    candlesContainer.innerHTML = '';
    candleColors.forEach(color => {
        const candle = document.createElement('div');
        candle.className = 'splash-candle';
        candle.innerHTML = `<div class="candle-flame"></div><div class="candle-body" style="background:${color};box-shadow:0 0 8px ${color}"></div>`;
        candlesContainer.appendChild(candle);
    });

    // Sau 3.2s → chuyển sang dashboard
    setTimeout(() => {
        cancelAnimationFrame(rafId);
        splash.classList.remove('active');
        splash.classList.add('hidden');
        onComplete();
    }, 3200);
}

// =================================================================
// ================= KHU VỰC BÍ MẬT (EASTER EGG) =================
// =================================================================

// 1. Lấy các phần tử DOM
const secretAreaScreen = document.getElementById('secretAreaScreen');
const cuteCalendar = document.querySelector('.cute-calendar');
const btnBackFromSecret = document.getElementById('btnBackFromSecret');

const giftSecret1 = document.getElementById('giftSecret1');
const giftSecret2 = document.getElementById('giftSecret2');
const giftSecret3 = document.getElementById('giftSecret3');
const giftSecret4 = document.getElementById('giftSecret4');

// THÊM MỚI: Lấy các phần tử cho cú lừa bánh kem và âm thanh
const cakePrankOverlay = document.getElementById('cakePrankOverlay');
const btnClosePrank = document.getElementById('btnClosePrank');
const splatSound = new Audio('audio/poc.mp3'); // Nhớ tải file poc.mp3 để cùng thư mục nhé!

// 2. Logic chuyển trang khi bấm vào cuốn lịch
if (cuteCalendar) {
    cuteCalendar.addEventListener('click', () => {
        // Ẩn màn hình Dashboard
        dashboardScreen.classList.remove('active');
        dashboardScreen.classList.add('hidden');
        
        // Hiện màn hình Khu vực bí mật sau 400ms (chờ CSS transition)
        setTimeout(() => {
            secretAreaScreen.classList.remove('hidden');
            secretAreaScreen.classList.add('active');
            
            // Bắn một ít pháo hoa tone màu vàng/trắng ăn mừng khi tìm ra bí mật
            if (typeof confetti === 'function') {
                confetti({ 
                    particleCount: 150, 
                    spread: 80, 
                    origin: { y: 0.6 }, 
                    colors: ['#f1c40f', '#fff', '#f39c12'] 
                });
            }
        }, 400);
    });
}

// 3. Logic nút Quay lại
if (btnBackFromSecret) {
    btnBackFromSecret.addEventListener('click', () => {
        // Ẩn màn hình Bí mật
        secretAreaScreen.classList.remove('active');
        secretAreaScreen.classList.add('hidden');
        
        // Quay lại Dashboard
        setTimeout(() => {
            dashboardScreen.classList.remove('hidden');
            dashboardScreen.classList.add('active');
        }, 400);
    });
}

// Thêm 2 biến lấy DOM mảnh vỡ và SVG bánh kem
const cakeSplatSvg = document.querySelector('.cake-splat-svg');
const splatEffect = document.getElementById('splat-effect');

// 4. Bắt sự kiện Click cho 4 hộp quà Bento
if (giftSecret1) {
    giftSecret1.addEventListener('click', () => {
        // Reset lại trạng thái ban đầu nếu user có bấm lại lần 2
        if (splatEffect) {
            splatEffect.classList.add('hidden');
            splatEffect.innerHTML = ''; // Xóa mảnh vỡ cũ
        }
        if (cakeSplatSvg) {
            cakeSplatSvg.classList.remove('splatting');
            // Tạo góc ném ngẫu nhiên để không lần nào giống lần nào
            cakeSplatSvg.style.setProperty('--fly-r', `${(Math.random() - 0.5) * 40}deg`);
        }

        // Bật màn hình đen
        if (cakePrankOverlay) {
            cakePrankOverlay.classList.remove('hidden');
            cakePrankOverlay.classList.add('active'); 
        }

        // Đợi đúng 0.6s (khớp thời gian animation chiếc bánh bay đến) để kích hoạt VỤ NỔ
        setTimeout(() => {
            // Tiếng "pốc"
            if (splatSound) splatSound.play().catch(e => console.log("Không sao, trình duyệt chặn tự phát nhạc"));
            
            // Xóa hình bánh nguyên vẹn
            if (cakeSplatSvg) cakeSplatSvg.classList.add('splatting');
            
            // Tạo các mảnh vỡ bay tung tóe
            if (splatEffect) {
                splatEffect.classList.remove('hidden');
                createSplatFragments(splatEffect);
            }

            // Bắn pháo hoa ăn mừng
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 250, spread: 200, origin: { y: 0.5 },
                    colors: ['#FCE4EC', '#F8BBD0', '#fff', '#ffeb3b', '#4caf50', '#2196f3'] 
                });
            }
        }, 600); // 600ms = 0.6s
    });
}

// Hàm vẽ các mảnh vỡ bay tứ tung
function createSplatFragments(container) {
    const colors = ['#fce4ec', '#f8bbd0', '#fff', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0', '#f44336'];
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Tạo 30 mảnh vỡ
    for (let i = 0; i < 30; i++) {
        const svgFrag = document.createElementNS(svgNS, "svg");
        svgFrag.setAttribute("viewBox", "0 0 100 100");
        svgFrag.style.position = "absolute";
        svgFrag.style.width = (20 + Math.random() * 30) + "px"; // Kích thước random
        svgFrag.style.height = svgFrag.style.width;
        
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "50");
        circle.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);
        
        svgFrag.appendChild(circle);
        
        // Tính toán hướng bay ngẫu nhiên
        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 250; 
        const duration = 0.4 + Math.random() * 0.4; // Thời gian bay random từ 0.4s - 0.8s
        
        svgFrag.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
        svgFrag.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
        svgFrag.style.setProperty('--r', `${(Math.random() - 0.5) * 360}deg`);
        svgFrag.style.animation = `splatFragments ${duration}s ease-out forwards`;
        
        container.appendChild(svgFrag);
    }
}

// Logic nút Đóng (Tắt cú lừa)
if (btnClosePrank) {
    btnClosePrank.addEventListener('click', () => {
        if (cakePrankOverlay) {
            cakePrankOverlay.classList.remove('active');
            cakePrankOverlay.classList.add('hidden');
            // Dọn dẹp chiến trường
            setTimeout(() => {
                if (splatEffect) splatEffect.innerHTML = '';
            }, 300);
        }
    });
}

// =================================================================
// LOGIC HỘP ƯỚC NGUYỆN (GIFT 2)
// =================================================================
const wishBoxOverlay = document.getElementById('wishBoxOverlay');
const wishStep1 = document.getElementById('wishStep1');
const wishStep2 = document.getElementById('wishStep2');
const wishStep3 = document.getElementById('wishStep3');
const wishStep4 = document.getElementById('wishStep4');

const wishTextarea = document.getElementById('wishTextarea');
const btnSendWish = document.getElementById('btnSendWish');
const btnCloseWishBox = document.getElementById('btnCloseWishBox');
const burningScene = document.querySelector('.burning-scene');
const starContainer = document.querySelector('.star-container');
const clickableStar = document.getElementById('clickableStar');
const btnFinishWish = document.getElementById('btnFinishWish');

// Bấm hộp quà số 2
if (giftSecret2) {
    giftSecret2.addEventListener('click', () => {
        // Reset mọi thứ về trạng thái ban đầu
        wishTextarea.value = '';
        wishStep1.classList.remove('hidden');
        wishStep1.style.display = 'flex';
        wishStep2.classList.add('hidden'); wishStep2.style.display = 'none';
        wishStep3.classList.add('hidden'); wishStep3.style.display = 'none';
        wishStep4.classList.add('hidden'); wishStep4.style.display = 'none';
        
        burningScene.classList.remove('active');
        starContainer.classList.remove('active');

        // Bật Overlay
        wishBoxOverlay.classList.remove('hidden');
        wishBoxOverlay.classList.add('active');
    });
}

// Bấm nút Hủy
if (btnCloseWishBox) {
    btnCloseWishBox.addEventListener('click', () => {
        wishBoxOverlay.classList.remove('active');
        wishBoxOverlay.classList.add('hidden');
    });
}

// Bấm Gửi đi 🚀
if (btnSendWish) {
    btnSendWish.addEventListener('click', () => {
        if(wishTextarea.value.trim() === '') {
            // Nếu không nhập gì thì rung nhẹ ô input cảnh báo
            wishTextarea.classList.add('shake-animation');
            setTimeout(() => wishTextarea.classList.remove('shake-animation'), 400);
            return;
        }

        // 1. Ẩn Form
        wishStep1.classList.add('hidden');
        setTimeout(() => { wishStep1.style.display = 'none'; }, 500);

        // 2. Hiện cảnh đốt giấy
        wishStep2.style.display = 'flex';
        setTimeout(() => { 
            wishStep2.classList.remove('hidden');
            burningScene.classList.add('active'); // Kích hoạt animation CSS
        }, 100);

        // 3. Đợi giấy cháy xong (khoảng 2.5s) -> Hiện sao băng
        setTimeout(() => {
            wishStep2.classList.add('hidden');
            setTimeout(() => { wishStep2.style.display = 'none'; }, 500);

            wishStep3.style.display = 'flex';
            setTimeout(() => {
                wishStep3.classList.remove('hidden');
                starContainer.classList.add('active'); // Kích hoạt sao bay vào
            }, 100);
        }, 2800);
    });
}

// Bấm vào ngôi sao băng ⭐
if (clickableStar) {
    clickableStar.addEventListener('click', () => {
        // Nổ một ít pháo hoa tone vàng
        if (typeof confetti === 'function') {
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 }, colors: ['#f1c40f', '#ffeaa7', '#fff'] });
        }

        // Ẩn sao băng
        wishStep3.classList.add('hidden');
        setTimeout(() => { wishStep3.style.display = 'none'; }, 500);

        // Hiện thư trả lời
        wishStep4.style.display = 'flex';
        setTimeout(() => { wishStep4.classList.remove('hidden'); }, 100);
    });
}

// Bấm kết thúc (Tuyệt vời!)
if (btnFinishWish) {
    btnFinishWish.addEventListener('click', () => {
        wishBoxOverlay.classList.remove('active');
        wishBoxOverlay.classList.add('hidden');
    });
}

// =================================================================
// LOGIC ĐỐ VUI SINH NHẬT (GIFT 3)
// =================================================================
const quizOverlay = document.getElementById('quizOverlay');
const quizBox = document.getElementById('quizBox');
const quizResultBox = document.getElementById('quizResultBox');
const currentQNum = document.getElementById('currentQNum');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptionsContainer = document.getElementById('quizOptionsContainer');
const quizScoreNum = document.getElementById('quizScoreNum');
const quizTrollMsg = document.getElementById('quizTrollMsg');
const quizEmoji = document.getElementById('quizEmoji');
const btnCloseQuiz = document.getElementById('btnCloseQuiz');

// NGÂN HÀNG 10 CÂU HỎI (Trộn lẫn nhạc Cortis và sự thật phũ phàng)
const questionBank = [
    { q: "Nếu ban nhạc Cortis mời bạn lên sân khấu, bạn sẽ làm gì?", opts: ["Khóc thét sảng", "Bật chế độ quẩy tung nóc", "Ngất xỉu ngay lập tức", "Đứng im như tượng"], ans: 1 },
    { q: "Bài hát nào của Cortis hợp với tình trạng 'ế' của bạn nhất?", opts: ["Bài nhạc tình sến súa", "Bài hát thất tình", "Tất cả các bài", "Ế cùng hội cùng thuyền với đứa làm web này 🥲"], ans: 3 },
    { q: "Sự thật phũ phàng nhất về tuổi mới của bạn là gì?", opts: ["Già thêm 1 tuổi", "Vẫn trẻ trâu như ngày nào", "Lão hóa ngược", "Đã đến lúc lấy chồng/vợ"], ans: 1 },
    { q: "Nếu trúng số 10 tỷ, điều đầu tiên bạn làm với tôi là gì?", opts: ["Bao đi ăn lẩu ngay và luôn", "Mua vé VIP concert Cortis", "Phát card 500k", "Quên luôn người bạn này"], ans: 0 },
    { q: "Điểm đáng yêu nhất của bạn là gì?", opts: ["Không có điểm nào", "Rất hay bao đi ăn", "Độ simp Cortis", "Lâu lâu bị khùng"], ans: 3 },
    { q: "Khi nghe nhạc Cortis, biểu hiện của bạn thường là...", opts: ["Hát nghêu ngao sai tông", "Nhắm mắt deep deep", "Ngủ gật", "Bắt người khác phải nghe cùng"], ans: 0 },
    { q: "Món quà sinh nhật nào làm bạn 'rung rinh' nhất?", opts: ["Chuyển khoản ting ting", "Suýt soát đạt điểm đậu", "Album Cortis có chữ ký", "Thẻ đen quyền lực"], ans: 2 },
    { q: "Người bạn (là tui nè) trong mắt bạn trông như thế nào?", opts: ["Đẹp tuyệt trần", "Nhiều tiền hay bao", "Hơi ngốc nhưng nhiệt tình", "Một cục nợ đời"], ans: 0 },
    { q: "Định nghĩa về một ngày hoàn hảo của bạn?", opts: ["Nằm ườn ra giường", "Ăn, ngủ và nghe Cortis", "Chạy deadline sml", "Đi đu idol"], ans: 1 },
    { q: "Điều gì bạn không bao giờ chán?", opts: ["Ngủ", "Nghe nhạc Cortis", "Lướt tiktok", "Trà sữa full topping"], ans: 1 },

    // 10 CÂU MỚI BỔ SUNG - PHIÊN BẢN BẠN THÂN CÀ KHỊA
    { q: "Nếu tui và Cortis cùng rơi xuống nước, bạn sẽ làm gì?", opts: ["Lấy điện thoại ra livestream", "Cứu Cortis, còn tui thì... kệ", "Hét lên: Cortis ơiiii!", "Chạy đi mua ly trà sữa đứng xem"], ans: 1 },
    { q: "Câu nói nào của tui có sức mạnh 'chữa lành' tâm hồn bạn nhất?", opts: ["Code chạy được rồi kìa!", "Mai nghỉ học nha", "Nay tui bao lẩu!", "Chuyển khoản rồi check đi"], ans: 2 },
    { q: "Lý do lớn nhất khiến bạn vẫn 'ế' thâm niên là gì?", opts: ["Ảo tưởng mình là người yêu của Cortis", "Cái nết quá khó chiều", "Tại chơi với tui nên ế lây", "Tiêu chuẩn trên trời dưới vực"], ans: 0 },
    { q: "Kỹ năng sinh tồn 'vô tri' nhưng đạt tới cảnh giới của bạn là gì?", opts: ["Ngủ ngày cày đêm", "Nước đến mũi mới đi mua ống thở", "Cãi cùn không chớp mắt", "Gấp sách đi ngủ, mai tính"], ans: 1 },
    { q: "Sự kiện nào sau đây có xác suất xảy ra thấp nhất?", opts: ["Bạn tự nhiên có bồ", "Tui tự nhiên hết nghèo", "Cortis biết bạn là ai", "Chúng ta làm bài tập đúng hạn"], ans: 0 },
    { q: "Lời nói dối 'kinh điển' nhất bạn hay nói với tui là gì?", opts: ["Tui đang trên đường tới! (Vừa mới dậy)", "Tui hết tiền rồi (vừa mua đồ đu idol)", "Mai tui sẽ học hành chăm chỉ", "Tui ăn ít lắm"], ans: 0 },
    { q: "Phản ứng chân thật nhất của bạn khi deadline dí tới đít?", opts: ["Bật mode siêu nhân 200%", "Nằm khóc ăn vạ", "Đi ngủ, hy vọng mai có phép màu", "Bật nhạc Cortis lên quẩy trốn tránh thực tại"], ans: 3 },
    { q: "Tần suất bạn thao túng tâm lý tui bằng nhạc Cortis là bao nhiêu?", opts: ["Thỉnh thoảng mới bật", "1 tiếng/ngày", "25/24 tiếng", "Lúc tui ngủ mới tha"], ans: 2 },
    { q: "Nếu được chọn một siêu năng lực, bạn sẽ chọn gì?", opts: ["Ăn vạn vật không béo", "Bắt tui làm osin sai vặt", "Dịch chuyển tức thời tới chỗ Cortis", "Có não siêu phàm để pass môn"], ans: 2 },
    { q: "Tóm lại, tình bạn của chúng ta tồn tại vững bền là nhờ đâu?", opts: ["Cùng ế và cùng nghèo", "Chưa tìm được ai khác chơi cùng", "Sự chịu đựng phi thường của tui", "Tui bị ép buộc"], ans: 2 }

];

let selectedQuestions = [];
let currentQuizIndex = 0;
let quizScore = 0;

// Bấm hộp quà số 3 (Đố vui)
if (giftSecret3) {
    giftSecret3.addEventListener('click', () => {
        // Reset Quiz
        currentQuizIndex = 0;
        quizScore = 0;
        
        // Random chọn 5 câu hỏi từ ngân hàng 10 câu
        selectedQuestions = [...questionBank].sort(() => 0.5 - Math.random()).slice(0, 5);
        
        quizResultBox.classList.add('hidden');
        quizBox.classList.remove('hidden');
        
        loadQuestion();
        
        quizOverlay.classList.remove('hidden');
        quizOverlay.classList.add('active');
    });
}

function loadQuestion() {
    const qData = selectedQuestions[currentQuizIndex];
    currentQNum.innerText = currentQuizIndex + 1;
    quizQuestion.innerText = qData.q;
    
    quizOptionsContainer.innerHTML = ''; // Xóa đáp án cũ
    
    qData.opts.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('btn-quiz-opt');
        // Thêm A, B, C, D cho đẹp
        const prefix = ['A', 'B', 'C', 'D'][index];
        btn.innerHTML = `<strong>${prefix}.</strong>&nbsp;&nbsp;${opt}`;
        
        btn.addEventListener('click', () => handleAnswer(index, btn, qData.ans));
        quizOptionsContainer.appendChild(btn);
    });
}

function handleAnswer(selectedIndex, btnElement, correctIndex) {
    // Khóa các nút khác
    const allBtns = quizOptionsContainer.querySelectorAll('.btn-quiz-opt');
    allBtns.forEach(btn => btn.classList.add('disabled'));
    
    if (selectedIndex === correctIndex) {
        btnElement.classList.add('correct');
        quizScore++;
        if(typeof confetti === 'function') {
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } }); // Bắn pháo hoa mini
        }
    } else {
        btnElement.classList.add('wrong');
        // Bôi xanh đáp án đúng
        allBtns[correctIndex].classList.add('correct');
    }
    
    // Chờ 1.5s rồi chuyển câu hoặc kết thúc
    setTimeout(() => {
        currentQuizIndex++;
        if (currentQuizIndex < 5) {
            loadQuestion();
        } else {
            showQuizResult();
        }
    }, 1500);
}

function showQuizResult() {
    quizBox.classList.add('hidden');
    quizResultBox.classList.remove('hidden');
    quizScoreNum.innerText = quizScore;
    
    // XÉT ĐIỂM TROLL
    if (quizScore === 5) {
        quizEmoji.innerText = "👑";
        quizTrollMsg.innerText = "Quá ghê gớm! Bách khoa toàn thư về Cortis và tui! Cho 10 điểm không có nhưng, xứng đáng được tui bao một chầu! 💯";
    } else if (quizScore >= 3) {
        quizEmoji.innerText = "😏";
        quizTrollMsg.innerText = `Sai mất ${5 - quizScore} câu! Nhưng thôi cũng tạm được, tình bạn này và tình yêu với Cortis vẫn còn cứu vãn được! 🤝`;
    } else if (quizScore >= 1) {
        quizEmoji.innerText = "🤡";
        quizTrollMsg.innerText = `Đúng được có ${quizScore} câu?? Mê Cortis bằng cái miệng hả? Tình bạn chúng ta có chắc bền lâu? Nhớ mặt tui đó! 😾`;
    } else {
        quizEmoji.innerText = "🗑️";
        quizTrollMsg.innerText = "0 ĐIỂM!!! Thất vọng toàn tập! Block nhau đi! (Đùa á, sinh nhật vui vẻ nha đồ ngốc!) 🤣";
    }
}

// Bấm Thoát
if (btnCloseQuiz) {
    btnCloseQuiz.addEventListener('click', () => {
        quizOverlay.classList.remove('active');
        quizOverlay.classList.add('hidden');
    });
}

// =================================================================
// LOGIC VÒNG QUAY MAY MẮN (GIFT 4)
// =================================================================
const wheelOverlay = document.getElementById('wheelOverlay');
const spinWheel = document.getElementById('spinWheel');
const btnSpin = document.getElementById('btnSpin');
const btnCloseWheel = document.getElementById('btnCloseWheel');

const wheelResultPopup = document.getElementById('wheelResultPopup');
const wheelResultIcon = document.getElementById('wheelResultIcon');
const wheelResultTitle = document.getElementById('wheelResultTitle');
const wheelResultDesc = document.getElementById('wheelResultDesc');
const btnAcceptWheelResult = document.getElementById('btnAcceptWheelResult');

let currentRotation = 0;
let isSpinning = false;

// KHO DỮ LIỆU CỰC KHỦNG CHO TỪNG Ô
const wheelData = [
    { 
        type: "Khen", icon: "🎀", title: "Thảo Mai Một Chút!", color: "#ff7675",
        contents: [
            "Công nhận nay sinh nhật trông giao diện cũng ra dáng idol phết đấy! ✨",
            "Dù hay cọc nhưng được cái... hay bao tui ăn! Điểm 10 chất lượng! 🍲",
            "Trình độ cãi cùn dạo này lên level rồi đấy, nể nha! 📈",
            "Mặc dù hay bắt tui nghe Cortis cùng, nhưng thôi nay sinh nhật tui nhịn 😌",
            "Váy vóc lụa là hôm nay trông cũng 'giống con gái' phết! 👗"
        ]
    },
    { 
        type: "Fact", icon: "🧠", title: "Sự Thật Phũ Phàng", color: "#fdcb6e",
        contents: [
            "Fact: Bà mê Cortis đến mức tui thuộc lòng mấy bài đó luôn dù tui hổng có mê! 🎧",
            "Sự thật là... tui đã phải nhịn bà hơi bị nhiều rồi đó nha! 😤",
            "Bí mật: Cái vòng quay này tui tự code đấy, uy tín 100% không gian lận! 💻",
            "Fun fact: Trái đất quay quanh mặt trời, còn tui thì quay cuồng fix bug web này cho bà 🥲",
            "Fact: Bà là đứa ồn ào nhất cái xóm này, nhưng thiếu thì lại thấy buồn! 👻"
        ]
    },
    { 
        type: "Thách", icon: "🎯", title: "Thử Thách Lầy Lội", color: "#00cec9",
        contents: [
            "Thách bà mở bài của Cortis lên và quẩy ngay tại chỗ! Không quẩy phạt 1 ly tà tưa! 🕺",
            "Bao tui một ly trà sữa full topping coi như phí bảo trì cái web này! 🧋",
            "Kể một tật xấu của bà mà tui chưa từng biết xem nào! 🤫",
            "Nhắn tin xin lỗi tui vì những lần bắt tui nghe nhạc Cortis đi! 🤣",
            "Chụp một tấm hình 'dìm hàng' nhất của bà ngay lúc này và cài làm avatar 10 phút! 📸"
        ]
    },
    { 
        type: "Troll", icon: "🤡", title: "Quê Xệ Chưa?", color: "#a29bfe",
        contents: [
            "Chúc mừng bà đã quay trúng ô... mất lượt! Quay lại từ đầu nha lêu lêu! 😛",
            "Vũ trụ gửi tín hiệu: Hôm nay bà nghiệp quá, khỏi nhận quà! 🌪️",
            "Quà sinh nhật à? Tui làm cái web này là món quà to bự nhất rồi, bớt đòi hỏi! 🎁",
            "Hệ thống đang lỗi! Vui lòng nạp 50k vào tài khoản IT để quay tiếp! 💸",
            "Đáng ra ô này được tặng tiền đó, nhưng tui lỡ tiêu hết rùi =))) 🏃‍♂️"
        ]
    },
    { 
        type: "May", icon: "🍀", title: "Hên Quá Ta!", color: "#74b9ff",
        contents: [
            "Được quyền sai vặt tui 1 lần (nhưng cấm sai sửa bug lúc nửa đêm)! 🧞‍♂️",
            "Trúng mánh! Lát nữa đi ăn tui sẽ trả tiền... giữ xe cho bà! 🏍️",
            "Vũ trụ tặng bà 1000 điểm may mắn để năm nay bớt ế! 🌟",
            "Đặc quyền: Hôm nay bà nói gì tui cũng gật đầu (trừ việc mượn tiền)! 👑",
            "Được tui cap màn hình lại khoảnh khắc xinh nhất hôm nay! Cười lên 📸"
        ]
    },
    { 
        type: "Xui", icon: "🌚", title: "Xui Rùi Nhan Khúc", color: "#d63031",
        contents: [
            "Ôi không! Quay trúng ô này là bà nợ tui một chầu lẩu rồi! Tự giác nha! 🍲",
            "Xui quá, hôm nay bị cấm nhắc tới Cortis trong vòng 24h! 🚫",
            "Trừ 10 điểm nhân phẩm! Tự giác khao tui ăn sáng ngày mai! 🥐",
            "Hình phạt: Hãy khen tui 3 câu liên tiếp mà không được ngượng miệng! 😼",
            "Bà đã rơi vào ô đen tối. Tối nay cấm ngủ, ngồi canh deadline cho tui! 🌙"
        ]
    }
];

// Mở Vòng Quay
if (giftSecret4) {
    giftSecret4.addEventListener('click', () => {
        wheelOverlay.classList.remove('hidden');
        wheelOverlay.classList.add('active');
        wheelResultPopup.classList.add('hidden'); // Ẩn popup kết quả nếu còn
    });
}

// Đóng Vòng Quay
if (btnCloseWheel) {
    btnCloseWheel.addEventListener('click', () => {
        if(!isSpinning) {
            wheelOverlay.classList.remove('active');
            wheelOverlay.classList.add('hidden');
        }
    });
}

// Xử lý Quay
if (btnSpin) {
    btnSpin.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;
        btnSpin.disabled = true; // Khóa nút
        
        // Tính toán độ xoay: Xoay ít nhất 5 vòng (1800 độ) + độ random (0 - 360)
        const randomDeg = Math.floor(Math.random() * 360);
        currentRotation += 1800 + randomDeg; 
        
        spinWheel.style.transform = `rotate(${currentRotation}deg)`;
        
        // Đợi 4 giây cho vòng quay dừng hẳn
        setTimeout(() => {
            isSpinning = false;
            btnSpin.disabled = false;
            
            // Tính toán ô chiến thắng
            // Vì vòng quay xoay theo chiều kim đồng hồ, ta dùng công thức modulo
            const finalDeg = currentRotation % 360;
            // 0 độ là ô Khen (chỉ mục 0). Nếu xoay kim đồng hồ, ô hiện tại ở mốc 0 độ sẽ lùi lại.
            const winningIndex = Math.floor(((360 - finalDeg) % 360) / 60);
            
            showWheelResult(winningIndex);
            
            // Bắn pháo hoa ăn mừng (hoặc trêu chọc)
            if(typeof confetti === 'function') {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
        }, 4000); 
    });
}

function showWheelResult(index) {
    const category = wheelData[index];
    // Lấy random 1 câu trong mảng contents của ô đó
    const randomContent = category.contents[Math.floor(Math.random() * category.contents.length)];
    
    wheelResultIcon.innerText = category.icon;
    wheelResultTitle.innerText = category.title;
    wheelResultTitle.style.color = category.color;
    wheelResultDesc.innerText = randomContent;
    
    wheelResultPopup.classList.remove('hidden');
}

// Tắt Popup Kết quả
if (btnAcceptWheelResult) {
    btnAcceptWheelResult.addEventListener('click', () => {
        wheelResultPopup.classList.add('hidden');
    });
}

// =================================================================
// LOGIC QUÀ CHỐT SỔ (BẤM VÀO TIÊU ĐỀ KHO QUÀ BÍ MẬT)
// =================================================================

// Tạo dữ liệu tách biệt hoàn toàn khỏi 4 hộp quà kia
const giftChotSo = {
    id: 5, giftName: "Quà Chốt Sổ", icon: "🎟️", 
    image: "images/qua-chot-so.jpg", 
    title: "Quyết không lẻ loi!", recipient: "Lá thư cuối cùng",
    wishText: "Surprise!!! Tưởng hết rồi đúng hông? Thực ra chiếc phiếu cuối không có gì đâu, chỉ là nhóm có 5 thành viên mà thiếu 1 thì lẻ loi quá heheee 😼🎉",
    signature: "- Ký tên: Master giấu quà -"
};

// Bắt sự kiện click vào cái bảng Header "Kho Quà Bí Mật"
const headerGiftButton = document.querySelector('#homeScreen .home-header');
if (headerGiftButton) {
    headerGiftButton.addEventListener('click', () => {
        // Mở Form xác nhận y hệt như khi bấm vào hộp quà
        showConfirmModal(giftChotSo);
    });
}

// ================= KHỞI CHẠY HỆ THỐNG =================
renderGifts();
createPetals();
startContinuousFestive(); // Mặc định bật tua rua khi vừa vào trang

