// src/assets/js/config.js (This file might not be directly used in your React components in this setup, but kept for reference)

function loadHeadConfig() {
  const headHTML = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/tailwind.css"> <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Grandiflora+One&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Julius+Sans+One&display=swap" rel="stylesheet">
    <title>Vincent Göke - UX Portfolio</title>
    `;

  document.head.innerHTML += headHTML;
}

function initializeCommonJS() {
  console.log("Common JavaScript initialized from config.js");
}