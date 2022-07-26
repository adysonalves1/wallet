const nome = document.querySelector('#nome')
const email = document.querySelector('#email')
const submit = document.querySelector('#submit')
const cpf = document.querySelector('#cpf')
const dataNascimento = document.querySelector('#dataNascimento')
const telefone = document.querySelector('#telefone')
const instituicao = document.querySelector('#instituicao')
const tipo_conta = document.querySelector('#tipo_conta')
const matricula = document.querySelector('#matricula')
const senha = document.querySelector('#senha')

nome.addEventListener('blur', () => {
    let regex = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;

    nome.value = nome.value.trim()
    nome.value = nome.value.replace(/[^A-zÀ-ú\s]/gi, '')
    if (regex.test(nome.value) && nome.value != '' && typeof nome.value != undefined && nome.value != null) {
        nome.classList.remove('border-error-form')
        nome.classList.add('border-success-form')
    } else {
        nome.classList.remove('border-success-form')
        nome.classList.add('border-error-form')
    }

})

email.addEventListener('blur', () => {
    let regex = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;

    email.value = email.value.trim()
    email.value = email.value.toLowerCase()

    if (regex.test(email.value) && email.value != '' && email.value != typeof undefined && email.value != null) {
        email.classList.remove('border-error-form')
        email.classList.add('border-success-form')
    } else {
        email.classList.remove('border-success-form')
        email.classList.add('border-error-form')
    }
})

cpf.setAttribute('maxlength', '11')

cpf.addEventListener('keyup', () => {

    // REMOVE LETRAS
    cpf.value = cpf.value.replace(/[a-zA-Z\u00C0-\u00FF ]+/i, '');
    cpf.value = cpf.value.replace(/\W|_/, '');

})

cpf.addEventListener('blur', () => {
    let regex = [0 - 9];
    cpf.value = cpf.value.replace(/\W|_/, '');

    if (cpf.value.length == 11 && /[0-9]/.test(cpf.value)) {

        cpf.classList.remove('border-error-form')
        cpf.classList.add('border-success-form')
    } else {
        cpf.classList.remove('border-success-form')
        cpf.classList.add('border-error-form')
    }

})

dataNascimento.addEventListener('blur', () => {
    let regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (regex.test(dataNascimento.value) && dataNascimento.value != '') {
        dataNascimento.classList.remove('border-error-form')
        dataNascimento.classList.add('border-success-form')
    } else {
        dataNascimento.classList.remove('border-success-form')
        dataNascimento.classList.add('border-error-form')
    }
})

telefone.setAttribute('maxlength', '11')

telefone.addEventListener('keyup', () => {

    // REMOVE LETRAS
    telefone.value = telefone.value.replace(/[a-zA-Z\u00C0-\u00FF ]+/i, '');
    telefone.value = telefone.value.replace(/\W|_/, '');
})

telefone.addEventListener('blur', () => {
    telefone.value = telefone.value.trim()
    if (telefone.value.length === 11 && telefone.value != '') {
        telefone.classList.remove('border-error-form')
        telefone.classList.add('border-success-form')
    } else {
        telefone.classList.remove('border-success-form')
        telefone.classList.add('border-error-form')
    }
})


instituicao.addEventListener('blur', () => {
    if (instituicao.value != '') {
        instituicao.classList.remove('border-error-form')
        instituicao.classList.add('border-success-form')
    } else {
        instituicao.classList.remove('border-success-form')
        instituicao.classList.add('border-error-form')
    }
})

tipo_conta.addEventListener('blur', () => {
    if (tipo_conta.value != '') {
        tipo_conta.classList.remove('border-error-form')
        tipo_conta.classList.add('border-success-form')
    } else {
        tipo_conta.classList.remove('border-success-form')
        tipo_conta.classList.add('border-error-form')
    }

    if (tipo_conta.value === 'aluno') {


        matricula.addEventListener('blur', () => {
            tipo_conta.setAttribute('required','required');
            if (matricula.value != '') {
                matricula.classList.remove('border-error-form')
                matricula.classList.add('border-success-form')
            } else {
                matricula.classList.remove('border-success-form')
                matricula.classList.add('border-error-form')
            }
        })
    } else if (tipo_conta.value === 'funcionario') {
        matricula.addEventListener('blur', () => {
            tipo_conta.required = false
            matricula.classList.remove('border-error-form')
            matricula.classList.remove('border-success-form')
        })
    }
})

senha.addEventListener('blur', () => {
    senha.value = senha.value.trim()
    if (senha.value.length === 8) {
        senha.classList.remove('border-error-form')
        senha.classList.add('border-success-form')
    } else {
        senha.classList.remove('border-success-form')
        senha.classList.add('border-error-form')
    }
})









