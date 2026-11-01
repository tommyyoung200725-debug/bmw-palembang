const galleries = {
  "seri-3": {
    name: "BMW Seri 3",
    folder: "SERI%203",
    photos: [
      "bmw_palembang_1793435269363.jpeg",
      "bmw_palembang_1793435297401.jpeg",
      "bmw_palembang_1793435297456.jpeg",
      "bmw_palembang_1793435303976.jpeg",
      "bmw_palembang_1793435310316.jpeg",
      "bmw_palembang_1793435316168.jpeg",
      "bmw_palembang_1793435322126.jpeg",
    ],
  },
  "seri-5": {
    name: "BMW Seri 5",
    folder: "M520I",
    photos: [
      "bmw_palembang_1793435009325.jpeg",
      "bmw_palembang_1793435009326.jpeg",
      "bmw_palembang_1793435046054.jpeg",
      "bmw_palembang_1793435046387%20(1).jpeg",
      "bmw_palembang_1793435059802.jpeg",
      "bmw_palembang_1793435060121.jpeg",
      "bmw_palembang_1793435070490.jpeg",
    ],
  },
  x1: {
    name: "BMW X1",
    folder: "X1",
    photos: [
      "bmw_palembang_1793435180852.jpeg",
      "bmw_palembang_1793435199284.jpeg",
      "bmw_palembang_1793435231885.jpeg",
    ],
  },
  x7: {
    name: "BMW X7",
    folder: "X7",
    photos: [
      "bmw_palembang_1793435347164.jpeg",
      "bmw_palembang_17934353471645.jpeg",
      "bmw_palembang_1793435364045.jpeg",
      "bmw_palembang_1793435378511.jpeg",
      "bmw_palembang_1793435385268.jpeg",
      "bmw_palembang_1793435391135.jpeg",
      "bmw_palembang_1793435400140.jpeg",
      "bmw_palembang_1793435407295.jpeg",
    ],
  },
  m4: {
    name: "BMW M4",
    folder: "M4%20G82",
    photos: [
      "bmw_palembang_1793435435607.jpeg",
      "bmw_palembang_1793435435982.jpeg",
      "bmw_palembang_1793435452452.jpeg",
      "bmw_palembang_1793435458237.jpeg",
      "bmw_palembang_1793435464428.jpeg",
      "bmw_palembang_1793435469884.jpeg",
      "bmw_palembang_1793435475310.jpeg",
    ],
  },
  m2: {
    name: "BMW M2",
    folder: "M2",
    photos: [
      "bmw_palembang_1793435516568.jpeg",
      "bmw_palembang_1793435516569.jpeg",
      "bmw_palembang_1793435533705.jpeg",
      "bmw_palembang_1793435542432.jpeg",
      "bmw_palembang_1793435547796.jpeg",
    ],
  },
};

const dialog = document.querySelector(".model-gallery");

if (dialog) {
  const title = dialog.querySelector("#gallery-title");
  const image = dialog.querySelector(".gallery-main-image");
  const count = dialog.querySelector(".gallery-count");
  const thumbnails = dialog.querySelector(".gallery-thumbnails");
  const closeButton = dialog.querySelector(".gallery-close");
  let activeGallery;
  let activeIndex = 0;

  function photoUrl(gallery, index) {
    return `Images/${gallery.folder}/${gallery.photos[index]}`;
  }

  function showPhoto(index) {
    activeIndex = (index + activeGallery.photos.length) % activeGallery.photos.length;
    image.src = photoUrl(activeGallery, activeIndex);
    image.alt = `${activeGallery.name} — foto ${activeIndex + 1}`;
    count.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(activeGallery.photos.length).padStart(2, "0")}`;

    thumbnails.querySelectorAll("button").forEach((button, buttonIndex) => {
      button.setAttribute("aria-pressed", String(buttonIndex === activeIndex));
    });
  }

  function openGallery(gallery) {
    activeGallery = gallery;
    title.textContent = gallery.name;
    thumbnails.replaceChildren();

    gallery.photos.forEach((photo, index) => {
      const thumbnail = document.createElement("button");
      const thumbnailImage = document.createElement("img");
      thumbnail.type = "button";
      thumbnail.className = "gallery-thumbnail";
      thumbnail.setAttribute("aria-label", `Lihat ${gallery.name}, foto ${index + 1}`);
      thumbnail.setAttribute("aria-pressed", "false");
      thumbnailImage.src = photoUrl(gallery, index);
      thumbnailImage.alt = "";
      thumbnailImage.loading = "lazy";
      thumbnail.append(thumbnailImage);
      thumbnail.addEventListener("click", () => showPhoto(index));
      thumbnails.append(thumbnail);
    });

    showPhoto(0);
    dialog.showModal();
  }

  document.querySelectorAll(".model-image[data-gallery]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const gallery = galleries[link.dataset.gallery];
      if (gallery) {
        event.preventDefault();
        openGallery(gallery);
      }
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.querySelectorAll(".gallery-arrow").forEach((button) => {
    button.addEventListener("click", () => {
      showPhoto(activeIndex + Number(button.dataset.direction));
    });
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      dialog.close();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
}
