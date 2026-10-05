document.addEventListener("DOMContentLoaded", () => {

  const WHATSAPP_NUMBER = "5531972598553";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =========================================================
     MENU MOBILE
  ========================================================= */

  const menuButton = document.querySelector(
    ".mobile-menu-button"
  );

  const menu = document.querySelector(
    "#site-menu"
  );

  const closeMenu = () => {
    if (!menu || !menuButton) return;

    menu.classList.remove("open");
    menuButton.classList.remove("active");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Abrir menu"
    );

    document.body.classList.remove(
      "menu-open"
    );
  };

  const openMenu = () => {
    if (!menu || !menuButton) return;

    menu.classList.add("open");
    menuButton.classList.add("active");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "Fechar menu"
    );

    document.body.classList.add(
      "menu-open"
    );
  };

  if (menuButton && menu) {

    menuButton.addEventListener(
      "click",
      () => {
        if (menu.classList.contains("open")) {
          closeMenu();
        } else {
          openMenu();
        }
      }
    );

    menu.querySelectorAll("a").forEach(
      (link) => {
        link.addEventListener(
          "click",
          closeMenu
        );
      }
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape") {
          closeMenu();
        }
      }
    );

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > 760) {
          closeMenu();
        }
      }
    );
  }


  /* =========================================================
     HEADER
  ========================================================= */

  const header = document.querySelector(
    ".site-header"
  );

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );
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
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );
  }
  );


  /* =========================================================
     REVEAL REPETÍVEL
  ========================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {

    revealElements.forEach(
      (element) => {
        element.classList.add("visible");
      }
    );

  } else if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            entry.target.classList.toggle(
              "visible",
              entry.isIntersecting
            );

          });

        },
        {
          threshold: 0.08,
          rootMargin: "-10px 0px -10px 0px"
        }
      );

    revealElements.forEach(
      (element) => {
        revealObserver.observe(element);
      }
    );

  } else {

    revealElements.forEach(
      (element) => {
        element.classList.add("visible");
      }
    );
  }


  /* =========================================================
     AGENDAMENTO
  ========================================================= */

  const bookingModal =
    document.querySelector("#agendamento");

  const bookingForm =
    document.querySelector("#booking-form");

  const bookingClose =
    document.querySelector(".modal-close");

  const bookingService =
    document.querySelector("#booking-service");

  const bookingDate =
    document.querySelector("#booking-date");

  const bookingWhatsapp =
    document.querySelector("#booking-whatsapp");


  /* DATA MÍNIMA */

  if (bookingDate) {

    const today = new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        today.getDate()
      ).padStart(2, "0");

    bookingDate.min =
      `${year}-${month}-${day}`;
  }


  /* MÁSCARA DO WHATSAPP */

  if (bookingWhatsapp) {

    bookingWhatsapp.addEventListener(
      "input",
      () => {

        let value =
          bookingWhatsapp.value
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

        } else if (value.length > 0) {

          value = value.replace(
            /^(\d{0,2})/,
            "($1"
          );
        }

        bookingWhatsapp.value = value;
      }
    );
  }


  /* ABRIR AGENDAMENTO */

  const openBooking = (service = "") => {

    closeMenu();

    if (!bookingModal) return;

    if (service && bookingService) {

      const optionExists =
        Array.from(
          bookingService.options
        ).some(
          (option) =>
            option.value === service
        );

      if (optionExists) {
        bookingService.value = service;
      }
    }

    if (
      typeof bookingModal.showModal ===
        "function" &&
      !bookingModal.open
    ) {
      bookingModal.showModal();
    }

    window.setTimeout(
      () => {
        document
          .querySelector("#booking-name")
          ?.focus();
      },
      100
    );
  };


  document
    .querySelectorAll("[data-booking-open]")
    .forEach((button) => {

      button.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

          openBooking(
            button.dataset.service || ""
          );

        }
      );

    });


  bookingClose?.addEventListener(
    "click",
    () => {
      bookingModal?.close();
    }
  );


  bookingModal?.addEventListener(
    "click",
    (event) => {

      if (event.target === bookingModal) {
        bookingModal.close();
      }

    }
  );


  /* ENVIAR AGENDAMENTO */

  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        const nome =
          document
            .querySelector("#booking-name")
            ?.value.trim();

        const whatsapp =
          bookingWhatsapp?.value.trim();

        const servico =
          bookingService?.value;

        const data =
          bookingDate?.value;

        const horario =
          document
            .querySelector("#booking-time")
            ?.value;

        if (
          !nome ||
          !whatsapp ||
          !servico ||
          !data ||
          !horario
        ) {
          return;
        }

        const [
          year,
          month,
          day
        ] = data.split("-");

        const dataFormatada =
          `${day}/${month}/${year}`;

        const mensagem =
