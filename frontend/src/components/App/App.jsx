import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import EditProfileInfoModal from "../Modals/EditProfileInfoModal/EditProfileInfoModal";
import InfoTooltip from "../InfoTooltip";
import EditProfileImageModal from "../Modals/EditProfileImageModal/EditProfileImageModal";
import AddCardModal from "../Modals/AddCardModal/AddCardModal";
import ImageModal from "../Modals/ImageModal/ImageModal";
import { ProtectedRoute } from "../ProtectedRoute";
import { Api } from "../../utils/api";
import * as auth from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import styles from "./App.module.scss";

function App() {
  const history = useHistory();

  const api = new Api({
    address: `${process.env.REACT_APP_API_URL}`,
    headers: { "Content-Type": "application/json" },
    notAuthorizedHandler: () => {
      history.push("/sign-in");
    },
  });

  const [loggedIn, setLoggedIn] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddCardClick = () => {
    setIsAddCardPopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const getApiData = () => {
    Promise.all([api.getUserInfoApi(), api.getCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loggedIn) {
      getApiData();
    }
  }, [loggedIn]);

  function handleLogin(email, password) {
    return auth
      .authorize(email, password)
      .then(() => {
        getApiData();
        setLoggedIn(true);
        history.push("/");
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccessful(false);
      });
  }

  function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccessful(true);
        history.push("/sign-in");
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccessful(false);
      });
  }

  function signOut() {
    return auth
      .signout()
      .then(() => {
        setLoggedIn(false);
        history.push("./sign-in");
      })
      .catch((err) => console.log(err));
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (res) => {
    api
      .updateUserInfo(res)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .updateUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser.id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={styles.app}>
        <Header userEmail={userEmail} signOut={signOut} />

        <Switch>
          <Route path='/sign-up'>
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path='/sign-in'>
            <Login handleLogin={handleLogin} />
          </Route>

          <ProtectedRoute path='/' loggedIn={loggedIn}>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              cards={cards}
              onAddCard={handleAddCardClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>

          <Route>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          successResult={isRegistrationSuccessful}
          onClose={closeAllPopups}
          successMessage={"Вы успешно зарегистрировались!"}
          failMessage={"Что-то пошло не так! Попробуйте ещё раз."}
        />

        <EditProfileInfoModal
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditProfileImageModal
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddCardModal
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImageModal card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
