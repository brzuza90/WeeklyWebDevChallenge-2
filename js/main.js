/* Zmienne */
const nav = document.querySelector('nav');
const logo = document.querySelector('nav h1');
const menuButtons = document.querySelectorAll('div.menu ul li');
const header = document.querySelector('.home')
const sectionAbout = document.querySelector('.about');
const sectionServices = document.querySelector('.services');
const sectionGallery = document.querySelector('.gallery');
const sectionSubscribe = document.querySelector('.subscribe');
const sectionBlog = document.querySelector('.blog');
const sectionContact = document.querySelector('.contact');
let scrollUp = 0;

/* Ustawienie nasłuchiwania */
if (window.scrollY === 0) {
    menuButtons[0].classList.add('active')
}
window.addEventListener('scroll', () => {
    const headerHight = header.offsetHeight;
    const aboutHight = sectionAbout.offsetHeight;
    const servicesHight = sectionServices.offsetHeight;
    const galleryHight = sectionGallery.offsetHeight;
    const subscribeHight = sectionSubscribe.offsetHeight;
    const blogHight = sectionBlog.offsetHeight;
    const navHeight = nav.offsetHeight;
    if (window.scrollY > 100) {
        nav.style.height = "5vh";
        nav.style.backgroundColor = "rgb(255,255,255)"
    } else {
        nav.style.height = "10vh";
        nav.style.backgroundColor = "transparent"
    }
    if (window.scrollY >= 0 && window.scrollY < headerHight - navHeight) {
        menuButtons.forEach((menuButton) => menuButton.classList.remove('active'));
        menuButtons[0].classList.add('active');
    } else if (window.scrollY >= headerHight - navHeight && window.scrollY < sectionAbout.offsetTop + aboutHight - navHeight) {
        menuButtons.forEach((menuButton) => menuButton.classList.remove('active'));
        menuButtons[1].classList.add('active');
    } else if (window.scrollY >= sectionAbout.offsetTop + aboutHight - navHeight && window.scrollY < sectionServices.offsetTop + servicesHight - navHeight) {
        menuButtons.forEach((menuButton) => menuButton.classList.remove('active'));
        menuButtons[2].classList.add('active');
    } else if (window.scrollY >= sectionServices.offsetTop + servicesHight - navHeight && window.scrollY < sectionGallery.offsetTop + galleryHight + subscribeHight - navHeight) {
        menuButtons.forEach((menuButton) => menuButton.classList.remove('active'));
        menuButtons[3].classList.add('active');
    } else if (window.scrollY >= sectionBlog.offsetTop - navHeight && window.scrollY < sectionBlog.offsetTop + blogHight - navHeight) {
        menuButtons.forEach((menuButton) => menuButton.classList.remove('active'));
        menuButtons[4].classList.add('active');
    } else {
        menuButtons.forEach((menuButton) => menuButton.classList.remove('active'));
        menuButtons[5].classList.add('active');
    }

})

/* Nasłuchiwanie na przyciski menu */
logo.addEventListener('click', () => {
    const scrollToPageStart = function () {
        const positionY = window.scrollY;
        if (positionY > header.offsetTop) {
            window.scrollTo(0, positionY - nav.offsetHeight);
        } else {
            clearInterval(startScroll);
        }
    }

    const startScroll = setInterval(scrollToPageStart, 10);
})
menuButtons.forEach((menuButton) => {
    menuButton.addEventListener('click', () => {
        const sectionName = menuButton.textContent;
        const currentSectionTop = document.querySelector('.' + sectionName).offsetTop;
        const scrollToElementStart = function () {
            const navHeight = nav.offsetHeight;
            const positionY = window.scrollY;
            if (positionY > currentSectionTop) {
                scrollUp = 1;
            }
            /* scroll w dół */
            if (positionY < currentSectionTop - 2 * navHeight && !scrollUp) {
                window.scrollTo(0, positionY + navHeight);
            } else if (positionY >= currentSectionTop - 2 * navHeight && positionY < currentSectionTop - navHeight && !scrollUp) {
                window.scrollTo(0, positionY + 1);
            } else if (positionY == currentSectionTop - navHeight && !scrollUp) {
                clearInterval(startScroll);
                return;
            }

            /* scroll w góre */
            if (sectionName == 'home' && positionY > 0) {
                window.scrollTo(0, positionY - navHeight);
            } else if (sectionName == 'home' && positionY == 0) {
                clearInterval(startScroll);
                scrollUp = 0;
                return;
            }
            if (positionY > currentSectionTop && scrollUp) {
                window.scrollTo(0, positionY - navHeight);
            } else if (positionY < currentSectionTop && positionY > currentSectionTop - navHeight && scrollUp) {
                window.scrollTo(0, positionY - 1);
            } else if (positionY == currentSectionTop - navHeight && scrollUp) {
                clearInterval(startScroll);
                scrollUp = 0
                return;
            }
        }

        const startScroll = setInterval(scrollToElementStart, 10);
    })
})