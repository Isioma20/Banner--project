describe("Banner customization functionality", () => {
  document.body.innerHTML = `
 <div class="container">
    <section id="banner" class="banner banner-flex">
      <div>
      <h1 id="banner-title">Books are the gateway to the mind</h1>
        <p id="banner-text">Through books, I discover new ideas, cultures, and emotions that enrich my understanding of the world. I can take a sneak peak into the minds of others and explore their thoughts.</p>
      </div>
      <div>
        <img id="banner-image" src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=500" alt="an image describing the content of the banner" />
      </div>
    </section>
    <form id="banner-controls">
      <input type="color" id="background-color" value="#2563eb">
      <input type="color" id="text-color" value="#ffffff">
      <select id="banner-style">
        <option value="default">Default</option>
        <option value="minimal">Minimal</option>
        <option value="bold">Bold</option>
      </select>
      <textarea id="custom-text"></textarea>
      
      <div class="image-input-tabs">
        <button type="button" class="tab-btn active" data-tab="url">Image URL</button>
        <button type="button" class="tab-btn" data-tab="upload">Upload Image</button>
      </div>
      <div class="tab-content active" id="url-tab">
        <input type="url" id="image-url" class="image-input">
      </div>
      <div class="tab-content" id="upload-tab">
        <input type="file" id="image-upload" accept="image/*">
        <span id="file-name">No file chosen</span>
      </div>
      <div id="image-preview" class="image-preview">
        <img id="preview-img" src="#" alt="Preview">
      </div>
      
      <button type="button" id="apply-changes">Apply Changes</button>
      <button type="button" id="reset">Reset</button>
    </form>
  `;

  const banner = document.getElementById("banner");
  const bannerTitle = document.getElementById("banner-title");
  const bannerText = document.getElementById("banner-text");
  const bannerImage = document.getElementById("banner-image");
  const backgroundColorInput = document.getElementById("background-color");
  const textColorInput = document.getElementById("text-color");
  const customTextArea = document.getElementById("custom-text");
  const imageUrlInput = document.getElementById("image-url");
  const imagePreview = document.getElementById("image-preview");
  const previewImg = document.getElementById("preview-img");

  let newImageSource = null;
  let activeImageMethod = "url";

  const originalValues = {
    backgroundColor: "#2563eb", 
    textColor: "#ffffff",
    bannerStyle: "default",
    bannerText: bannerText.textContent,
    bannerTitle: bannerTitle.textContent,
    bannerImage: bannerImage.src,
  };

  function applyChanges() {
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
    }
  }

  function resetBanner() {
    backgroundColorInput.value = originalValues.backgroundColor;
    textColorInput.value = originalValues.textColor;
    customTextArea.value = "";
    imageUrlInput.value = "";
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
  }

  beforeEach(() => {
    banner.style.backgroundColor = "#2563eb";
    banner.style.color = "#ffffff";
    banner.className = "banner";
    bannerText.textContent =
      "Through books, I discover new ideas, cultures, and emotions that enrich my understanding of the world. I can take a sneak peak into the minds of others and explore their thoughts.";
    backgroundColorInput.value = "#2563eb";
    textColorInput.value = "#ffffff";
    customTextArea.value = "";
    imageUrlInput.value = "";
    newImageSource = null;
  });

  test("applyChanges should update banner background color", () => {
    backgroundColorInput.value = "#ff0000";

    applyChanges();

    expect(banner.style.backgroundColor).toBe("rgb(255, 0, 0)");
  });

  test("applyChanges should update text color", () => {
    textColorInput.value = "#000000";

    applyChanges();

    expect(banner.style.color).toBe("rgb(0, 0, 0)");
  });

  test("applyChanges should update banner text when custom text is provided", () => {
    const newText = "This is a custom banner message";
    customTextArea.value = newText;

    applyChanges();

    expect(bannerText.textContent).toBe(newText);
  });

  test("applyChanges should update banner image when URL is provided", () => {
    const newImageUrl = "https://example.com/new-image.jpg";
    imageUrlInput.value = newImageUrl;
    newImageSource = newImageUrl;

    applyChanges();

    expect(bannerImage.src).toBe(newImageUrl);
  });

  test("resetBanner should restore all original values", () => {
    backgroundColorInput.value = "#ff0000";
    textColorInput.value = "#000000";
    customTextArea.value = "Custom text";
    applyChanges(); 

    resetBanner();

    expect(banner.style.backgroundColor).toBe("rgb(37, 99, 235)"); 
    expect(banner.style.color).toBe("rgb(255, 255, 255)"); 
    expect(banner.className).toBe("banner");
    expect(bannerText.textContent).toBe(
      "Through books, I discover new ideas, cultures, and emotions that enrich my understanding of the world. I can take a sneak peak into the minds of others and explore their thoughts."
    );
  });

  test("resetBanner should restore original image", () => {
    const newImageUrl = "https://example.com/new-image.jpg";
    imageUrlInput.value = newImageUrl;
    newImageSource = newImageUrl;
    applyChanges(); 

    resetBanner();

    expect(bannerImage.src).toBe(originalValues.bannerImage);
    expect(imageUrlInput.value).toBe("");
    expect(newImageSource).toBeNull();
  });
});
