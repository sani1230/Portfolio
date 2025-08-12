'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i]. classList.remove('active');
            }
        }
    });
}
// =======================
// Certificate Click + Code Input + PDF View
// =======================
const certImages = document.querySelectorAll(".clients-item img");

// Create popup HTML dynamically
const popup = document.createElement("div");
popup.id = "certPopup";
popup.style.cssText = `
  display:none; position:fixed; top:0; left:0; width:100%; height:100%;
  background:rgba(0,0,0,0.7); z-index:1000; align-items:center; justify-content:center;
`;
popup.innerHTML = `
  <div class="cert-popup-box">
    <h3 id="popupTitle"></h3>
    <input type="text" id="certInput" placeholder="Enter code">
    <div>
      <button id="certSubmit" class="submit-btn">Submit</button>
      <button id="certCancel" class="cancel-btn">Cancel</button>
    </div>
  </div>
`;

document.body.appendChild(popup);

// PDF Viewer
const pdfViewer = document.createElement("div");
pdfViewer.id = "pdfViewer";
pdfViewer.style.cssText = "display:none; padding:20px;";
pdfViewer.innerHTML = `<iframe id="pdfFrame" width="100%" height="500px" style="border:none;"></iframe>`;
document.body.appendChild(pdfViewer);

let selectedCert = null;

// Certificate mapping
const certPDFs = {
  cloudflare: { code: "HWD-900654CF", pdf: "/static/pdfs/cloudflare.pdf" },
  mindtree: { code: "HA-98765120MT-X", pdf: "/static/pdfs/mindtree.pdf" },
  mphasis: { code: "SI-043210MP", pdf: "/static/pdfs/mphasis.pdf" },
  gsap: { code: "CM-702341-GSAP", pdf: "/static/pdfs/gsap.pdf" },
  aiml: { code: "691083DRG-AIML-27", pdf: "/static/pdfs/aiml.pdf" },
  ibm: { code: "MR-789012-WB-00", pdf: "/static/pdfs/ibm.pdf" },
  appinventiv: { code: "WB-345678AI-X40", pdf: "/static/pdfs/appinventiv.pdf" },
  udemy: { code: "WB-424790UD", pdf: "/static/pdfs/udemy.pdf" }
  // Add more here
};

// Click on image → show popup
certImages.forEach(img => {
  img.addEventListener("click", () => {
    selectedCert = img.alt.toLowerCase().trim();
    document.getElementById("popupTitle").textContent = `${img.alt} Certificate`;
    popup.style.display = "flex";
  });
});

// Cancel button
popup.querySelector("#certCancel").addEventListener("click", () => {
  popup.style.display = "none";
});

// Submit button
popup.querySelector("#certSubmit").addEventListener("click", () => {
  const enteredCode = document.getElementById("certInput").value.trim().toUpperCase();

if (
  certPDFs[selectedCert] &&
  enteredCode === certPDFs[selectedCert].code.toUpperCase()
) {
  document.getElementById("pdfFrame").src = certPDFs[selectedCert].pdf;
  pdfViewer.style.display = "block";
  popup.style.display = "none";

  // Clear the code input
  document.getElementById("certInput").value = "";

  // Smooth scroll to the PDF viewer
  setTimeout(() => {
    pdfViewer.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 300);
} else {
  alert("Invalid code for this certificate.");
}


});
