import React from 'react';
import lucas from '../../assets/fotoLucas.jpeg';
import joao from '../../assets/fotoJoao.jpeg';

const Members = () => {
  return (
    <div className="members">
      <div className="memberTitleDiv">
        <h1 className="memberTitle">Nossa Equipe:</h1>
      </div>
      <div className="lucas">
        <div className="aboutMember">
          <h1>Lucas Machado</h1>
          <div className="aboutLine"></div>
          <p>
            Lucas é o desenvolvedor full-stack da nossa startup e também
            estudante de Sistemas de Informação. Ele possui habilidades em HTML,
            CSS, JavaScript, NodeJs, ReactJs, Typescript, Java, C, Firebase,
            MySQL e Git. Sua expertise em diversas tecnologias e linguagens de
            programação faz dele um membro essencial para o desenvolvimento e
            inovação de nossa empresa.
          </p>
        </div>
        <div className="imgMember">
          <img src={lucas} alt="Imagem de Lucas" />
        </div>
      </div>
      <div className="joao">
        <div className="aboutMember">
          <h1>João Amorim</h1>
          <div className="aboutLine"></div>
          <p>
            João é desenvolvedor front-end da nossa startup, estudante de
            Sistemas de Informação e consultor técnico de vendas. Além disso,
            ele é especialista em ciência de dados. Sua combinação única de
            conhecimentos técnicos e experiência prática traz uma perspectiva
            valiosa e diferenciada para a nossa empresa, contribuindo para
            soluções inovadoras e estratégicas no nosso desenvolvimento.
          </p>
        </div>
        <div className="imgMember">
          <img src={joao} alt="Imagem de João" />
        </div>
      </div>
    </div>
  );
};

export default Members;
