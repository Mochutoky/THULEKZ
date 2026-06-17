(() => {
    const slider = document.querySelector(".hero-slider");

    if (!slider) {
        return;
    }

    const slides = Array.from(slider.querySelectorAll(".hero-slide"));
    const indicators = Array.from(slider.querySelectorAll(".hero-slider__indicator"));
    const defaultDuration = 5000;

    let activeIndex = 0;
    let autoAdvanceTimer = null;
    let progressFrame = null;

    slider.setAttribute("tabindex", "0");

    const resetProgress = () => {
        indicators.forEach((indicator) => {
            const fill = indicator.querySelector(".hero-slider__fill");
            if (fill) {
                fill.style.transform = "scaleX(0)";
            }
        });
    };

    const stopTimers = () => {
        if (autoAdvanceTimer) {
            window.clearTimeout(autoAdvanceTimer);
            autoAdvanceTimer = null;
        }

        if (progressFrame) {
            window.cancelAnimationFrame(progressFrame);
            progressFrame = null;
        }
    };

    const getSlideDuration = (index) => {
        const slide = slides[index];
        if (!slide) {
            return defaultDuration;
        }

        const fromData = Number.parseInt(slide.dataset.duration || "", 10);
        const video = slide.querySelector("video");

        if (video && Number.isFinite(video.duration) && video.duration > 0) {
            return Math.round(video.duration * 1000);
        }

        if (Number.isFinite(fromData) && fromData > 0) {
            return fromData;
        }

        return defaultDuration;
    };

    const syncVideos = (index) => {
        slides.forEach((slide, slideIndex) => {
            const video = slide.querySelector("video");

            if (!video) {
                return;
            }

            if (slideIndex === index) {
                video.currentTime = 0;
                const playPromise = video.play();
                if (playPromise && typeof playPromise.catch === "function") {
                    playPromise.catch(() => {});
                }
                return;
            }

            video.pause();
            video.currentTime = 0;
        });
    };

    const setActiveState = (index) => {
        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === index;
            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });

        indicators.forEach((indicator, indicatorIndex) => {
            const isActive = indicatorIndex === index;
            indicator.classList.toggle("is-active", isActive);
            indicator.setAttribute("aria-selected", String(isActive));
            indicator.tabIndex = isActive ? 0 : -1;
        });
    };

    const animateProgress = (duration) => {
        const activeFill = indicators[activeIndex]?.querySelector(".hero-slider__fill");
        const start = performance.now();
        resetProgress();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);

            if (activeFill) {
                activeFill.style.transform = `scaleX(${progress})`;
            }

            if (progress < 1) {
                progressFrame = window.requestAnimationFrame(step);
            }
        };

        progressFrame = window.requestAnimationFrame(step);
    };

    const queueNextSlide = (duration) => {
        autoAdvanceTimer = window.setTimeout(() => {
            goToSlide(activeIndex + 1);
        }, duration);
    };

    const normalizeIndex = (index) => {
        if (!slides.length) {
            return 0;
        }

        return (index + slides.length) % slides.length;
    };

    function goToSlide(index) {
        if (!slides.length) {
            return;
        }

        activeIndex = normalizeIndex(index);
        stopTimers();
        setActiveState(activeIndex);
        syncVideos(activeIndex);

        const duration = getSlideDuration(activeIndex);
        animateProgress(duration);
        queueNextSlide(duration);
    }

    indicators.forEach((indicator) => {
        indicator.addEventListener("click", () => {
            const target = Number.parseInt(indicator.dataset.slide || "", 10);
            if (!Number.isNaN(target)) {
                goToSlide(target);
            }
        });
    });

    slider.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            goToSlide(activeIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            goToSlide(activeIndex - 1);
        }
    });

    slides.forEach((slide, index) => {
        const video = slide.querySelector("video");

        if (!video) {
            return;
        }

        video.addEventListener("loadedmetadata", () => {
            if (index === activeIndex) {
                goToSlide(activeIndex);
            }
        });
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopTimers();
            return;
        }

        goToSlide(activeIndex);
    });

    goToSlide(0);
})();

(() => {
    const siteHeader = document.querySelector(".site-header");
    const menuButton = siteHeader?.querySelector(".menu-button");
    const closeButton = siteHeader?.querySelector(".menu-close");
    const navOverlay = siteHeader?.querySelector(".nav-overlay");
    const mobileNav = siteHeader?.querySelector("#mobile-nav");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    if (!siteHeader || !menuButton || !mobileNav) {
        return;
    }

    const isMenuOpen = () => siteHeader.classList.contains("is-nav-open");

    const setMenuOpen = (isOpen) => {
        siteHeader.classList.toggle("is-nav-open", isOpen);
        document.body.classList.toggle("nav-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        mobileNav.setAttribute("aria-hidden", String(mobileQuery.matches && !isOpen));
    };

    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => setMenuOpen(false);

    menuButton.addEventListener("click", openMenu);
    closeButton?.addEventListener("click", closeMenu);
    navOverlay?.addEventListener("click", closeMenu);

    mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (mobileQuery.matches) {
                closeMenu();
            }
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || !isMenuOpen()) {
            return;
        }

        closeMenu();
        menuButton.focus({ preventScroll: true });
    });

    const syncNavForViewport = () => {
        if (!mobileQuery.matches) {
            closeMenu();
            mobileNav.setAttribute("aria-hidden", "false");
            return;
        }

        mobileNav.setAttribute("aria-hidden", String(!isMenuOpen()));
    };

    syncNavForViewport();

    if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", syncNavForViewport);
        return;
    }

    mobileQuery.addListener(syncNavForViewport);
})();
