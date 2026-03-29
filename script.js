// Carrega perfis do localStorage ou usa padrão
        let profiles = JSON.parse(localStorage.getItem('profiles')) || [
            { name: 'Perfil 1', image: 'assets/Perfil-1.jpeg' },
            { name: 'Perfil 2', image: 'assets/Perfil-2.jpeg' },
            { name: 'Perfil 3', image: 'assets/perfil-3' },
            { name: 'Perfil 4', image: 'assets/perfil-4.jpg' }
        ];

        // Função para renderizar perfis na página principal
        function renderProfiles() {
            const profileList = document.querySelector('.profiles');
            profileList.innerHTML = '';
            profiles.forEach(profile => {
                const li = document.createElement('li');
                li.onclick = () => selectProfile(profile.name, profile.image);
                li.innerHTML = `
                    <img src="${profile.image}" alt="${profile.name} avatar">
                    <p>${profile.name}</p>
                `;
                profileList.appendChild(li);
            });
        }

        // Função para selecionar um perfil
        // Esta função salva o nome e a imagem do perfil no localStorage
        // e redireciona o usuário para a página do catálogo
        function selectProfile(nome, imagem) {
            // Salva os dados do perfil ativo no localStorage
            // localStorage permite armazenar dados no navegador do usuário
            // que persistem mesmo após fechar a página
            localStorage.setItem('perfilAtivoNome', nome);
            localStorage.setItem('perfilAtivoImagem', imagem);
            
            // Redireciona para a página do catálogo
            // O caminho é relativo: vai para a pasta Catalogo/netflix-plataform-main/catalogo/
            window.location.href = 'Catalogo/netflix-plataform-main/catalogo/catalogo.html';
        }

        // Função para abrir o modal de gerenciar perfis
        function openProfileManager() {
            const modal = document.getElementById('profile-modal');
            modal.style.display = 'block';
            renderProfileManager();
        }

        // Função para fechar o modal
        function closeProfileManager() {
            const modal = document.getElementById('profile-modal');
            modal.style.display = 'none';
        }

        // Função para renderizar perfis no modal
        function renderProfileManager() {
            const profileList = document.getElementById('profile-list');
            profileList.innerHTML = '';
            profiles.forEach((profile, index) => {
                const div = document.createElement('div');
                div.className = 'profile-item';
                div.innerHTML = `
                    <img src="${profile.image}" alt="${profile.name}" style="width: 50px; height: 50px; border-radius: 50%;">
                    <input type="text" value="${profile.name}" onchange="updateProfileName(${index}, this.value)">
                    <button onclick="removeProfile(${index})">Remover</button>
                `;
                profileList.appendChild(div);
            });
        }

        // Função para atualizar nome do perfil e salvar automaticamente
        function updateProfileName(index, newName) {
            profiles[index].name = newName;
            // Salva automaticamente no localStorage sempre que o nome muda
            localStorage.setItem('profiles', JSON.stringify(profiles));
            // Atualiza a lista na página principal em tempo real
            renderProfiles();
        }

        // Função para remover perfil e salvar automaticamente
        function removeProfile(index) {
            if (profiles.length > 1) { // Mantém pelo menos 1 perfil
                profiles.splice(index, 1);
                // Salva automaticamente
                localStorage.setItem('profiles', JSON.stringify(profiles));
                renderProfileManager();
                renderProfiles(); // Atualiza página principal
            } else {
                alert('Deve haver pelo menos um perfil.');
            }
        }

        // Função para adicionar perfil e salvar automaticamente
        function addProfile() {
            if (profiles.length < 5) {
                const newProfile = {
                    name: `Perfil ${profiles.length + 1}`,
                    image: 'assets/perfil-3' // Imagem padrão para novos perfis
                };
                profiles.push(newProfile);
                // Salva automaticamente
                localStorage.setItem('profiles', JSON.stringify(profiles));
                renderProfileManager();
                renderProfiles(); // Atualiza página principal
            } else {
                alert('Máximo de 5 perfis atingido.');
            }
        }

        // Inicializa perfis na carga da página
        document.addEventListener('DOMContentLoaded', renderProfiles);

         // Fecha modal ao clicar fora
        window.onclick = function(event) {
            const modal = document.getElementById('profile-modal');
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }