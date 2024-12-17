// Carrossel
var doubtElements = document.querySelectorAll(".duvida");

doubtElements.forEach(function(duvida) {
    duvida.addEventListener('click', function() {
        duvida.classList.toggle('ativa');
    });
});

const imagesCarrossel = document.getElementById("img-div");
const images = document.querySelectorAll("#img-div .img-e");
const logo = document.querySelectorAll(".logo");

let idx = 0;

if (imagesCarrossel !== null && images !== null) {
    function carrossel() {
        idx++;

        if (idx > images.length - 1) {
            idx = 0;
        }

        imagesCarrossel.style.transform = `translateX(${-idx * 10}px)`;
    }
}

setInterval(carrossel, 1800);

//--------------------------------------------------------------------

//função trocar cor
function toggleScheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark');
    const mainLogo = document.getElementById('main-logo');

    if (isDark) {
        body.classList.remove('light');
        localStorage.setItem('colorScheme', 'dark');
        mainLogo.src = "../imagens/logo_sfundo.png";
    } else {
        body.classList.add('light');
        localStorage.setItem('colorScheme', 'light');
        mainLogo.src = "../imagens/logo_cv_sem_fundo.png";
    }
}

// tema inicial
(function initializeScheme() {
    const savedScheme = localStorage.getItem('colorScheme') || 'light';
    const mainLogo = document.getElementById('main-logo'); // Seleciona o logo principal.

    document.body.classList.add(savedScheme);
    if (mainLogo !== null) {
        if (savedScheme === 'dark') {
            mainLogo.src = "../imagens/logo_sfundo.png"; // Define logo escuro se o tema salvo for 'dark'.
        } else {
            mainLogo.src = "../imagens/logo_cv_sem_fundo.png"; // Define logo claro se o tema salvo for 'light'.
        }
    }
})();

// ---------------------------------------------------------------------
// função viaCEP
async function buscarEndereco(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error('Erro ao buscar o endereço');
        }
        const data = await response.json();
        if (data.erro) {
            exibirMensagem('CEP não encontrado.', 'red');
            return;
        }

        // Preenchendo os campos
        document.getElementById('endereco').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';

        // Validando o estado
        validarEstado(data.uf);
    } catch (error) {
        console.error('Erro:', error);
        exibirMensagem('Erro ao buscar o CEP. Verifique o formato e tente novamente.', 'red');
    }
}

function validarEstado(estado) {
    const mensagem = document.getElementById('mensagem');
    if (estado.toUpperCase() !== 'SP') {
        exibirMensagem('No momento, não atendemos regiões fora do estado de São Paulo.', 'yellow');
    } else {
        exibirMensagem('Atendemos sua região!', 'green');
    }
}

function exibirMensagem(texto, cor) {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto;
    mensagem.style.color = cor;
    mensagem.style.display = 'block';
}

function onCepBlur(event) {
    const cep = event.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
        buscarEndereco(cep);
    } else {
        exibirMensagem('CEP inválido. Insira um CEP com 8 dígitos.', 'red');
    }
}

// ------------------------------------
// função mandar form de contato
const form = document.getElementById('contact-form');

if (form !== null) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        window.location.href = `mailto:contato@creative.com?subject=Contato de ${name}&body=${message} (Email: ${email})`;
    });
}