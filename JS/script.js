
const link = document.querySelector(".link-list");
const linkBtn = document.querySelector(".link-btn");
const cancelBtn = document.querySelector(".cancel-btn");

linkBtn.onclick = ()=> {
    link.classList.add("active")
    linkBtn.classList.add("hide") 
}

cancelBtn.onclick = ()=> {
    link.classList.remove("active")
    linkBtn.classList.remove("hide")
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: false
});

console.log(sr)

// top-conitionter

sr.reveal('.myself-picture', {});
sr.reveal('.top-heading', {delay: 100});
sr.reveal('.mountain', {delay: 200});

// About 

sr.reveal('.about-title', {});
sr.reveal('.about-p', {delay: 100});

// Skills

sr.reveal('#skills', {});

// Certificate

sr.reveal('#certificate',  {dealy: 150});

// Programming Project

sr.reveal('#project', {dealy: 200});

//Contact

sr.reveal('#contact', {dealy: 300});
