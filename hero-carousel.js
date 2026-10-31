const carousel = document.querySelector(".hero");

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".hero-slide"));
  const buttons = Array.from(carousel.querySelectorAll(".hero-arrow"));
  const currentCount = carousel.querySelector(".hero-current-count");
  const caption = carousel.querySelector(".hero-caption-text");
  const captions = [
    "BMW X7 — X Series",
    "BMW M4 — High-performance coupé",
    "BMW M2 — High-performance coupé",
  ];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
  let animationTimeout;
  let autoplayInterval;

  function showSlide(direction) {
    if (slides.length < 2 || buttons[0].disabled) {
      return;
    }

    const currentSlide = slides[activeIndex];
    const nextIndex = (activeIndex + direction + slides.length) % slides.length;
    const nextSlide = slides[nextIndex];
    const enteringClass = direction > 0 ? "enter-from-right" : "enter-from-left";
    const leavingClass = direction > 0 ? "leave-to-left" : "leave-to-right";

    buttons.forEach((button) => {
      button.disabled = true;
    });
    nextSlide.classList.add(enteringClass);
    nextSlide.getBoundingClientRect();
    currentSlide.classList.remove("is-active");
    currentSlide.classList.add(leavingClass);
    nextSlide.classList.remove(enteringClass);
    nextSlide.classList.add("is-active");

    activeIndex = nextIndex;
    currentCount.textContent = String(activeIndex + 1).padStart(2, "0");
    caption.textContent = captions[activeIndex];

    window.clearTimeout(animationTimeout);
    animationTimeout = window.setTimeout(() => {
      currentSlide.classList.remove(leavingClass);
      buttons.forEach((button) => {
        button.disabled = false;
      });
    }, reducedMotion.matches ? 0 : 850);
  }

  function startAutoplay() {
    if (!reducedMotion.matches && !carousel.matches(":hover")) {
      autoplayInterval = window.setInterval(() => showSlide(1), 6500);
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      window.clearInterval(autoplayInterval);
      showSlide(button.dataset.direction === "next" ? 1 : -1);
      startAutoplay();
    });
  });

  carousel.addEventListener("mouseenter", () => window.clearInterval(autoplayInterval));
  carousel.addEventListener("mouseleave", startAutoplay);
  startAutoplay();
}
