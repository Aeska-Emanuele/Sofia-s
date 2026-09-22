(() => {
  const whatsappNumber = "5531972598553";

  const generalMessage =
    "Olá, Sophia! Gostaria de agendar um horário. Vim pelo site.";

  const whatsappUrl = (message) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  /* =========================================================
     ELEMENTOS PRINCIPAIS
     ========================================================= */

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");

  /* =========================================================
     WHATSAPP GERAL
     ========================================================= */

  document
    .querySelectorAll('[data-whatsapp="general"]')
    .forEach((link) => {
      link.href = whatsappUrl(generalMessage);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });

  /* =========================================================
     MENU MOBILE
     ========================================================= */

  const closeMenu = () => {
    if (!menu || !toggle) return;

    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");

      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu",
      );
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  /* =========================================================
     CABEÇALHO AO ROLAR
     ========================================================= */

  if (header) {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 16);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* =========================================================
     GALERIA / LIGHTBOX
     ========================================================= */

  const galleryItems = [
    ...document.querySelectorAll(".gallery-item"),
  ];

  const lightbox = document.querySelector("#gallery-lightbox");
  const lightboxImage = lightbox?.querySelector(".lightbox-image");
  const lightboxClose = lightbox?.querySelector(".lightbox-close");
  const lightboxPrev = lightbox?.querySelector(".lightbox-prev");
  const lightboxNext = lightbox?.querySelector(".lightbox-next");

  let activeIndex = 0;

  const showImage = (index) => {
    if (!galleryItems.length || !lightboxImage) return;

    activeIndex =
      (index + galleryItems.length) % galleryItems.length;

    const image = galleryItems[activeIndex].querySelector("img");

    if (!image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "Foto da galeria Sophia.artnails";
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      showImage(index);

      if (lightbox?.showModal) {
        lightbox.showModal();
      }
    });
  });

  lightboxClose?.addEventListener("click", () => {
    lightbox.close();
  });

  lightboxPrev?.addEventListener("click", () => {
    showImage(activeIndex - 1);
  });

  lightboxNext?.addEventListener("click", () => {
    showImage(activeIndex + 1);
  });

  lightbox?.addEventListener("click", (event) => {
    const bounds = lightbox.getBoundingClientRect();

    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      lightbox.close();
    }
  });

  /* =========================================================
     TECLADO DA GALERIA
     ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (!lightbox?.open) return;

    if (event.key === "Escape") {
      lightbox.close();
    }

    if (event.key === "ArrowLeft") {
      showImage(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showImage(activeIndex + 1);
    }
  });

  /* =========================================================
     AGENDAMENTO
     ========================================================= */

  const bookingModal = document.querySelector("#booking-modal");
  const bookingForm = document.querySelector("#booking-form");

  const bookingService = document.querySelector("#booking-service");
  const bookingPrice = document.querySelector("#booking-price");
  const bookingDuration = document.querySelector("#booking-duration");
  const bookingDescription = document.querySelector(
    "#booking-description",
  );

  const bookingName = document.querySelector("#booking-name");
  const bookingDate = document.querySelector("#booking-date");
  const bookingTime = document.querySelector("#booking-time");
  const bookingNotes = document.querySelector("#booking-notes");

  const bookingClose = document.querySelector("#booking-close");
  const bookingButtons = [
    ...document.querySelectorAll(".js-open-booking"),
  ];

  let selectedService = {
    name: "",
    price: "",
    duration: 0,
    description: "",
    durability: "",
  };

  /* =========================================================
     CONFIGURAÇÃO DE HORÁRIOS
     ========================================================= */

  const businessHours = {
    0: {
      start: 14 * 60,
      end: 23 * 60,
    },
    1: {
      start: 18 * 60,
      end: 23 * 60,
    },
    2: {
      start: 18 * 60,
      end: 23 * 60,
    },
    3: {
      start: 18 * 60,
      end: 23 * 60,
    },
    4: {
      start: 18 * 60,
      end: 23 * 60,
    },
    5: {
      start: 18 * 60,
      end: 23 * 60,
    },
    6: {
      start: 19 * 60,
      end: 23 * 60,
    },
  };

  /*
   * Horários aparecem de 30 em 30 minutos.
   *
   * Exemplo:
   * 120 min -> último início possível às 21h
   * 90 min  -> último início possível às 21h30
   * 60 min  -> último início possível às 22h
   * 30 min  -> último início possível às 22h30
   */

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0",
    )}`;
  };

  const getLocalDateString = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getSelectedDate = () => {
    if (!bookingDate?.value) return null;

    const [year, month, day] = bookingDate.value
      .split("-")
      .map(Number);

    const date = new Date(year, month - 1, day);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  };

  const getDayHours = (date) => {
    if (!date) return null;

    return businessHours[date.getDay()] || null;
  };

  const populateTimeOptions = () => {
    if (!bookingTime) return;

    bookingTime.innerHTML =
      '<option value="">Selecione</option>';

    const selectedDate = getSelectedDate();
    const hours = getDayHours(selectedDate);

    if (!selectedDate || !hours) {
      return;
    }

    const lastStart = hours.end - selectedService.duration;

    if (lastStart < hours.start) {
      bookingTime.innerHTML =
        '<option value="">Nenhum horário disponível</option>';

      return;
    }

    const now = new Date();
    const todayString = getLocalDateString(now);
    const selectedDateString = bookingDate.value;

    for (
      let minutes = hours.start;
      minutes <= lastStart;
      minutes += 30
    ) {
      /*
       * Se a pessoa estiver tentando agendar para hoje,
       * não mostramos horários que já passaram.
       */
      if (selectedDateString === todayString) {
        const currentMinutes =
          now.getHours() * 60 + now.getMinutes();

        if (minutes <= currentMinutes) {
          continue;
        }
      }

      const option = document.createElement("option");

      option.value = formatTime(minutes);
      option.textContent = formatTime(minutes);

      bookingTime.appendChild(option);
    }

    if (bookingTime.options.length === 1) {
      bookingTime.innerHTML =
        '<option value="">Nenhum horário disponível para hoje</option>';
    }
  };

  const setMinimumDate = () => {
    if (!bookingDate) return;

    bookingDate.min = getLocalDateString();
  };

  const formatDateForMessage = (dateString) => {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-");

    return `${day}/${month}/${year}`;
  };

  const formatDuration = (minutes) => {
    if (minutes === 30) return "30 minutos";

    if (minutes === 60) return "1 hora";

    if (minutes === 90) return "1 hora e 30 minutos";

    if (minutes === 120) return "2 horas";

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours} horas`;
    }

    return `${hours}h ${remainingMinutes}min`;
  };

  /* =========================================================
     ABRIR AGENDAMENTO
     ========================================================= */

  const openBooking = (button) => {
    selectedService = {
      name: button.dataset.service || "",
      price: button.dataset.price || "",
      duration: Number(button.dataset.duration || 0),
      description: button.dataset.description || "",
      durability: button.dataset.durability || "",
    };

    if (bookingService) {
      bookingService.textContent = selectedService.name;
    }

    if (bookingPrice) {
      bookingPrice.textContent = selectedService.price;
    }

    if (bookingDuration) {
      bookingDuration.textContent = formatDuration(
        selectedService.duration,
      );
    }

    if (bookingDescription) {
      bookingDescription.textContent =
        selectedService.description ||
        "Preencha os dados abaixo e continue pelo WhatsApp.";
    }

    if (bookingDate) {
      bookingDate.value = "";
    }

    if (bookingTime) {
      bookingTime.innerHTML =
        '<option value="">Selecione a data primeiro</option>';
    }

    if (bookingNotes) {
      bookingNotes.value = "";
    }

    if (bookingModal?.showModal) {
      bookingModal.showModal();
    }

    setTimeout(() => {
      bookingName?.focus();
    }, 100);
  };

  bookingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openBooking(button);
    });
  });

  /* =========================================================
     DATA ALTERADA
     ========================================================= */

  bookingDate?.addEventListener("change", () => {
    populateTimeOptions();
  });

  /* =========================================================
     FECHAR AGENDAMENTO
     ========================================================= */

  bookingClose?.addEventListener("click", () => {
    bookingModal.close();
  });

  bookingModal?.addEventListener("click", (event) => {
    const bounds = bookingModal.getBoundingClientRect();

    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      bookingModal.close();
    }
  });

  /* =========================================================
     ENVIO DO AGENDAMENTO PARA WHATSAPP
     ========================================================= */

  bookingForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingName?.value.trim()) {
      bookingName?.focus();
      return;
    }

    if (!bookingDate?.value) {
      bookingDate?.focus();
      return;
    }

    if (!bookingTime?.value) {
      bookingTime?.focus();
      return;
    }

    const name = bookingName.value.trim();
    const date = formatDateForMessage(bookingDate.value);
    const time = bookingTime.value;
    const notes = bookingNotes?.value.trim() || "";

    const message = [
      "Olá, Sophia! Gostaria de solicitar um agendamento.",
      "",
      `Nome: ${name}`,
      `Procedimento: ${selectedService.name}`,
      `Valor: ${selectedService.price}`,
      `Data desejada: ${date}`,
      `Horário desejado: ${time}`,
      notes ? `Observação: ${notes}` : "",
      "",
      "Se esse horário estiver disponível, pode confirmar para mim, por favor?",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      whatsappUrl(message),
      "_blank",
      "noopener,noreferrer",
    );

    bookingModal.close();
  });

  /* =========================================================
     DATA MÍNIMA
     ========================================================= */

  setMinimumDate();

  /* =========================================================
     ANIMAÇÕES DE ENTRADA
     ========================================================= */

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
  } else {
    document
      .querySelectorAll(".reveal")
      .forEach((element) => {
        element.classList.add("visible");
      });
  }

  /* =========================================================
     ANO DO RODAPÉ
     ========================================================= */

  const currentYear = document.querySelector("#current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
})();