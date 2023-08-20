document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const programCards = document.querySelectorAll(".program-card");
  const plateItems = document.querySelectorAll(".plate-item");
  const testimonialsContent = document.querySelectorAll(
    ".testimonials-card-content"
  );
  const prevButton = document.querySelector(".arrow-before");
  const nextButton = document.querySelector(".arrow-after");
  const prevButtonPlates = document.querySelector(".plates-arrow-before");
  const nextButtonPlates = document.querySelector(".plates-arrow-after");
  const prevArrowTestimonials = document.querySelector(
    ".testimonials-arrow-before"
  );
  const nextArrowTestimonials = document.querySelector(
    ".testimonials-arrow-after"
  );

  mobileMenuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

  const numVisibleCards = window.innerWidth < 767 ? 1 : 4;
  const numVisiblePlates = window.innerWidth < 767 ? 1 : 2;

  let currentIndexCards = 0;
  let currentIndexPlates = 0;
  let currentIndexTestimonials = 0;

  function hideAllCards() {
    programCards.forEach((card) => {
      card.style.display = "none";
    });
  }

  function hideAllPlates() {
    plateItems.forEach((plate) => {
      plate.style.display = "none";
    });
  }

  function hideAllTestimonialsContent() {
    testimonialsContent.forEach((content) => {
      content.style.display = "none";
    });
  }

  function showCards(startIndex) {
    hideAllCards();

    for (let i = startIndex; i < startIndex + numVisibleCards; i++) {
      if (i < programCards.length) {
        programCards[i].style.display = "block";
      }
    }
  }

  function showPlates(startIndex) {
    hideAllPlates();

    for (let i = startIndex; i < startIndex + numVisiblePlates; i++) {
      if (i < plateItems.length) {
        plateItems[i].style.display = "block";
      }
    }
  }

  function showTestimonialsContent(index) {
    hideAllTestimonialsContent();
    if (index >= 0 && index < testimonialsContent.length) {
      testimonialsContent[index].style.display = "block";
    }
  }

  function showNextTestimonialsContent() {
    currentIndexTestimonials =
      (currentIndexTestimonials + 1) % testimonialsContent.length;
    showTestimonialsContent(currentIndexTestimonials);
  }

  function showPrevTestimonialsContent() {
    currentIndexTestimonials =
      (currentIndexTestimonials - 1 + testimonialsContent.length) %
      testimonialsContent.length;
    showTestimonialsContent(currentIndexTestimonials);
  }

  function slideToCardIndex(targetIndex) {
    currentIndexCards = Math.max(
      Math.min(targetIndex, programCards.length - numVisibleCards),
      0
    );
    showCards(currentIndexCards);
  }

  function slideToPlateIndex(targetIndex) {
    currentIndexPlates = Math.max(
      Math.min(targetIndex, plateItems.length - numVisiblePlates),
      0
    );
    showPlates(currentIndexPlates);
  }

  prevButton.addEventListener("click", function () {
    slideToCardIndex(currentIndexCards - 1);
  });

  nextButton.addEventListener("click", function () {
    slideToCardIndex(currentIndexCards + 1);
  });

  prevButtonPlates.addEventListener("click", function () {
    slideToPlateIndex(currentIndexPlates - 1);
  });

  nextButtonPlates.addEventListener("click", function () {
    slideToPlateIndex(currentIndexPlates + 1);
  });

  prevArrowTestimonials.addEventListener("click", function () {
    showPrevTestimonialsContent();
  });

  nextArrowTestimonials.addEventListener("click", function () {
    showNextTestimonialsContent();
  });

  showCards(currentIndexCards);
  showPlates(currentIndexPlates);
  showTestimonialsContent(currentIndexTestimonials);

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }
  const options = {
    root: null,
    threshold: 0.2,
  };
  const observer = new IntersectionObserver(handleIntersection, options);
  const elementsToAnimate = document.querySelectorAll(
    ".fade-in-up, .fade-in-left, .fade-in-right"
  );
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
});
