const projectCards = document.querySelectorAll(".card.project");
const modalTitle = document.querySelector(".modal-title");
const modalSubtitle = document.querySelector(".modal-subtitle");
const descriptionContainer = document.querySelector(".project-description");
const imageContainer = document.querySelector(".image-container");
const dialog = document.querySelector("#favDialog");
const fullPage = document.querySelector("#fullpage");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const exitButton = document.querySelector(".exit-button");

let clickedImage;
projectCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    projectName = e.currentTarget.classList[2];

    title = e.currentTarget.childNodes[1].childNodes[1].textContent;
    modalTitle.textContent = title;

    subtitle = e.currentTarget.childNodes[1].childNodes[3].textContent;
    modalSubtitle.textContent = subtitle;

    descriptionContainer.textContent = "";
    projects[projectName].descriptions.forEach((description) => {
      const listItem = document.createElement("li");
      listItem.textContent = description;
      descriptionContainer.appendChild(listItem);
    });

    imageContainer.textContent = "";
    projects[projectName].files.forEach((fileName) => {
      const imagePath = `./project-images/${projectName}/${fileName}`;
      const img = document.createElement("img");
      img.src = imagePath;
      img.alt = imagePath;
      img.style.width = "100%";
      img.style.height = "100%";
      img.setAttribute("class", "project-image");
      img.addEventListener("click", () => {
        document.body.style.overflow = "hidden";
        fullPage.style.backgroundImage = "url(" + img.src + ")";
        fullPage.style.display = "flex";
        dialog.close();
        clickedImage = img;
      });
      imageContainer.appendChild(img);
    });

    dialog.showModal();
  });
});

dialog.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();

  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  ) {
    dialog.close();
  }
});

const closeModalButton = document.querySelector(".close-modal");
closeModalButton.addEventListener("click", () => {
  dialog.close();
});

function goPreviousImage() {
  let images = clickedImage.parentNode.children;
  let index = [].indexOf.call(images, clickedImage);
  if (index > 0) {
    let previousImage = images[index - 1];
    clickedImage = previousImage;
    fullPage.style.backgroundImage = "url(" + previousImage.src + ")";
  }
}
previousButton.addEventListener("click", goPreviousImage);

function goNextImage() {
  let images = clickedImage.parentNode.children;
  let index = [].indexOf.call(images, clickedImage);
  if (index < images.length - 1) {
    let nextImage = images[index + 1];
    clickedImage = nextImage;
    fullPage.style.backgroundImage = "url(" + nextImage.src + ")";
  }
}
nextButton.addEventListener("click", goNextImage);

exitButton.addEventListener("click", () => {
  document.body.style.overflow = "auto";
  fullPage.style.display = "none";
  dialog.showModal();
});

document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (fullPage.style.display != "none") {
    switch (key) {
      case "Escape":
        event.preventDefault();
        fullPage.style.display = "none";

        dialog.showModal();
        break;
      case "ArrowRight":
        goNextImage();
        break;
      case "ArrowLeft":
        goPreviousImage();
        break;
      default:
        break;
    }
  }
});
