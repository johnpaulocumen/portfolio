const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navItem = document.querySelectorAll(".nav__item"),
  header = document.getElementById("header");

// open and close menu
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav__menu--open");
  changeIcon();
});

// close the menu when the user clicks the nav links
navItem.forEach((item) => {
  item.addEventListener("click", () => {
    if (navMenu.classList.contains("nav__menu--open")) {
      navMenu.classList.remove("nav__menu--open");
    }
    changeIcon();
  });
});

// Change nav toggle icon
function changeIcon() {
  if (navMenu.classList.contains("nav__menu--open")) {
    navToggle.classList.replace("ri-menu-3-line", "ri-close-line");
  } else {
    navToggle.classList.replace("ri-close-line", "ri-menu-3-line");
  }
}

document.getElementById('homeLink').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default behavior if necessary
  // Add logic to redirect to the home page
  window.location.href = 'index.html'; // Update with the correct home URL if applicable
});


// Function to handle "View" and "Download" button actions
function handleButtonClick(event) {
  const buttonClicked = event.target.id;
  const resumeUrl = './assets/JohnPaul_Ocumen_Resume.pdf';
  
  if (buttonClicked === 'viewButton') {
    // Open the resume in a new tab
    window.open(resumeUrl, '_blank');
  } else if (buttonClicked === 'downloadButton') {
    // Trigger download of the resume
    const a = document.createElement('a');
    a.href = resumeUrl;
    a.download = resumeUrl.split('/').pop();  // Use the filename from the URL
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);  // Clean up the element after clicking
  }
}

// Add event listeners for all relevant buttons
document.getElementById('viewButton').addEventListener('click', handleButtonClick);
document.getElementById('downloadButton').addEventListener('click', handleButtonClick);



// header scroll animation
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("header--scroll");
  } else {
    header.classList.remove("header--scroll");
  }
});

// ScrollReveal animations
const sr = ScrollReveal({
  duration: 2000,
  distance: "100px",
  delay: 250,
  reset: false,
});

sr.reveal(".home__content, .about__content");
sr.reveal(".home__img", { origin: "top" });

sr.reveal(
  ".home__info-wrapper, .skills__title, .skills__content, .qualification__name, .qualification__item, .service__card,  .footer__content, .project__wrapper",
  {
    delay: 300,
    interval: 100,
  }
);

sr.reveal(".qualification__footer-text, .contact__content, .swiper-button-prev", {
  origin: "left",
});

sr.reveal(".qualification__footer .btn, .contact__btn, .qualification__buttons, .swiper-button-next", { origin: "right" });


//Email JS
function sendEmail(event) {
  event.preventDefault(); // Prevent the default form submission
  
  const serviceID = "service_zpn1s6f"; // Replace with your EmailJS Service ID
  const templateID = "template_vx2mqnr"; // Replace with your EmailJS Template ID

  // Collect form data
  const templateParams = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
  };

  // Disable the button while sending
  const sendButton = event.target.querySelector('button[type="submit"]');
  sendButton.disabled = true;
  sendButton.textContent = "Sending...";

  // Send the email using EmailJS
  emailjs.send(serviceID, templateID, templateParams)
      .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Your message has been sent successfully!");
          sendButton.textContent = "Send Message";
          sendButton.disabled = false;
          document.getElementById("contactForm").reset(); // Clear the form
      })
      .catch((error) => {
          console.error("FAILED...", error);
          alert("Failed to send your message. Please try again later.");
          sendButton.textContent = "Send Message";
          sendButton.disabled = false;
      });
}



// SwiperJS

const swiper = new Swiper('.project-slider', {
  loop: true, // Enable infinite loop
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1, // Show one slide at a time
  spaceBetween: 20,
  on: {
    slideChangeTransitionStart: function () {
      const slides = document.querySelectorAll('.project-slide');
      slides.forEach((slide) => {
        if (!slide.classList.contains('swiper-slide-active')) {
          slide.style.visibility = 'hidden';
          slide.style.opacity = '0';
        }
      });
    },
    slideChangeTransitionEnd: function () {
      const activeSlide = document.querySelector('.swiper-slide-active');
      if (activeSlide) {
        activeSlide.style.visibility = 'visible';
        activeSlide.style.opacity = '1';
      }
    },
  },
});

//Typewriter Effects
const typewriterElement = document.querySelector('.typewriter');
const text = 'SOFTWARE DEVELOPER. ';
let index = 0;
let isDeleting = false;
let isFinishedTyping = false;

function typeWriterEffect() {
    const typingSpeed = isDeleting ? 50 : 200; // Slow down the speed for typing and deleting
    const pauseTime = 3000; // Pause after typing the full text

    // Handle typing
    if (!isDeleting && index <= text.length) {
        typewriterElement.textContent = text.slice(0, index);
        index++;
    }
    // Handle deleting
    else if (isDeleting && index >= 0) {
        typewriterElement.textContent = text.slice(0, index);
        index--;
    }

    // Pause after typing the full text
    if (index === text.length && !isDeleting && !isFinishedTyping) {
        isFinishedTyping = true;
        setTimeout(() => {
            isDeleting = true;
            typeWriterEffect();
        }, pauseTime);
        return;
    }

    // Restart typing after deleting
    if (index === 0 && isDeleting) {
        isDeleting = false;
        isFinishedTyping = false;
    }

    // Continue the effect recursively
    setTimeout(typeWriterEffect, typingSpeed);
}

// Start the typewriter effect
typeWriterEffect();


//Lightmode Effect
// Check if the user's mode preference is saved in localStorage
if (localStorage.getItem('mode') === 'enabled') {
  document.body.classList.add('light-mode');
  document.getElementById('lightmode').src = 'assets/img/moon.png';  // Change to moon image
}

// Function to toggle modes
document.getElementById('modeToggleButton').addEventListener('click', toggleMode);
document.getElementById('lightmode').addEventListener('click', toggleMode);

function toggleMode() {
  // Toggle light mode
  document.body.classList.toggle('light-mode');

  // Toggle the image between sun and moon based on mode
  const lightmodeImage = document.getElementById('lightmode');
  if (document.body.classList.contains('light-mode')) {
      lightmodeImage.src = 'assets/img/moon.png'; // Set moon image
      localStorage.setItem('mode', 'enabled'); // Save mode as light mode
  } else {
      lightmodeImage.src = 'assets/img/sun.png'; // Set sun image
      localStorage.setItem('mode', 'disabled'); // Save mode as dark mode
  }
}

