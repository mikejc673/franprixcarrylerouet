// Importe composants Shadcn et Lucide au besoin
import { Star } from 'lucide-react'; // Importe l'icône étoile
import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, prenom }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch {
      setMessage('Erreur de connexion au serveur');
    }
  };

  return (
    <><div className="min-h-screen bg-neutral-50">
      <header className="bg-primary text-white p-4 text-center">
        <h2 className="text-xl">Bienvenue chez Votre Épicerie</h2>
      </header>
      <main>
        {/* Section Héro */}
        <section id="hero" className="bg-primary text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold">Découvrez nos produits frais et locaux !</h1>
            <p className="mt-4 text-lg">Votre magasin de proximité pour une alimentation saine.</p>
            <button className="mt-6 bg-accent text-white px-6 py-3 rounded hover:bg-opacity-90">
              Voir les offres
            </button>
          </div>
        </section>

        {/* Section Promotions */}
        <section id="promotions" className="py-10">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow">
              {/* Remplace Badge par un span ou importe Badge si disponible */}
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">-20%</span>
              <h3>Fruits de saison</h3>
              <p>Prix barré : 5€ → 4€</p>
            </div>
            {/* Ajoute d'autres */}
          </div>
        </section>

        {/* Section Témoignages */}
        <section id="temoignages" className="py-10 bg-neutral-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Ce que disent nos clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-2">"Produits frais et service impeccable !"</p>
                <p className="font-semibold">Marie L.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-2">"Toujours des promos intéressantes."</p>
                <p className="font-semibold">Jean D.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-2">"Équipe super accueillante !"</p>
                <p className="font-semibold">Sophie T.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Formulaire Newsletter */}
        <section id="newsletter" className="py-10">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Inscrivez-vous à notre newsletter</h2>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded mb-4"
              />
              <input
                type="text"
                placeholder="Votre prénom"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded mb-4"
              />
              <button type="submit" className="bg-primary text-white px-6 py-3 rounded hover:bg-opacity-90">
                S'inscrire
              </button>
            </form>
            {message && <p className="mt-4 text-red-500">{message}</p>}
          </div>
        </section>
        {/* Infos Pratiques */}
        <section id="infos-pratiques" className="py-10 bg-neutral-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Infos Pratiques</h2>
            <p className="mb-2">Adresse : 2 chemin du rivage,13620 Carry le Rouet</p>
            <p className="mb-2">Horaires : Lun-Sam 7h30-20h45 Dim 9h-20h45</p>
            <p>Téléphone : 04 42 45 01 44</p>
          </div>
        </section>
        {/* Autres sections iront ici */}
      </main>
      <footer className="bg-neutral-200 p-4 text-center">
        <p>© 2025 Votre Épicerie - Tous droits réservés</p>
      </footer>
    </div>
    </>
  );
}

export default App;