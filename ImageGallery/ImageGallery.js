const tags = document.querySelectorAll('.hashtag');
const allImages = document.querySelectorAll('.image');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentImages = Array.from(allImages);
let currentIndex = 0;

// Filter images
tags.forEach(tag => {
  tag.addEventListener('click', () => {
    const selected = tag.getAttribute('data-category');
    allImages.forEach(img => {
      if (selected === 'all') {
        img.style.display = 'block';
      } else {
        img.style.display = img.classList.contains(selected) ? 'block' : 'none';
      }
    });
    currentImages = Array.from(document.querySelectorAll('.image'))
                         .filter(img => img.style.display !== 'none');
  });
});

// Open lightbox
allImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentImages = Array.from(document.querySelectorAll('.image'))
                         .filter(img => img.style.display !== 'none');
    currentIndex = currentImages.indexOf(img);
    showLightbox();
  });
});

function showLightbox() {
  lightbox.style.display = 'flex';
  lightboxImage.src = currentImages[currentIndex].src;
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    lightboxImage.src = currentImages[currentIndex].src;
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < currentImages.length - 1) {
    currentIndex++;
    lightboxImage.src = currentImages[currentIndex].src;
  }
});