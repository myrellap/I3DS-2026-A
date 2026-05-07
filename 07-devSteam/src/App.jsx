import Header from "./components/Header";
import PromoCard from "./components/PromoCard";
import GameCard from "./components/GameCard";

function App() {
  const promoGames = [
    {
      id: 1,
      title: "Roblox",
      image: "/src/assets/Roblox.jpg",
      price: "R$99,90",
    },

    {
      id: 2,
      title: "The Sims",
      image: "/src/assets/The sims.avif",
      price: "R$99,90",
    },

    {
      id: 3,
      title: "Hogwarts",
      image: "/src/assets/Hogwarts_Legacy_capa.jpeg",
      price: "R$99,90",
    },
  ];

  const otherGames = [
    {
      id: 4,
      title: "GTA 5",
      category: "RPG, Mundo Aberto",
      image: "/src/assets/GTALogo.jpg",
      price: "R$149,90",
    },

    {
      id: 5,
      title: "The Last Of Us",
      category: "RPG, Mundo Aberto",
      image: "/src/assets/The Last Of Us.webp",
      price: "R$149,90",
    },

      {
      id: 6,
      title: "Super Mario",
      category: "RPG, Mundo Aberto",
      image: "/src/assets/super mario.jpeg",
      price: "R$149,90",
    },

      {
      id: 7,
      title: "Fortinite",
      category: "RPG, Mundo Aberto",
      image: "/src/assets/fortinite.jpeg",
      price: "R$149,90",
    },
  ];
  
  return (
    <div className="container">
      <Header />

      <section>
        <h1>PROMOÇÕES</h1>

        <div className="promo-grid">
          {promoGames.map((game) => (
            <PromoCard
              key={game.id}
              game={game}
            />
          ))}
        </div>
      </section>

      <section>
        <h1>OUTROS JOGOS</h1>

        <div className="games-list">
          {otherGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;