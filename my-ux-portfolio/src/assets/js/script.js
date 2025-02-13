// Optional JavaScript enhancements can be added here

// Example using GSAP (Greensock Animation Platform) - you need to include GSAP library for this to work

// Select the hero heading element
const heroHeading = document.querySelector('#hero h1');

if (heroHeading) { // Check if the heroHeading element exists on the page
    // Animate the hero heading to move 100 pixels to the right and fade in over 2 seconds
    gsap.to(heroHeading, {
        duration: 2,    // Animation duration in seconds
        x: 100,         // Move 100 pixels on the x-axis (right)
        opacity: 1,     // Fade in to full opacity
        delay: 0.5      // Start the animation after a 0.5 second delay
    });
}

// You can add more JavaScript code for interactivity and enhancements as needed