`Olá, Sophia! Gostaria de agendar um horário. 💅

📋 DADOS DO AGENDAMENTO

Nome: ${nome}
WhatsApp: ${whatsapp}

💅 Serviço: ${servico}
📅 Data: ${dataFormatada}
⏰ Horário: ${horario}

Aguardo a confirmação do horário. 💕`;

        const linkWhatsApp =
          `https://wa.me/${WHATSAPP_NUMBER}` +
          `?text=${encodeURIComponent(mensagem)}`;

        window.open(
          linkWhatsApp,
          "_blank",
          "noopener,noreferrer"
        );

        bookingModal?.close();

      }
    );
  }


  /* =========================================================
     GALERIA 3D
  ========================================================= */

  const galleryCarousel =
    document.querySelector(
      ".gallery-carousel"
    );

  const galleryItems =
    Array.from(
      document.querySelectorAll(
        ".gallery-item"
      )
    );

  const galleryPrev =
    document.querySelector(
      ".gallery-arrow-prev"
    );

  const galleryNext =
    document.querySelector(
      ".gallery-arrow-next"
    );

  const galleryCurrent =
    document.querySelector(
      "[data-gallery-current]"
    );

  const galleryTotal =
    document.querySelector(
      "[data-gallery-total]"
    );

  const galleryLength =
    galleryItems.length;

  let galleryIndex = 0;

  let isDragging = false;

  let dragStartX = 0;

  let dragOffset = 0;

  let dragMoved = false;

  let activePointerId = null;


  const formatGalleryNumber =
    (number) => {
      return String(number).padStart(
        2,
        "0"
      );
    };


  if (galleryTotal) {

    galleryTotal.textContent =
      formatGalleryNumber(
        galleryLength
      );

  }


  /* =========================================================
     DISTÂNCIA CIRCULAR
  ========================================================= */

  const circularDistance =
    (itemIndex, activeIndex) => {

      let distance =
        itemIndex - activeIndex;

      const half =
        galleryLength / 2;

      if (distance > half) {
        distance -= galleryLength;
      }

      if (distance < -half) {
        distance += galleryLength;
      }

      return distance;
    };


  /* =========================================================
     DESENHAR O CARROSSEL
  ========================================================= */

  const renderGallery =
    (interactiveOffset = 0) => {

      if (
        !galleryCarousel ||
        !galleryLength
      ) {
        return;
      }

      const mobile =
        window.innerWidth <= 760;

      const carouselWidth =
        galleryCarousel.clientWidth;

      /*
       * Distância entre o centro dos cards.
       * No mobile fica menor para deixar
       * as laterais visíveis.
       */

      const spacing = mobile
        ? Math.min(
            carouselWidth * 0.58,
            205
          )
        : Math.min(
            carouselWidth * 0.235,
            255
          );

      /*
       * O arraste vira uma fração da
       * distância entre cards.
       */

      const dragProgress =
        interactiveOffset / spacing;

      galleryItems.forEach(
        (item, itemIndex) => {

          let distance =
            circularDistance(
              itemIndex,
              galleryIndex
            );

          distance += dragProgress;

          const absoluteDistance =
            Math.abs(distance);

          /*
           * Horizontal.
           */

          const x =
            distance * spacing;


          /*
           * Arco vertical discreto.
           *
           * Centro levemente acima.
           * Laterais descem um pouco.
           */

          const y =
            Math.min(
              absoluteDistance,
              3
            ) *
            (mobile ? 7 : 10);


          /*
           * Inclinação.
           *
           * Mesma dimensão para todos.
           * Não usamos scale para criar
           * destaque.
           */

          const rotation =
            Math.max(
              -12,
              Math.min(
                12,
                distance *
                  (mobile ? -4 : -5)
              )
            );


          /*
           * Cards muito distantes
           * desaparecem.
           */

          let opacity = 1;

          if (absoluteDistance > 2.7) {
            opacity = 0;
          } else if (
            absoluteDistance > 1.8
          ) {
            opacity = 0.45;
          } else if (
            absoluteDistance > 0.8
          ) {
            opacity = 0.78;
          }


          /*
           * Todos continuam com scale 1.
           * Isso garante exatamente o
           * mesmo tamanho.
           */

          item.style.setProperty(
            "--gallery-x",
            `${x}px`
          );

          item.style.setProperty(
            "--gallery-y",
            `${y}px`
          );

          item.style.setProperty(
            "--gallery-rotate",
            `${rotation}deg`
          );

          item.style.setProperty(
            "--gallery-scale",
            "1"
          );

          item.style.setProperty(
            "--gallery-opacity",
            opacity
          );

          /*
           * Centro sempre acima.
           */

          item.style.zIndex =
            String(
              20 -
              Math.round(
                absoluteDistance * 3
              )
            );

          const isActive =
            absoluteDistance < 0.5;

          item.classList.toggle(
            "is-active",
            isActive
          );

          item.tabIndex =
            isActive ? 0 : -1;

          item.setAttribute(
            "aria-hidden",
            absoluteDistance > 2.7
              ? "true"
              : "false"
          );

        }
      );

      if (galleryCurrent) {

        galleryCurrent.textContent =
          formatGalleryNumber(
            galleryIndex + 1
          );

      }

    };


  /* =========================================================
     TROCAR FOTO
  ========================================================= */

  const setGalleryIndex =
    (newIndex) => {

      if (!galleryLength) return;

      galleryIndex =
        (
          newIndex +
          galleryLength
        ) %
        galleryLength;

      renderGallery();

    };


  const galleryForward = () => {
    setGalleryIndex(
      galleryIndex + 1
    );
  };


  const galleryBackward = () => {
    setGalleryIndex(
      galleryIndex - 1
    );
  };


  galleryNext?.addEventListener(
    "click",
    galleryForward
  );


  galleryPrev?.addEventListener(
    "click",
    galleryBackward
  );


  /* =========================================================
     ARRASTE / SWIPE
  ========================================================= */

  if (galleryCarousel) {

    galleryCarousel.addEventListener(
      "pointerdown",
      (event) => {

        if (
          event.pointerType === "mouse" &&
          event.button !== 0
        ) {
          return;
        }

        isDragging = true;
        dragMoved = false;

        activePointerId =
          event.pointerId;

        dragStartX =
          event.clientX;

        dragOffset = 0;

        galleryCarousel.classList.add(
          "is-dragging"
        );

        galleryCarousel.setPointerCapture(
          event.pointerId
        );

      }
    );


    galleryCarousel.addEventListener(
      "pointermove",
      (event) => {

        if (
          !isDragging ||
          event.pointerId !==
            activePointerId
        ) {
          return;
        }

        dragOffset =
          event.clientX -
          dragStartX;

        if (
          Math.abs(dragOffset) > 5
        ) {
          dragMoved = true;
        }

        /*
         * Limita o deslocamento para
         * manter o gesto controlado.
         */

        const maxOffset =
          galleryCarousel.clientWidth *
          0.55;

        dragOffset =
          Math.max(
            -maxOffset,
            Math.min(
              maxOffset,
              dragOffset
            )
          );

        renderGallery(
          dragOffset
        );

      }
    );


    const finishGalleryDrag =
      (event) => {

        if (
          !isDragging ||
          event.pointerId !==
            activePointerId
        ) {
          return;
        }

        isDragging = false;

        galleryCarousel.classList.remove(
          "is-dragging"
        );

        if (
          galleryCarousel.hasPointerCapture(
            event.pointerId
          )
        ) {
          galleryCarousel.releasePointerCapture(
            event.pointerId
          );
        }

        /*
         * Sensibilidade.
         *
         * Não precisa arrastar o card
         * inteiro para avançar.
         */

        const threshold =
          Math.min(
            galleryCarousel.clientWidth *
              0.1,
            55
          );

        if (
          dragOffset < -threshold
        ) {

          galleryForward();

        } else if (
          dragOffset > threshold
        ) {

          galleryBackward();

        } else {

          renderGallery();

        }

        dragOffset = 0;

        activePointerId = null;

      };


    galleryCarousel.addEventListener(
      "pointerup",
      finishGalleryDrag
    );


    galleryCarousel.addEventListener(
      "pointercancel",
      finishGalleryDrag
    );

  }


  /* =========================================================
     LIGHTBOX
  ========================================================= */

  const lightbox =
    document.querySelector(
      ".lightbox"
    );

  const lightboxImage =
    lightbox?.querySelector(
      "figure img"
    );

  const lightboxCaption =
    lightbox?.querySelector(
      "figcaption"
    );

  const lightboxClose =
    lightbox?.querySelector(
      ".lightbox-close"
    );

  const lightboxPrev =
    lightbox?.querySelector(
      ".lightbox-prev"
    );

  const lightboxNext =
    lightbox?.querySelector(
      ".lightbox-next"
    );

  let currentLightboxIndex = 0;


  const showLightboxImage =
    (index) => {

      if (
        !galleryLength ||
        !lightboxImage
      ) {
        return;
      }

      currentLightboxIndex =
        (
          index +
          galleryLength
        ) %
        galleryLength;

      const item =
        galleryItems[
          currentLightboxIndex
        ];

      const image =
        item.querySelector("img");

      if (!image) return;

      lightboxImage.src =
        image.src;

      lightboxImage.alt =
        image.alt || "";

      if (lightboxCaption) {

        lightboxCaption.textContent =
          `Trabalho ${
            currentLightboxIndex + 1
          } de ${galleryLength}`;

      }

    };


  /* =========================================================
     CLIQUE NAS FOTOS
  ========================================================= */

  galleryItems.forEach(
    (item, itemIndex) => {

      item.addEventListener(
        "click",
        (event) => {

          /*
           * Se houve swipe/arraste,
           * não abre o lightbox.
           */

          if (dragMoved) {

            event.preventDefault();

            dragMoved = false;

            return;
          }


          /*
           * Se clicou numa foto lateral,
           * primeiro traz para o centro.
           */

          if (itemIndex !== galleryIndex) {

            const distance =
              circularDistance(
                itemIndex,
                galleryIndex
              );

            if (distance > 0) {
              galleryForward();
            } else {
              galleryBackward();
            }

            return;
          }


          /*
           * Foto central abre.
           */

          showLightboxImage(
            itemIndex
          );

          if (
            typeof lightbox?.showModal ===
              "function" &&
            !lightbox.open
          ) {
            lightbox.showModal();
          }

        }
      );

    }
  );


  /* LIGHTBOX CONTROLES */

  lightboxClose?.addEventListener(
    "click",
    () => {
      lightbox?.close();
    }
  );


  lightboxPrev?.addEventListener(
    "click",
    () => {

      showLightboxImage(
        currentLightboxIndex - 1
      );

    }
  );


  lightboxNext?.addEventListener(
    "click",
    () => {

      showLightboxImage(
        currentLightboxIndex + 1
      );

    }
  );


  lightbox?.addEventListener(
    "click",
    (event) => {

      if (event.target === lightbox) {
        lightbox.close();
      }

    }
  );


  /* =========================================================
     TECLADO
  ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (lightbox?.open) {

        if (event.key === "ArrowLeft") {

          showLightboxImage(
            currentLightboxIndex - 1
          );

        }

        if (event.key === "ArrowRight") {

          showLightboxImage(
            currentLightboxIndex + 1
          );

        }

        return;
      }


      /*
       * Se o foco estiver dentro
       * da galeria, teclado também
       * controla o carrossel.
       */

      if (
        galleryCarousel?.contains(
          document.activeElement
        )
      ) {

        if (event.key === "ArrowLeft") {

          event.preventDefault();

          galleryBackward();

        }

        if (event.key === "ArrowRight") {

          event.preventDefault();

          galleryForward();

        }

      }

    }
  );


  /* =========================================================
     RESIZE
  ========================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      window.clearTimeout(
        resizeTimer
      );

      resizeTimer =
        window.setTimeout(
          () => {
            renderGallery();
          },
          80
        );

    }
  );


  /* =========================================================
     INICIALIZA GALERIA
  ========================================================= */

  renderGallery();


  /* =========================================================
     ANO
  ========================================================= */

  const yearElement =
    document.querySelector("#year");

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }

  /* =======================================================
     BRILHO DINÂMICO — BOTÕES E CARDS
  ======================================================= */

  // O glow interativo fica concentrado no hero para manter a
  // assinatura Y2K sem transformar cada componente em um efeito.
  const glowElements = document.querySelectorAll(".art-card-main");

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