// Sticky Header
const header = document.querySelector(".header-container");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const dropdownToggles = document.querySelectorAll(
  ".mobile-menu .dropdown-toggle"
);

hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
  hamburger.setAttribute("aria-expanded", !expanded);
  mobileMenu.classList.toggle("open");
  mobileMenu.setAttribute(
    "aria-hidden",
    mobileMenu.classList.contains("open") ? "false" : "true"
  );
  hamburger.classList.toggle("active");
});

// Mobile Dropdown Toggle
// Mobile Dropdown Toggle (fixed)
dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const dropdownMenu = toggle.nextElementSibling;
    const isOpen = dropdownMenu.classList.contains("open");

    if (isOpen) {
      // যদি আগেই খোলা থাকে → ক্লিক করলে বন্ধ হবে
      dropdownMenu.classList.remove("open");
    } else {
      // আগে সবগুলো বন্ধ করো
      document
        .querySelectorAll(".mobile-menu .dropdown-menu.open")
        .forEach((menu) => menu.classList.remove("open"));

      // তারপর যেটাতে ক্লিক হয়েছে সেটি খুলো
      dropdownMenu.classList.add("open");
    }
  });
});

// Close mobile dropdown if clicking outside
document.addEventListener("click", (e) => {
  document
    .querySelectorAll(".mobile-menu .dropdown-menu.open")
    .forEach((menu) => {
      // Only close if click is outside the menu and toggle
      const toggle = menu.previousElementSibling;
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("open");
      }
    });
});

// WhatsApp Popup
const whatsappBtn = document.getElementById("whatsappBtn");
const whatsappPopup = document.getElementById("whatsappPopup");
const closePopup = document.getElementById("closePopup");
const sendMessage = document.getElementById("sendMessage");

whatsappBtn.addEventListener("click", () => {
  whatsappPopup.style.display =
    whatsappPopup.style.display === "block" ? "none" : "block";
});

closePopup.addEventListener("click", () => {
  whatsappPopup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === whatsappPopup) {
    whatsappPopup.style.display = "none";
  }
});

sendMessage.addEventListener("click", () => {
  const name = document.getElementById("waName").value.trim();
  const message = document.getElementById("waMessage").value.trim();
  if (!name || !message) {
    alert("Please enter both your name and message.");
    return;
  }
  const phoneNumber = "8801723512512"; // Replace with your WhatsApp number
  const waMessage = `My name is ${name}. ${message}`;
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    waMessage
  )}`;
  window.open(waUrl, "_blank");
});

fetch('/blog/posts.json')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('.blog-grid');
    data.slice(0,3).forEach(post => {
      const article = document.createElement('article');
      article.classList.add('blog-card');
      article.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <h3><a href="${post.url}">${post.title}</a></h3>
        <p>${post.excerpt}</p>
      `;
      container.appendChild(article);
    });
  });

// Scroll-triggered fade-in
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.classList.add('show');
    observer.unobserve(entry);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
