let images = [];
let index = 0;
let timer = null;

const imageElement = document.getElementById("slideshow-img");
const imageCount = document.getElementById("image-count");

fetch("https://api.thecatapi.com/v1/images/search?limit=10")
  .then((response) => response.json())
  .then((data) => {
    images = data;
    showImage();
  })
  .catch((error) => {
    imageCount.textContent = "Error loading images.";
    console.error(error);
  });

function showImage() {
  if (images.length === 0) return;

  imageElement.src = images[index].url;
  imageCount.textContent = `Image ${index + 1} of ${images.length}`;
}

function firstImage() {
  index = 0;
  showImage();
}

function lastImage() {
  index = images.length - 1;
  showImage();
}

function nextImage() {
  if (index < images.length - 1) {
    index++;
    showImage();
  }
}

function previousImage() {
  if (index > 0) {
    index--;
    showImage();
  }
}

function playSlideshow() {
  stopSlideshow();

  timer = setInterval(() => {
    if (index < images.length - 1) {
      index++;
      showImage();
    } else {
      stopSlideshow();
    }
  }, 5000);
}

function stopSlideshow() {
  clearInterval(timer);
}