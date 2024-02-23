import buttonEdit from '../images/image-button-edit.png'
import buttonAdd from '../images/image-button-add.png'

import { useState, useEffect, useContext } from "react";
import api from "../utils/api.js";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
}) {

  const [cardsApp, setCards] = useState([]);
  const userData = useContext(CurrentUserContext);

  useEffect(() => {
    api.getInitialCards().then((apiCards) => setCards(apiCards));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === userData._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(cardId) {
    api.removeCard(cardId).then(() => {
      setCards(cardsApp.filter((card) => card._id !== cardId));
    });
  }
  return (
    <>
      <section className="perfil">
        <div className="perfil__view">
          <button type="button" className="perfil__edit-avatar">
            <img
              className="perfil__photo"
              src={userData.avatar}
              alt="foto de perfil do usuário"
              onClick={onEditAvatarClick}
            />
          </button>
          <div className="perfil__card">
            <h1 className="perfil__name">{userData.name}</h1>
            <h2 className="perfil__profission">{userData.about}</h2>
            <button
              type="button"
              className="button-edit"
              onClick={onEditProfileClick}
            >
              <img
                className="perfil__edit-button-img"
                src={buttonEdit}
                alt="desenho de uma caneta"
              />
            </button>
          </div>
        </div>
        <button type="button" className="button-add" onClick={onAddPlaceClick}>
          <img
            className="perfil__add-button-img"
            src={buttonAdd}
            alt="um sinal de mais usado como botão de adicionar"
          />
        </button>
      </section>
      <section className="card">
        <ul className="card__template card">
          {cardsApp.map((card) => (
            <Card
              productData={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
        <template id="template" />
      </section>
    </>
  );
}
