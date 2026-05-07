function Header() {
  return (
    <header className="header">

      <div className="logo">
        <img src="/src/assets/Captura de Tela 2026-05-07 às 14.07.06.png" alt="logo" />
        <h1>DevSteam</h1>
      </div>

      <input type="text" placeholder="Buscar" />

      <div className="cart">
         <img src="/src/assets/cart-variant 1.png " alt="carrinho" />
      </div>

    </header>
  );
}

export default Header;