document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     CONFIGURAÇÃO
  ======================================================= */

  const WHATSAPP_NUMBER = "5531972598553";

  /* =======================================================
     MENU MOBILE
  ======================================================= */

  const menuButton = document.querySelector(".mobile-menu-button");
  const menu = document.querySelector("#site-menu");

  const closeMenu = () => {
    if (!menu || !menuButton) return;

    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  };

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  /* =======================================================
     HEADER AO ROLAR
  ======================================================= */

  const header = document.querySelector(".site-header");

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  /* =======================================================
     ANIMAÇÕES DE ENTRADA
  ======================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

  /* =======================================================
     AGENDAMENTO
  ======================================================= */

  const bookingModal = document.querySelector("#agendamento");
  const bookingForm = document.querySelector("#booking-form");
  const bookingClose = document.querySelector(".modal-close");
  const bookingService = document.querySelector("#booking-service");
  const bookingDate = document.querySelector("#booking-date");
  const bookingWhatsapp = document.querySelector("#booking-whatsapp");

  /* =======================================================
     DATA MÍNIMA
  ======================================================= */

  if (bookingDate) {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    bookingDate.min = `${year}-${month}-${day}`;
  }

  /* =======================================================
     MÁSCARA WHATSAPP
  ======================================================= */

  if (bookingWhatsapp) {
    bookingWhatsapp.addEventListener("input", () => {
      let value = bookingWhatsapp.value
        .replace(/\D/g, "")
        .slice(0, 11);

      if (value.length > 10) {
        value = value.replace(
          /^(\d{2})(\d{5})(\d{0,4})/,
          "($1) $2-$3"
        );
      } else if (value.length > 6) {
        value = value.replace(
          /^(\d{2})(\d{4})(\d{0,4})/,
          "($1) $2-$3"
        );
      } else if (value.length > 2) {
        value = value.replace(
          /^(\d{2})(\d{0,5})/,
          "($1) $2"
        );
      } else {
        value = value.replace(/^(\d{0,2})/, "($1");
      }

      bookingWhatsapp.value = value;
    });
  }

  /* =======================================================
     ABRIR MODAL
  ======================================================= */

  const openBooking = (service = "") => {
    closeMenu();

    if (!bookingModal) return;

    if (service && bookingService) {
      bookingService.value = service;
    }

    if (typeof bookingModal.showModal === "function") {
      bookingModal.showModal();
    } else {
      bookingModal.setAttribute("open", "");
    }

    setTimeout(() => {
      document.querySelector("#booking-name")?.focus();
    }, 100);
  };

  /* =======================================================
     BOTÕES DE AGENDAMENTO
  ======================================================= */

  document.querySelectorAll("[data-booking-open]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const service = button.dataset.service || "";

      openBooking(service);
    });
  });

  /* =======================================================
     FECHAR MODAL
  ======================================================= */

  if (bookingClose && bookingModal) {
    bookingClose.addEventListener("click", () => {
      bookingModal.close();
    });
  }

  if (bookingModal) {
    bookingModal.addEventListener("click", (event) => {
      if (event.target === bookingModal) {
        bookingModal.close();
      }
    });
  }

  /* =======================================================
     ENVIAR FORMULÁRIO
  ======================================================= */

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nome = document
        .querySelector("#booking-name")
        ?.value.trim();

      const whatsapp = document
        .querySelector("#booking-whatsapp")
        ?.value.trim();

      const servico = bookingService?.value;
      const data = bookingDate?.value;

      const horario = document
        .querySelector("#booking-time")
        ?.value;

      if (!nome || !whatsapp || !servico || !data || !horario) {
        return;
      }

      const [year, month, day] = data.split("-");
      const dataFormatada = `${day}/${month}/${year}`;

      const mensagem = `Olá, Sophia! Gostaria de agendar um horário. 💅

📋 DADOS DO AGENDAMENTO

Nome: ${nome}
WhatsApp: ${whatsapp}

💅 Serviço: ${servico}
📅 Data: ${dataFormatada}
⏰ Horário: ${horario}

Aguardo a confirmação do horário. 💕`;

      const linkWhatsApp =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

      window.open(linkWhatsApp, "_blank");

      if (bookingModal) {
        bookingModal.close();
      }
    });
  }

  /* =======================================================
     LIGHTBOX
  ======================================================= */

  const galleryItems = [
    ...document.querySelectorAll(".gallery-item")
  ];

  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox?.querySelector("figure img");
  const lightboxCaption = lightbox?.querySelector("figcaption");
  const lightboxClose = lightbox?.querySelector(".lightbox-close");
  const lightboxPrev = lightbox?.querySelector(".lightbox-prev");
  const lightboxNext = lightbox?.querySelector(".lightbox-next");

  let currentIndex = 0;

  const showImage = (index) => {
    if (!galleryItems.length || !lightboxImage) return;

    currentIndex =
      (index + galleryItems.length) % galleryItems.length;

    const item = galleryItems[currentIndex];
    const image = item.querySelector("img");

    if (!image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    if (lightboxCaption) {
      lightboxCaption.textContent =
        `Trabalho ${currentIndex + 1}`;
    }
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      showImage(index);

      if (typeof lightbox?.showModal === "function") {
        lightbox.showModal();
      }
    });
  });

  lightboxClose?.addEventListener("click", () => {
    lightbox.close();
  });

  lightboxPrev?.addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  lightboxNext?.addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.open) return;

    if (event.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showImage(currentIndex + 1);
    }
  });

  /* =======================================================
     ANO DO RODAPÉ
  ======================================================= */

  const yearElement = document.querySelector("#year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* =======================================================
     BRILHO DINÂMICO — BOTÕES E CARDS
  ======================================================= */

  const glowElements = document.querySelectorAll(
    ".button, .text-link, .service-card, .art-card-main, .about-mark, .benefit, .hours-card, .contact-card"
  );

  glowElements.forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      element.style.setProperty("--glow-x", `${x}px`);
      element.style.setProperty("--glow-y", `${y}px`);
    });
  });

  /* =======================================================
     PARALLAX Y2K — MOVIMENTO DURANTE A ROLAGEM
  ======================================================= */

  const parallaxElements = document.querySelectorAll(
    ".floating-star, .hero-orb"
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (parallaxElements.length && !prefersReducedMotion) {
    let ticking = false;

    const updateParallax = () => {
      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        const speed = element.classList.contains("floating-star")
          ? 0.12
          : 0.07;

        const distance =
          (window.innerHeight / 2 -
            (rect.top + rect.height / 2)) * speed;

        const movement = Math.max(
          -22,
          Math.min(22, distance)
        );

        element.style.setProperty(
          "--parallax-y",
          `${movement}px`
        );
      });

      ticking = false;
    };

    const requestParallaxUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestParallaxUpdate, {
      passive: true
    });

    window.addEventListener("resize", requestParallaxUpdate);

    updateParallax();
  }
});