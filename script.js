window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 0';
        navbar.style.backgroundColor = 'rgba(244, 241, 236, 0.95)'; // Cream pekat saat scroll
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
    } else {
        navbar.style.padding = '25px 0';
        navbar.style.backgroundColor = 'rgba(244, 241, 236, 0.8)'; // Transparan saat di atas
        navbar.style.boxShadow = 'none';
    }
});
// 1. Smooth scroll dengan offset untuk Navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 3. Animasi Reveal (Intersection Observer) - GABUNGAN & FIX ERROR Enhanced Reveal on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Daftarkan semua elemen yang ingin diberi animasi masuk
    const elementsToReveal = document.querySelectorAll('section, .product-card, .testimonial-card, .about-image, .contact-info');
    
    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Jalankan juga efek mengetik yang sudah ada sebelumnya
    if (document.getElementById("typing-text")) {
        handleTyping();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const promoPopup = document.getElementById('promo-popup');
    const closePopupButton = document.getElementById('close-btn');

    // Munculkan pop-up setelah 3 detik
    setTimeout(() => {
        if (promoPopup) {
            promoPopup.classList.add('show');
        }
    }, 3000);

    // Klik tombol close
    if (closePopupButton) {
        closePopupButton.addEventListener('click', () => {
            promoPopup.classList.remove('show');
        });
    }

    // Klik di luar box untuk menutup
    window.addEventListener('click', (e) => {
        if (e.target === promoPopup) {
            promoPopup.classList.remove('show');
        }
    });
});

// Efek Mengetik Berulang (Looping Typing Effect)
const typingElement = document.getElementById("typing-text");
const textArray = ["PASTWEAR"];
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 400;
const backSpeed = 200;
const delayBetweenLoop = 4000; // Jeda 2 detik sebelum terhapus kembali

function handleTyping() {
    const currentText = textArray[0];
    
    if (isDeleting) {
        // Menghapus karakter
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Menambah karakter
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let dynamicSpeed = isDeleting ? backSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentText.length) {
        // Jika sudah selesai mengetik, tunggu sebentar lalu mulai hapus
        dynamicSpeed = delayBetweenLoop;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Jika sudah selesai menghapus, mulai ketik lagi
        isDeleting = false;
        dynamicSpeed = 500;
    }

    setTimeout(handleTyping, dynamicSpeed);
}

// Jalankan saat dokumen siap
document.addEventListener('DOMContentLoaded', () => {
    if (typingElement) {
        handleTyping();
    }
});

// Menutup menu hamburger otomatis saat link diklik (khusus mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            menuToggle.checked = false;
        }
    });
});

// GANTI DENGAN URL DARI GOOGLE APPS SCRIPT KAMU
const scriptURL = 'https://script.google.com/macros/s/AKfycbyFIVW8Nh4-PWgSlBjZtGOq2aJFoq6F9esIefzefzzkLho5ssEYwvx1U6cT1w4XmtFA/exec';

document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const reviewsContainer = document.getElementById('reviews-container');

    // 1. Fungsi mengambil data "Approved" dari Google Sheets
    function fetchPublicReviews() {
        fetch(scriptURL)
            .then(response => response.json())
            .then(data => {
                reviewsContainer.innerHTML = ''; // Bersihkan container
                data.forEach(review => {
                    addReviewToDOM(review.name, review.message);
                });
            })
            .catch(error => console.error('Error!', error.message));
    }

    function addReviewToDOM(name, msg) {
    const track = document.getElementById('reviews-container');
    const card = document.createElement('div');
    card.className = 'testimonial-card'; 
    card.innerHTML = `
        <p>"${msg}"</p>
        <span>- ${name}</span>
    `;
    track.appendChild(card);
}

// Tambahkan logika Auto-Scroll Sederhana
let scrollAmount = 0;
function autoScroll() {
    const track = document.getElementById('reviews-container');
    if (track && track.children.length > 2) {
        scrollAmount += 380; // Lebar kartu + gap
        if (scrollAmount >= track.scrollWidth - track.clientWidth) {
            scrollAmount = 0;
        }
        track.style.transform = `translateX(-${scrollAmount}px)`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('reviews-container');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentScroll = 0;

    function moveSlider(direction) {
        const cardWidth = 380; // Lebar kartu + gap
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (direction === 'next') {
            currentScroll += cardWidth;
            if (currentScroll > maxScroll) currentScroll = 0; // Reset ke awal
        } else {
            currentScroll -= cardWidth;
            if (currentScroll < 0) currentScroll = maxScroll; // Reset ke akhir
        }

        track.style.transform = `translateX(-${currentScroll}px)`;
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => moveSlider('next'));
        prevBtn.addEventListener('click', () => moveSlider('prev'));
    }
});

let currentIndex = 0;

// Fungsi ini harus dipanggil di dalam fetchPublicReviews setelah data didapat
function initDots(total) {
    const dotsContainer = document.getElementById('testimonialDots');
    dotsContainer.innerHTML = ''; 
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = (i === 0) ? 'dot active' : 'dot';
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function goToSlide(index) {
    const track = document.getElementById('reviews-container');
    const cards = document.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;

    currentIndex = index;
    const cardWidth = cards[0].offsetWidth + 30; // 30 adalah gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Update warna titik
    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
    });
}

// Hubungkan ke tombol panah
document.getElementById('nextBtn').addEventListener('click', () => {
    const total = document.querySelectorAll('.testimonial-card').length;
    currentIndex = (currentIndex + 1) % total;
    goToSlide(currentIndex);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    const total = document.querySelectorAll('.testimonial-card').length;
    currentIndex = (currentIndex - 1 + total) % total;
    goToSlide(currentIndex);
});

function initDots(total) {
    const dotsContainer = document.getElementById('testimonialDots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = ''; 
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = (i === 0) ? 'dot active' : 'dot';
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

// Panggil initDots(data.length) di dalam fungsi fetchPublicReviews kamu!

    // 2. Kirim data ke Google Sheets
    if(commentForm) {
        commentForm.addEventListener('submit', e => {
            e.preventDefault();
            const submitBtn = commentForm.querySelector('button');
            submitBtn.disabled = true;
            submitBtn.innerText = "Mengirim...";

            const formData = new FormData();
            formData.append('name', document.getElementById('reviewer-name').value);
            formData.append('message', document.getElementById('reviewer-msg').value);

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    alert('Terima kasih! Ulasan Kamu telah disimpan dan menunggu persetujuan.');
                    commentForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Post Review";
                })
                .catch(error => console.error('Error!', error.message));
        });
    }

    fetchPublicReviews(); // Panggil review publik saat web dibuka
});