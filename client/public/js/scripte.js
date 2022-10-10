//like and unlike
// let btnlike = document.getElementsByClassName('btnlike');
// btnlike.addEventListener( 'click',()=>{
//     btnlike.style.color = 'red';
// });

const menuburger = document.querySelector(".menuburger")
const navList = document.querySelector(".list")

menuburger.addEventListener('click',()=>{
navList.classList.toggle('mobile-menu')
})
 //crousel
  
var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
  });

