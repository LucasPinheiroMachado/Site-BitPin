import { useState, useEffect } from 'react';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [serviceType, setServiceType] = useState('');
  const [personType, setPersonType] = useState('');
  const [name, setName] = useState('');
  const [cpf_cnpj, setCpfCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [cpfCnpjError, setCpfCnpjError] = useState('');
  const [cpfOrcnpj, setCpfOrcnpj] = useState('CPF ou CNPJ');
  const [phoneError, setPhoneError] = useState('');

  const navigate = useNavigate();
  const { insertDocument, response } = useInsertDocument('projects');

  useEffect(() => {
    if (personType) {
      setCpfCnpjError(''); // Remove o erro assim que o tipo de pessoa é selecionado
      if (personType === 'Pessoa Física') {
        setCpfOrcnpj('CPF');
      } else if (personType === 'Pessoa Jurídica') {
        setCpfOrcnpj('CNPJ');
      }
    } else {
      setCpfOrcnpj('CPF ou CNPJ');
    }
  }, [personType]);

  useEffect(() => {
    setPhoneError('');
    setFormError('');
  }, [phone]);

  // Função para validar CPF
  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++)
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(cpf.substring(10, 11));
  };

  // Função para validar CNPJ
  const validateCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    length++;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
  };

  const formatCpfCnpj = (value, personType) => {
    setCpfCnpjError(''); // Limpa o erro se o tipo de pessoa for selecionado
    setFormError('');

    value = value.replace(/\D/g, ''); // Remove qualquer caractere não numérico

    if (personType === 'Pessoa Física') {
      // Formatação de CPF (XXX.XXX.XXX-XX)
      if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos
      if (value.length > 9) {
        value = value
          .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
          .replace(/\.\./g, '.')
          .replace(/--/g, '-'); // Remove duplicações inesperadas
      } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
      } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
      } else if (value.length > 0) {
        value = value.replace(/(\d{3})/, '$1');
      }
    } else if (personType === 'Pessoa Jurídica') {
      // Formatação de CNPJ (XX.XXX.XXX/XXXX-XX)
      if (value.length > 14) value = value.slice(0, 14); // Limita a 14 dígitos
      if (value.length > 12) {
        value = value
          .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
          .replace(/\.\./g, '.')
          .replace(/--/g, '-')
          .replace(/\/\//g, '/'); // Remove duplicações inesperadas
      } else if (value.length > 8) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4');
      } else if (value.length > 5) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
      } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{3})/, '$1.$2');
      } else if (value.length > 0) {
        value = value.replace(/(\d{2})/, '$1');
      }
    }

    return value;
  };

  // Função para validar Telefone (mínimo 8 dígitos)
  const validatePhone = (phone) => {
    const cleanedPhone = phone.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    return cleanedPhone.length >= 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const formElement = document.querySelector('.formMain');

    // Remove a classe de shake para garantir que a animação seja reaplicada
    formElement.classList.remove('shake');

    // Check if all fields are filled
    if (
      !serviceType ||
      !personType ||
      !name ||
      !cpf_cnpj ||
      !email ||
      !phone ||
      !projectDescription
    ) {
      setFormError('Por favor, preencha todos os campos!');
      setTimeout(() => {
        formElement.classList.add('shake');
      }, 0);
      return;
    }

    // Validação de CPF/CNPJ
    const isCPFValid = personType === 'Pessoa Física' && validateCPF(cpf_cnpj);
    const isCNPJValid =
      personType === 'Pessoa Jurídica' && validateCNPJ(cpf_cnpj);

    if (!isCPFValid && !isCNPJValid) {
      setFormError(`Por favor, insira um ${cpfOrcnpj} válido!`);
      setCpfCnpjError(`Corrija o ${cpfOrcnpj}`);
      setTimeout(() => {
        formElement.classList.add('shake');
      }, 0);
      return;
    }

    // Validação de Telefone
    if (!validatePhone(phone)) {
      setFormError('Por favor, insira um telefone válido, lembre do DDD!');
      setPhoneError('Corrija o telefone');
      setTimeout(() => {
        formElement.classList.add('shake');
      }, 0);
      return;
    }

    // Insert the document into Firestore (or any other database)
    await insertDocument({
      serviceType,
      personType,
      name,
      cpf_cnpj,
      email,
      phone,
      projectDescription,
    });

    // Redirect to home page after submission
    navigate('/success');
  };

  return (
    <div className="formDiv">
      <h2 className="sectionTitle3">Solicitar Serviço</h2>
      <form onSubmit={handleSubmit} className="formMain">
        <label>
          <span>Tipo de Serviço:</span>
          <br />
          <select
            required
            onChange={(e) => setServiceType(e.target.value)}
            value={serviceType}
          >
            <option value="">Selecione um tipo de serviço</option>
            <option value="Sites institucionais">Sites Institucionais</option>
            <option value="Sistemas web">Sistemas Web</option>
            <option value="Blog">Blog</option>
            <option value="Landing Pages">Landing Pages</option>
            <option value="Site Pessoal">Site Pessoal</option>
            <option value="Espaço Influencer">Espaço Influencer</option>
          </select>
        </label>

        <label>
          <span>Você é:</span>
          <br />
          <select
            required
            onChange={(e) => setPersonType(e.target.value)}
            value={personType}
          >
            <option value="">Selecione o tipo de pessoa</option>
            <option value="Pessoa Física">Pessoa Física</option>
            <option value="Pessoa Jurídica">Pessoa Jurídica</option>
          </select>
        </label>

        {personType && (
          <label>
            <span>{cpfOrcnpj}:</span>
            <br />
            <input
              type="text"
              required
              placeholder={`Digite seu ${cpfOrcnpj}`}
              onChange={(e) =>
                setCpfCnpj(formatCpfCnpj(e.target.value, personType))
              }
              value={cpf_cnpj}
            />
            {cpfCnpjError && <p>*{cpfCnpjError}*</p>}
          </label>
        )}

        <label>
          <span>Nome:</span>
          <br />
          <input
            type="text"
            required
            placeholder="Digite seu nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>Email de Contato:</span>
          <br />
          <input
            type="email"
            required
            placeholder="Digite seu email de contato"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label>
          <span>Telefone de Contato:</span>
          <br />
          <input
            type="number"
            required
            placeholder="Digite seu telefone de contato"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          {phoneError && <p>*{phoneError}*</p>}
        </label>

        <label>
          <span>Descreva seu Projeto:</span>
          <br />
          <textarea
            required
            placeholder="Explique os detalhes do projeto"
            onChange={(e) => setProjectDescription(e.target.value)}
            value={projectDescription}
          ></textarea>
        </label>

        {!response.loading && <button>Enviar Solicitação</button>}
        {response.loading && <button disabled>Aguarde...</button>}
        {(response.error || formError) && (
          <p className="error shake2">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default Form;
