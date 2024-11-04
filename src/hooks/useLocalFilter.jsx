import { useEffect, useState } from 'react';

const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const removeExtraSpaces = (str) => {
  return str.replace(/\s+/g, ' ').trim(); // Remove espaços extras e trim
};

export const useLocalFilter = (documents, search) => {
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  useEffect(() => {
    if (documents) {
      // Normaliza a string de busca (remove acentos, espaços extras e converte para minúsculas)
      const normalizedSearch = removeAccents(
        removeExtraSpaces(search ? search.toLowerCase() : ''),
      );

      // Filtra os documentos com base na pesquisa
      const results = documents.filter((doc) => {
        const normalizedName = removeAccents(
          removeExtraSpaces(doc.name ? doc.name.toLowerCase() : ''),
        );
        const normalizedCpfCnpj = removeAccents(
          removeExtraSpaces(doc.cpf_cnpj ? doc.cpf_cnpj.toLowerCase() : ''),
        );
        const normalizedEmail = removeAccents(
          removeExtraSpaces(doc.email ? doc.email.toLowerCase() : ''),
        );
        const normalizedPersonType = removeAccents(
          removeExtraSpaces(doc.personType ? doc.personType.toLowerCase() : ''),
        );
        const normalizedPhone = removeAccents(
          removeExtraSpaces(doc.phone ? doc.phone.toLowerCase() : ''),
        );
        const normalizedServiceType = removeAccents(
          removeExtraSpaces(
            doc.serviceType ? doc.serviceType.toLowerCase() : '',
          ),
        );

        // Verifica se a busca está incluída em qualquer um dos campos
        return (
          normalizedName.includes(normalizedSearch) ||
          normalizedCpfCnpj.includes(normalizedSearch) ||
          normalizedEmail.includes(normalizedSearch) ||
          normalizedPersonType.includes(normalizedSearch) ||
          normalizedPhone.includes(normalizedSearch) ||
          normalizedServiceType.includes(normalizedSearch)
        );
      });
      setFilteredDocuments(results);
    }
  }, [documents, search]);

  return filteredDocuments;
};
