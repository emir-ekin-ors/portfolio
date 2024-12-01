const projectCards = document.querySelectorAll(".card.project");
const modalTitle = document.querySelector(".modal-title");
const modalSubtitle = document.querySelector(".modal-subtitle");
const descriptionContainer = document.querySelector(".project-description")
const imageContainer = document.querySelector(".image-container");
const dialog = document.querySelector("#favDialog");
const fullPage = document.querySelector("#fullpage");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const exitButton = document.querySelector(".exit-button");

const fileNames = {
    "cyprusinno": ["App/edit_profile.png", "App/forgot_password.png", "App/login_screen.png", "App/message.png", "App/messages.png", "App/profile.png", "App/users.png", "Website/create_event_screen.png", "Website/create_user_screen.png", "Website/events_screen.png", "Website/homepage.png", "Website/login_screen.png", "Website/notification_screen.png", "Website/users_screen.png"],
    "eragps": ["eragps.gif"],
    "gatsot": [],
    "gurada": ["homepage.png", "item_page.png", "item_reviews.png", "login.png", "profile.png", "rentings.png", "requests.png"],
    "gymlog": ["gymlog.gif", "new_set.png", "programs.png", "workout.png"],
    "mesmer": ["email_code.png", "forgot_password.png", "homepage.png", "login_screen.png", "new_order_1.png", "new_order_2.png", "new_organisation.png", "orders.png", "products.png", "rehearsals.png", "users.png"],
    "trok": []
}

const descriptions = {
    "cyprusinno": [
        "Secured funding from the European Union to support the project's development and implementation.",
        "Incorporated Bootstrap for frontend development and Laravel for backend functionalities.",
        "Utilised Flutter to build the mobile app version of Cyprusinno for both iOS and Android platforms.",
        "Designed and implemented features that allow users to search, follow, and message with other users.", "Developed an admin panel that enables organisation employees to manage users and company events effectively.",
        "Actively participated in project planning and regular meetings to ensure project objectives were met."
    ],
    "eragps": [
        "Developed a mobile application using Flutter to help users locate and track shuttles on Google Maps.",
        "API endpoints provided by the client for real-time shuttle location."
    ],
    "gatsot": [
        "Utilizing crowdsourcing algorithms to compile a comprehensive price database from various markets.",
        "Designed and developed a mobile application using Flutter with a Laravel-backed Rest API for querying prices, user authentication, and price data submission via receipt scanning.", "Integrated Azure API Services for text extraction from scanned images.", "Participated in the Startups4Peace startup competition, where our project garnered significant attention and appreciation, showcasing its potential impact and innovation in the market.", "Secured €30,000 in funding from government to support project development and implementation.", "Demo: https://www.youtube.com/watch?v=pqvS-y3KiQg"],
    "gurada": ["Developed a website allowing individuals to rent out their belongings to others for accessibility and resource sharing.", "Implemented Laravel for backend development and React with Bootstrap for the frontend, ensuring robust functionality, efficient data management, and a responsive, visually appealing interface across devices.", "Integrated advanced search functionalities enabling users to browse items by name, price, date, and location.", "Enabled users to leave comments and ratings for rented items, fostering a community-driven platform."],
    "gymlog": ["Developed a mobile application using React Native, enabling users to track gym weights for each workout routine through a clean and intuitive interface, compatible with both iOS and Android devices."],
    "mesmer": ["Developed a web application to streamline dentists’ requests for specific dental items from client clinics.", "Designed dynamic user experiences, adapting the website based on user roles, with an admin panel for manage dentist accounts, oversee applications, and control pricing.", "Actively participated in planning and meetings to ensure alignment with project goals and timelines."],
    "trok": ["Built a mobile application using Flutter, enabling users to list items for bartering, make offers, and arrange meetings for item exchanges.", "Architected and developed the backend of a bartering application, creating RESTful APIs with Laravel."]
}

let clickedImage
projectCards.forEach(card => {
    card.addEventListener("click", (e) => {
        projectName = e.currentTarget.classList[2];

        title = e.currentTarget.childNodes[1].childNodes[1].textContent
        modalTitle.textContent = title;

        subtitle = e.currentTarget.childNodes[1].childNodes[3].textContent
        modalSubtitle.textContent = subtitle;

        descriptionContainer.textContent = '';
        descriptions[projectName].forEach(description => {
            const listItem = document.createElement("li");
            listItem.textContent = description;
            descriptionContainer.appendChild(listItem);
        });

        imageContainer.textContent = '';
        fileNames[projectName].forEach(fileName => {
            const imagePath = `./project-images/${projectName}/${fileName}`;
            const img = document.createElement("img");
            img.src = imagePath;
            img.alt = imagePath;
            img.style.width = "100%";
            img.style.height = "100%";
            img.setAttribute("class", "project-image");
            img.addEventListener("click", () => {
                fullPage.style.backgroundImage = "url(" + img.src + ")";
                fullPage.style.display = "flex";
                dialog.close();
                clickedImage = img;
            });
            imageContainer.appendChild(img);
        });

        dialog.showModal();
    });
})

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
})

function goPreviousImage() {
    let images = clickedImage.parentNode.children;
    let index = [].indexOf.call(images, clickedImage)
    if (index > 0) {
        let previousImage = images[index - 1]
        clickedImage = previousImage;
        fullPage.style.backgroundImage = "url(" + previousImage.src + ")";
    }
}
previousButton.addEventListener("click", goPreviousImage);

function goNextImage() {
    let images = clickedImage.parentNode.children;
    let index = [].indexOf.call(images, clickedImage)
    if (index < images.length - 1) {
        let nextImage = images[index + 1]
        clickedImage = nextImage;
        fullPage.style.backgroundImage = "url(" + nextImage.src + ")";
    }
}
nextButton.addEventListener("click", goNextImage);

exitButton.addEventListener("click", () => {
    fullPage.style.display = "none";
    dialog.showModal();
})

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