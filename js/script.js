(() => {
  const generalMessage =
    "Olá, Sophia! Gostaria de agendar um horário. Vim pelo site da Sophia.artnails.";
  const whatsappUrl = (message) =>
    `https://wa.me/5531972598553?text=${encodeURIComponent(message)}`;
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");
  const galleryItems = [...document.querySelectorAll(".gallery-item")];
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("figcaption");
  let activeIndex = 0;

  document
    .querySelectorAll('[data-whatsapp="general"]')
    .forEach((link) => (link.href = whatsappUrl(generalMessage)));
  document.querySelectorAll(".service-book").forEach((link) => {
    const { service, price } = link.dataset;
    link.href = whatsappUrl(
      `Olá, Sophia! Tenho interesse em ${service} (${price}). Gostaria de verificar um horário.`,
    );
    link.target = "_blank";
    link.rel = "noopener";
  });

  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));

  const onScroll = () =>
    header.classList.toggle("scrolled", window.scrollY > 16);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const showImage = (index) => {
    activeIndex = (index + galleryItems.length) % galleryItems.length;
    const image = galleryItems[activeIndex].querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = `Galeria — espaço ${String(activeIndex + 1).padStart(2, "0")}`;
  };
  galleryItems.forEach((item, index) =>
    item.addEventListener("click", () => {
      showImage(index);
      lightbox.showModal();
    }),
  );
  lightbox
    .querySelector(".lightbox-close")
    .addEventListener("click", () => lightbox.close());
  lightbox
    .querySelector(".lightbox-prev")
    .addEventListener("click", () => showImage(activeIndex - 1));
  lightbox
    .querySelector(".lightbox-next")
    .addEventListener("click", () => showImage(activeIndex + 1));
  lightbox.addEventListener("click", (event) => {
    const bounds = lightbox.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;
    if (clickedOutside) lightbox.close();
  });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.open) return;
    if (event.key === "Escape") lightbox.close();
    if (event.key === "ArrowLeft") showImage(activeIndex - 1);
    if (event.key === "ArrowRight") showImage(activeIndex + 1);
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
  } else
    document
      .querySelectorAll(".reveal")
      .forEach((element) => element.classList.add("visible"));
  document.querySelector("#year").textContent = new Date().getFullYear();
})();
