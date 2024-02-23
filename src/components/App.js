import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup"
import api from "../utils/api";
import Main from "./Main";
import { PopupWithForm } from "./PopupWithForm";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    api.getUserInfo()
    .then((userInfo) => setCurrentUser(userInfo));
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <section className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header/>
      <Main
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        title="Editar perfil"
        name="popup"
        submit="Salvar"
        onClose={closeAllPopups}
      >
        <>
          <label>
            <input
              className="input input-name"
              id="name-input"
              type="text"
              name="name"
              placeholder="Nome"
              required=""
              minLength={2}
              maxlenght={40}
            />
            <span className="name-input-error" />
          </label>
          <label>
            <input
              className="input input-description"
              id="description-input"
              type="text"
              name="about"
              placeholder="Sobre mim"
              required=""
              minLength={2}
              maxlenght={40}
            />
            <span className="description-input-error" />
          </label>
        </>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        title="Novo Local"
        name="popup"
        submit="Criar"
        onClose={closeAllPopups}
      >
        <>
          <label>
            <input
              className="input input-título"
              type="text"
              name="name"
              placeholder="Título"
              required=""
              minLength={2}
              maxlenght={40}
            />
            <span className="span" />
          </label>
          <label>
            <input
              className="input input-link"
              type="url"
              name="link"
              placeholder="Link de imagem"
              required=""
              minLength={2}
              maxlenght={40}
            />
            <span className="span" />
          </label>
        </>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        title="Alterar a foto do perfil"
        name="popup"
        submit="Salvar"
        onClose={closeAllPopups}
      >
        <>
          <label>
            <input
              className="input input-avatar"
              id="avatar-input"
              type="url"
              name="link"
              placeholder="Link de imagem"
              required=""
              minLength={2}
              maxlenght={40}
            />
            <span className="avatar-input-error" />
          </label>
        </>
      </PopupWithForm>

      <PopupWithForm
        title="Tem certeza?"
        name="popup"
        submit="Sim"
        onClose={closeAllPopups}
      ></PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <Footer/>
      </CurrentUserContext.Provider>
    </section>
  );
}

export default App;
