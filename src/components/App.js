import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import api from "../utils/api";
import { AddPlacePopup } from "./AddPlacePopup.js";
import { EditAvatarPopup } from "./EditAvatarPopup.js";
import { EditProfilePopup } from "./EditProfilePopup.js";
import { ConfirmDeletePopup } from "./ConfirmDeletePopup.js";
import { useState, useEffect, useCallback } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({
    name: " ",
    about: " ",
    avatar: " ",
  });

  useEffect(() => {
    api.getUserInfo().then((userInfo) => setCurrentUser(userInfo));
  }, []);
  

  const [cardsApp, setCards] = useState([]);
  useEffect(() => {
    api.getInitialCards().then((apiCards) => setCards(apiCards));
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

  function handleConfirmDeleteClick (cardId) {
    setSelectedCardToDelete(cardId);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCardToDelete("");
    setSelectedCard(null);
  };

  // comando para fechar popups com Esc
  const EnableEsc = () => {
    const escFunction = useCallback((event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }, []);

    useEffect(() => {
      document.addEventListener("keydown", escFunction, false);

      return () => {
        document.removeEventListener("keydown", escFunction, false);
      };
    }, [escFunction]);
  };
  EnableEsc();

  const handleUpdateUser = ({ name, about }) => {
    api.editUserInfo(name, about).then(setCurrentUser).then(closeAllPopups);
  };
 
  const handleUpdateAvatar = (avatar) => {
    api.editAvatar(avatar).then(setCurrentUser).then(closeAllPopups);
  };

  const handleAddPlaceSubmit = (name, link) => {
    api.addCard(name, link).then((newCard) => setCards([newCard, ...cardsApp])).then(closeAllPopups);
  };

  const handleCardLike = (card) => {
    // Verifique mais uma vez se esse cartão já foi curtido
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Envie uma solicitação para a API e obtenha os dados do cartão atualizados
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  };

  const handleCardDelete = (cardId) => {
    api.deleteCard(cardId).then(() => {
      setCards(cardsApp.filter((card) => card._id !== cardId));
      setSelectedCardToDelete("");
    });
  };

  return (
    <section className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onConfirmClick={handleConfirmDeleteClick}
          cardsApp={cardsApp}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ConfirmDeletePopup
          cardId={selectedCardToDelete}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </CurrentUserContext.Provider>
    </section>
  );
}

export default App;
