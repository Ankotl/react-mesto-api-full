import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import ImagePopup from "./ImagePopup";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../context/CurrentUserContext";
import api from "../utils/api";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("jwt") ? true : false
  );
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isInfoTooltipOpen ||
    selectedCard.link;

  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then(({ data }) => {
          if (data) {
            setLoggedIn(true);
            setEmail(data.email);
            navigate("../", { replace: true });
          }
        })
        .catch(() => {
          setIsInfoTooltipOpen(true);
          setIsError(true);
          handleSignOut();
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  useEffect(() => {
    const closeEsc = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    const closeOverlay = (e) => {
      if (
        e.target.classList.contains("popup_opened") ||
        e.target.classList.contains("popup__btn-close")
      ) {
        closeAllPopups();
      }
    };
    document.addEventListener("mousedown", closeOverlay);
    document.addEventListener("keydown", closeEsc);
    return () => {
      document.removeEventListener("keydown", closeEsc);
      document.removeEventListener("mousedown", closeOverlay);
    };
  }, [isOpen]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((res) => {          
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => [
          ...prevCards.filter((c) => c._id !== card._id),
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsError(false);
    setSelectedCard({});
  };

  const handleUpdateUser = (user) => {
    setIsLoading(true);
    api
      .updateUserInfo(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api
      .updateAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleAddPlace = (card) => {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleRegister = ({ password, email }) => {
    setIsLoading(true);
    auth
      .register(email, password)
      .then(() => {
        navigate("../sign-in", { replace: true });
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
        setIsLoading(false);
      });
  };

  const handleLogin = ({ password, email }) => {
    setIsLoading(true);
    if (!email || !password) {
      return;
    }
    auth
      .login(email, password)
      .then(({ token }) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", token);
        setEmail(email);
        navigate("../", { replace: true });
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("../sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="wrapper">
          <Header email={email} onSignOut={handleSignOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register onRegister={handleRegister} isLoading={isLoading} />
              }
            />
            <Route
              path="/sign-in"
              element={<Login onLogin={handleLogin} isLoading={isLoading} />}
            />
          </Routes>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isError={isError}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
