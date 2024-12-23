import { projects } from "./modals/projects.js";

document.querySelectorAll(".accordionButton").forEach((el) => {
  el.addEventListener("click", () => {
    let content = el.nextElementSibling;

    if (content.style.maxHeight) {
      document
        .querySelectorAll(".content")
        .forEach((el) => (el.style.maxHeight = null));
    } else {
      document
        .querySelectorAll(".content")
        .forEach((el) => (el.style.maxHeight = null));
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".animated-section").forEach((section) => {
    gsap.fromTo(
      section,
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
          scrub: 1, // smooth effect
        },
      }
    );
  });
});

document.querySelectorAll(".animated-section").forEach((title) => {
  title.addEventListener("mouseenter", () => {
    gsap.to(title, { scale: 1, duration: 0.3, ease: "power2.out" });
  });
  title.addEventListener("mouseleave", () => {
    gsap.to(title, { scale: 1, duration: 0.3, ease: "power2.out" });
  });
});

gsap.to(".animated-section", {
  backgroundPosition: "50% 100%",
  ease: "none",
  scrollTrigger: {
    trigger: ".animated-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

let swiperInstance = null;

function openCarousel(projectId) {
  const project = projects.find((proj) => proj.id === projectId);

  if (project) {
    const currentMediaList = Object.values(project.photo);

    // Populate the Swiper slides
    const carouselTrack = document.getElementById("carousel-track");
    carouselTrack.innerHTML = currentMediaList
      .map((mediaUrl) => renderMediaItem(mediaUrl))
      .join("");

    // Initialize Swiper if not already initialized
    if (!swiperInstance) {
      swiperInstance = new Swiper(".swiper", {
        slidesPerView: 3.5,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        loop: true,
        parallax: true,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
        },
      });
    } else {
      swiperInstance.update();
    }

    // Show the modal
    const modal = document.getElementById("carousel-modal");
    modal.style.display = "flex";
  } else {
    console.error(`Project with ID "${projectId}" not found.`);
  }
}

function closeCarousel() {
  const modal = document.getElementById("carousel-modal");
  modal.style.display = "none";
}

function renderMediaItem(mediaUrl) {
  if (/\.(mp4|MOV)$/i.test(mediaUrl)) {
    // Return video HTML
    return `
      <div class="swiper-slide">
        <video controls class="carousel-video">
          <source src="${mediaUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>`;
  } else if (/\.(JPG|jpeg|PNG|jpg)$/i.test(mediaUrl)) {
    return `
      <div class="swiper-slide">
        <img src="${mediaUrl}" class="carousel-image" alt="Project Media">
      </div>`;
  }
  // Handle unsupported media
  else {
    // Return image HTML
    return `
      <div class="swiper-slide">
        <img src="${mediaUrl}" class="carousel-image" alt="Project Media">
      </div>`;
  }
}

// Attach functions globally for HTML use
window.openCarousel = openCarousel;
window.closeCarousel = closeCarousel;
