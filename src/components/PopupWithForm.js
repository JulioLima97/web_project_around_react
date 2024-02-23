import buttonClose from "../images/image-button-close.png";

export function PopupWithForm({
  title,
  name,
  submit,
  children,
  isOpen,
  onClose,
}) {
  return (
    <>
      <section className={`popup ${name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container" id="cards-form">
          <button type="button" className="button-close-popup">
            <img
              className="button-close-popup__image popup__close"
              src={buttonClose}
              alt="grande icone em 'x' para usado para fechar o popup"
              onClick={onClose}
            />
          </button>
          <form className="popup__form" noValidate="">
            <fieldset className="popup__set">
              <h2 className="popup__title">{title}</h2>
              {children}
              <button className="button-submit" type="submit">
                {submit}
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}
