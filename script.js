document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.gallery-wrapper .slider-btn.prev');
    const nextBtn = document.querySelector('.gallery-wrapper .slider-btn.next');

    if (!slider || !prevBtn || !nextBtn || slides.length === 0) {
        console.warn('Slider da galeria não encontrado ou incompleto. Verifique o HTML.');
        return;
    }

    let currentIndex = 0;
    let slideWidth = 0;

    function calculateSlideWidthAndPosition() {

        slideWidth = slides[0].offsetWidth; 
        updateSliderPosition();
        // console.log('Slide width calculated:', slideWidth); // Para depuração
    }

    function updateSliderPosition() {
        slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    }

    // Inicializa ao carregar o DOM
    calculateSlideWidthAndPosition();

    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop infinito
        }
        updateSliderPosition();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // Loop infinito
        }
        updateSliderPosition();
    });

    // Recalcula a largura do slide e a posição sempre que a janela é redimensionada
    window.addEventListener('resize', calculateSlideWidthAndPosition);

    // Recalcula a largura do slide e a posição depois que TODOS os recursos (incluindo imagens) foram carregados
    // Isso é crucial para garantir que as imagens tenham suas dimensões finais antes do cálculo
    window.addEventListener('load', calculateSlideWidthAndPosition);
});