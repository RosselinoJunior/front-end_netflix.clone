import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

// Evento que executa quando o DOM (Document Object Model) é carregado completamente
// Isso garante que todos os elementos HTML estejam disponíveis antes de manipular o DOM
document.addEventListener('DOMContentLoaded', () => {
    // Recupera o nome e imagem do perfil ativo do localStorage
    // localStorage armazena dados no navegador do usuário persistentemente
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    // Se os dados do perfil existem, atualiza a interface
    if (nomePerfil && imagemPerfil) {
        // Seleciona o elemento com classe 'kids-link' (onde mostra o nome do perfil)
        const kidsLink = document.querySelector('.kids-link');
        // Seleciona o elemento com classe 'profile-icon' (ícone do perfil)
        const profileIcon = document.querySelector('.profile-icon');
        
        // Atualiza o texto do link com o nome do perfil selecionado
        if (kidsLink) kidsLink.textContent = nomePerfil;
        // Atualiza a imagem do perfil com a imagem selecionada
        if (profileIcon) profileIcon.src = imagemPerfil;
    }

    // Seleciona o container principal onde os carrosséis serão inseridos
    const container = document.getElementById('main-content');
    
    // Se o container existe, cria e adiciona os carrosséis para cada categoria
    if (container) {
        // Para cada categoria nos dados, cria um carrossel e adiciona ao container
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});
