const banner = document.getElementById("banner");
const bannerTitle = document.getElementById("banner-title");
const bannerText = document.getElementById("banner-text");
const bannerImage = document.getElementById("banner-image");

const backgroundColorInput = document.getElementById("background-color");
const textColorInput = document.getElementById("text-color");
const customTextArea = document.getElementById("custom-text");
const applyChangesBtn = document.getElementById("apply-changes");
const resetBtn = document.getElementById("reset");

const imageUrlInput = document.getElementById("image-url");
const imageUploadInput = document.getElementById("image-upload");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const fileNameDisplay = document.getElementById("file-name");
const imagePreview = document.getElementById("image-preview");
const previewImg = document.getElementById("preview-img");

const originalValues = {
  backgroundColor: "#2563eb", // Updated to match our new primary color
  textColor: "#ffffff",
  bannerStyle: "default",
  bannerText: bannerText.textContent,
  bannerTitle: bannerTitle.textContent,
  bannerImage: bannerImage.src,
};

let newImageSource = null;
let activeImageMethod = "url"; // 'url' or 'upload'

function initImageTabs() {
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const tabName = btn.getAttribute("data-tab");
      document.getElementById(`${tabName}-tab`).classList.add("active");

      activeImageMethod = tabName;

      if (tabName === "url") {
        newImageSource = imageUrlInput.value || null;
        updateImagePreview();
      } else {
        newImageSource = imageUploadInput.files.length > 0 ? true : null;
      }
    });
  });
}

function updateImagePreview() {
  if (newImageSource) {
    previewImg.src = newImageSource;
    imagePreview.classList.add("active");

    previewImg.onerror = function () {
      imagePreview.classList.remove("active");
      if (activeImageMethod === "url") {
        imageUrlInput.style.borderColor = "var(--color-danger)";
        setTimeout(() => {
          imageUrlInput.style.borderColor = "";
        }, 2000);
      }
    };
  } else {
    imagePreview.classList.remove("active");
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    fileNameDisplay.textContent = file.name;

    const reader = new FileReader();
    reader.onload = function (e) {
      newImageSource = e.target.result;
      updateImagePreview();
    };
    reader.readAsDataURL(file);
  } else {
    fileNameDisplay.textContent = "No file chosen";
    newImageSource = null;
    imagePreview.classList.remove("active");
  }
}

function handleImageUrlInput(event) {
  const url = event.target.value.trim();
  newImageSource = url || null;

  clearTimeout(window.urlPreviewTimer);
  window.urlPreviewTimer = setTimeout(() => {
    updateImagePreview();
  }, 500);
}

function applyChanges() {
  banner.style.transition = "all 0.4s ease";
  banner.style.transform = "scale(0.98)";

  setTimeout(() => {
    banner.style.backgroundColor = backgroundColorInput.value;

    banner.style.color = textColorInput.value;
    bannerTitle.style.color = textColorInput.value;
    bannerText.style.color = textColorInput.value;

    banner.className = "banner"; 

    if (customTextArea.value.trim() !== "") {
      bannerText.textContent = customTextArea.value;
    }

    if (newImageSource) {
      bannerImage.src = newImageSource;

      bannerImage.onerror = function () {
        bannerImage.src = originalValues.bannerImage;

        if (activeImageMethod === "url") {
          imageUrlInput.style.borderColor = "var(--color-danger)";
          setTimeout(() => {
            imageUrlInput.style.borderColor = "";
          }, 2000);
        }
      };
    }

    setTimeout(() => {
      banner.style.transform = "scale(1)";
    }, 50);
  }, 150);

  const button = applyChangesBtn;
  const originalText = button.textContent;
  button.textContent = "✓ Applied";
  button.style.backgroundColor = "var(--color-success)";

  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = "";
  }, 1500);
}

function resetBanner() {
  banner.style.transition = "all 0.4s ease";
  banner.style.opacity = "0.8";

  setTimeout(() => {
    backgroundColorInput.value = originalValues.backgroundColor;
    textColorInput.value = originalValues.textColor;
    customTextArea.value = "";
    imageUrlInput.value = "";
    imageUploadInput.value = "";
    fileNameDisplay.textContent = "No file chosen";
    newImageSource = null;
    imagePreview.classList.remove("active");

    banner.className = "banner";
    banner.style.backgroundColor = originalValues.backgroundColor;
    banner.style.color = originalValues.textColor;
    bannerTitle.style.color = "";
    bannerText.style.color = "";

    bannerText.textContent = originalValues.bannerText;
    bannerTitle.textContent = originalValues.bannerTitle;
    bannerImage.src = originalValues.bannerImage;

    setTimeout(() => {
      banner.style.opacity = "1";
    }, 50);
  }, 150);

  const button = resetBtn;
  const originalText = button.textContent;
  button.textContent = "✓ Reset Complete";

  setTimeout(() => {
    button.textContent = originalText;
  }, 1500);
}

initImageTabs();

backgroundColorInput.addEventListener("input", () => {
  banner.style.backgroundColor = backgroundColorInput.value;
});

textColorInput.addEventListener("input", () => {
  banner.style.color = textColorInput.value;
  bannerTitle.style.color = textColorInput.value;
  bannerText.style.color = textColorInput.value;
});

imageUrlInput.addEventListener("input", handleImageUrlInput);
imageUploadInput.addEventListener("change", handleFileUpload);

applyChangesBtn.addEventListener("click", applyChanges);
resetBtn.addEventListener("click", resetBanner);

export { applyChanges, resetBanner };
