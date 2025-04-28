import Aos from "aos";
import "aos/dist/aos.css"

// init AOS animation
Aos.init({
    duration: 1000,
    offset: 100,
});


const buttons = document.querySelectorAll('.popular-foods__filters-btn')
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        
        button.classList.add('active');
    });
});

