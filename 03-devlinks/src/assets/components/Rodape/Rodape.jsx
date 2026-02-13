import React from 'react'

const Rodape = ({children}) => {
  return (
    <footer>
      <p>Feito com 💖 por <a href="https://github.com">{children}</a>
      </p>
    </footer>
  );
};

export default Rodape;
