// create functions for get elements with class or id
const $ = document;

function _class(className) {
  return $.querySelector("." + className);
}

function _id(idName) {
  return $.getElementById(idName);
}
function _QSElementAll(QS) {
  return $.querySelectorAll("." + QS);
}

// notification
let notificationBox = _class("notification-Box");
let notificationContent = _class("notification");
let notificationText = _class("notification-text");
let hideNotificationIcon = _class("delIcon");

function showNotification(text) {
  let isClick = false;
  if (!isClick) {
    isClick = true;

    notificationBox.style.display = "flex";
    notificationText.innerHTML = text;
    setTimeout(function () {
      hideNotificationIcon.style.display = "flex";
      hideNotificationIcon.addEventListener("click", function () {
        notificationBox.classList.remove("animate__backInDown");
        notificationBox.classList.add("animate__backOutUp");
        hideNotificationIcon.classList.remove("animate__slideInDown");
        hideNotificationIcon.classList.add("animate__slideOutUp");
        setTimeout(function () {
          notificationBox.style.display = "none";
          notificationText.innerHTML = "";
          notificationBox.classList.remove("animate__backOutUp");
          notificationBox.classList.add("animate__backInDown");
        }, 1000);
        isClick = false;
      });
      setTimeout(function () {
        if (isClick) {
          notificationBox.classList.remove("animate__backInDown");
          notificationBox.classList.add("animate__backOutUp");
          hideNotificationIcon.classList.remove("animate__slideInDown");
          hideNotificationIcon.classList.add("animate__slideOutUp");
          setTimeout(function () {
            notificationBox.style.display = "none";
            notificationText.innerHTML = "";
            notificationBox.classList.remove("animate__backOutUp");
            notificationBox.classList.add("animate__backInDown");
            isClick = false;
          }, 1000);
        }
      }, 3000);
    }, 2000);
  }
}

// get main elements by function
let menu = _class("menu");
let wecomeText = _class("wecome-text span");
let userNameMenu = _class("users-name");
let gameSetMenu = _class("game-sets");

// get elements by function for two player game
let getNameForTwoPlayerGame = _class("get-users-name");
let TwoPlayerGame = _class("twoPlayer");
let TPGnameButton = _id("twoPlayerNameBTN");
let firstPlayerName = _id("firstPlayer-name");
let secondPlayerName = _id("secondPlayer-name");

// get elements by function for game set menu
let setForm = _class("round-number");
let setFormRadioS = _QSElementAll("round-number input");
let gameSetMenuBTN = _id("gameSetBTN");
let gameSet;
let showSetNumber = _class("show-set-number");
let showSetNumberText = _class("set-number-text");
let setCounter = 1;

// get elements by function for select color menu
let selectColorMenu = _class("selectColor");
let selectColorFirstPlayer = _class("player-one");
let selectColorSecondPlayer = _class("player-two");
let firstPlayerLabel = _class("player-one label");
let secondPlayerLabel = _class("player-two label");
let firstPlayerCircle = _class("blueColor");
let secondPlayerCircle = _class("redColor");
let changerIcon = _class("changer");
let selectColorBTN = _class("selectColorBTN");

// get elements by function for nav bar
let navBar = _class("name-and-points");

let leftBox = _class("first-user");
let leftWinSet = _id("win-set-left");
let leftPlayerName = _id("first-player-name");
let leftHandIcon = _class("LeftTurn");

let rightBox = _class("second-user");
let rightWinSet = _id("win-set-right");
let rightPlayerName = _id("Second-player-name");
let rightHandIcon = _class("rightTurn");

// get elements by function for game
let mainGame = _class("main-game");
let boxes = _QSElementAll("box");
let gameData = [
  { boxNumber: "box1", color: "", click: false },
  { boxNumber: "box2", color: "", click: false },
  { boxNumber: "box3", color: "", click: false },
  { boxNumber: "box4", color: "", click: false },
  { boxNumber: "box5", color: "", click: false },
  { boxNumber: "box6", color: "", click: false },
  { boxNumber: "box7", color: "", click: false },
  { boxNumber: "box8", color: "", click: false },
  { boxNumber: "box9", color: "", click: false },
];
let redWinBox = [];
let blueWinBox = [];

let redPoint = 0;
let bluePoint = 0;

// loader
let spin = _id("spin");

function loaded() {
  setTimeout(function () {
    spin.style.display = "none";
    wecomeText.style.display = "flex";
    setTimeout(function () {
      menu.style.display = "flex";
      wecomeText.classList.remove("animate__slideInDown");
      wecomeText.classList.add("animate__slideOutUp");
      setTimeout(function () {
        wecomeText.style.display = "none";
      }, 900);
    }, 2000);
  }, 3000);
}

window.addEventListener("load", loaded);
// end page
let endPage = _class("end-page");
let cupIcon = _class("cup-icon");
let victoryText = _class("victory-text");
let winnerBox = _class("winner-box");
let winner = _class("winner-player");
let userIcon = _class("user-icon");
let isWinnerLeftSide = true;
let isWinnerRed = false;

function showEnd() {
  navBar.style.display = "none";
  mainGame.style.display = "none";
  showSetNumber.style.display = "none";
  setTimeout(function () {
    endPage.style.display = "flex";

    setTimeout(function () {
      cupIcon.classList.add("animate__zoomOut");

      if (isWinnerRed) {
        winner.style.color = "#e84118";
        userIcon.style.color = "#e84118";
        if (isWinnerLeftSide) {
          winner.innerHTML = rightPlayerName.innerHTML;
        } else {
          winner.innerHTML = leftPlayerName.innerHTML;
        }
      } else {
        winner.style.color = "#00a8ff";
        userIcon.style.color = "#00a8ff";
        if (isWinnerLeftSide) {
          winner.innerHTML = leftPlayerName.innerHTML;
        } else {
          winner.innerHTML = rightPlayerName.innerHTML;
        }
      }
      setTimeout(function () {
        cupIcon.style.display = "none";
        victoryText.style.display = "flex";
        winnerBox.style.display = "flex";
      }, 1000);
    }, 2000);
  }, 500);
}

// create flags
let isTPG = false;
let isClickBox = false;
let canRun = true;
let IsBlue = true;
let leftPlayer;
let leftPlayerColor;
let leftRound = true;

function startGame() {
  if (!firstPlayerName.value) {
    showNotification("! نام بازیکن اول را وارد نمایید ");
  } else if (!secondPlayerName.value) {
    showNotification("! نام بازیکن دوم را وارد نمایید ");
  } else if (firstPlayerName.value == secondPlayerName.value) {
    showNotification("! لطفا از دو نام مشابه استفاده نکنید");
  } else {
    leftPlayerName.innerHTML = firstPlayerName.value;
    rightPlayerName.innerHTML = secondPlayerName.value;
    firstPlayerLabel.innerHTML = firstPlayerName.value;
    secondPlayerLabel.innerHTML = secondPlayerName.value;
    userNameMenu.style.display = "none";
    gameSetMenu.style.display = "flex";
    setFormRadioS.forEach(function (item) {
      item.addEventListener("click", function (event) {
        gameSet = event.target.value;
      });
    });
    gameSetMenuBTN.addEventListener("click", function () {
      if (!gameSet) {
        showNotification("! تعداد دور بازی رو مشخص کن");
      } else {
        gameSetMenu.style.display = "none";
        selectColorMenu.style.display = "flex";
        changerIcon.addEventListener("click", function () {
          if (IsBlue) {
            firstPlayerLabel.style.color = "#e84118";
            secondPlayerLabel.style.color = "#00a8ff";
            firstPlayerCircle.classList.remove("blueColor");
            firstPlayerCircle.classList.add("redColor");
            secondPlayerCircle.classList.remove("redColor");
            secondPlayerCircle.classList.add("blueColor");
            IsBlue = false;
            leftPlayer = "red";
          } else {
            firstPlayerLabel.style.color = "#00a8ff";
            secondPlayerLabel.style.color = "#e84118";
            firstPlayerCircle.classList.remove("redColor");
            firstPlayerCircle.classList.add("blueColor");
            secondPlayerCircle.classList.remove("blueColor");
            secondPlayerCircle.classList.add("redColor");
            IsBlue = true;
            leftPlayer = "blue";
          }
        });
        selectColorBTN.addEventListener("click", function () {
          selectColorMenu.style.display = "none";
          menu.style.display = "none";
          showSetNumberText.innerHTML = `${setCounter} / ${gameSet}`;
          showSetNumber.style.display = "flex";
          setTimeout(function () {
            showSetNumber.classList.remove("animate__fadeInDown");
            showSetNumber.classList.add("animate__fadeOutUp");
            setTimeout(function () {
              showSetNumber.style.display = "none";
              showSetNumber.classList.remove("animate__fadeOutUp");
              showSetNumber.classList.add("animate__fadeInDown");
              navBar.style.display = "flex";
              mainGame.style.display = "flex";
              if (leftPlayer == "red") {
                leftPlayerColor = "red";
                leftBox.style.backgroundColor = "#e84118";
                leftBox.style.boxShadow = "0 5px 20px #e84118";
                leftHandIcon.style.color = "#e84118";
                rightBox.style.backgroundColor = "#00a8ff";
                rightBox.style.boxShadow = "0 5px 20px #00a8ff";
                rightHandIcon.style.color = "#00a8ff";
                boxes.forEach(function (box) {
                  box.classList.remove("emptyCircle", "circle", "cross");
                  box.classList.add("emptyCross");
                });
              } else {
                leftPlayerColor = "blue";
                boxes.forEach(function (box) {
                  box.classList.remove("emptyCross", "circle", "cross");
                  box.classList.add("emptyCircle");
                });
              }

              boxes.forEach(function (box) {
                box.addEventListener("click", function () {
                  box.classList.forEach(function (item) {
                    if (item === "clicked") {
                      canRun = false;
                    } else {
                      canRun = true;
                    }
                  });

                  if (canRun) {
                    if (leftRound) {
                      leftHandIcon.style.display = "none";
                      rightHandIcon.style.display = "block";
                      leftRound = false;
                    } else {
                      rightHandIcon.style.display = "none";
                      leftHandIcon.style.display = "block";
                      leftRound = true;
                    }

                    let emptyBoxes = $.getElementsByClassName("empty");

                    if (leftPlayerColor == "red") {
                      box.classList.remove("emptyCircle", "emptyCross");
                      box.classList.add("cross");
                      box.classList.remove("empty");

                      for (var i = 0; i < emptyBoxes.length; i++) {
                        emptyBoxes[i].classList.remove("emptyCross");
                        emptyBoxes[i].classList.add("emptyCircle");
                      }

                      leftPlayerColor = "blue";
                    } else {
                      box.classList.remove("emptyCircle", "emptyCross");
                      box.classList.add("circle");
                      box.classList.remove("empty");

                      for (var i = 0; i < emptyBoxes.length; i++) {
                        emptyBoxes[i].classList.remove("emptyCircle");
                        emptyBoxes[i].classList.add("emptyCross");
                      }

                      leftPlayerColor = "red";
                    }
                    let boxID = box.getAttribute("id");
                    gameData.forEach(function (item) {
                      if (item.boxNumber == boxID) {
                        if (leftPlayerColor != "red") {
                          item.color = "red";
                        } else {
                          item.color = "blue";
                        }
                        item.click = true;
                      }
                    });
                    gameData.forEach(function (item) {
                      if (item.click == true && item.color == "red") {
                        if (!redWinBox.includes(item.boxNumber)) {
                          redWinBox.push(item.boxNumber);
                        }
                      }
                      if (item.click == true && item.color == "blue") {
                        if (!blueWinBox.includes(item.boxNumber)) {
                          blueWinBox.push(item.boxNumber);
                        }
                      }
                    });

                    if (
                      (redWinBox.includes("box1") &&
                        redWinBox.includes("box2") &&
                        redWinBox.includes("box3")) ||
                      (redWinBox.includes("box4") &&
                        redWinBox.includes("box5") &&
                        redWinBox.includes("box6")) ||
                      (redWinBox.includes("box7") &&
                        redWinBox.includes("box8") &&
                        redWinBox.includes("box9")) ||
                      (redWinBox.includes("box1") &&
                        redWinBox.includes("box4") &&
                        redWinBox.includes("box7")) ||
                      (redWinBox.includes("box2") &&
                        redWinBox.includes("box5") &&
                        redWinBox.includes("box8")) ||
                      (redWinBox.includes("box3") &&
                        redWinBox.includes("box6") &&
                        redWinBox.includes("box9")) ||
                      (redWinBox.includes("box1") &&
                        redWinBox.includes("box5") &&
                        redWinBox.includes("box9")) ||
                      (redWinBox.includes("box3") &&
                        redWinBox.includes("box5") &&
                        redWinBox.includes("box7"))
                    ) {
                      setCounter++;
                      redPoint++;
                      isWinnerRed = true;

                      boxes.forEach(function (box) {
                        box.classList = "";
                        box.classList.add("box", "empty", "emptyCircle");
                      });
                      if (IsBlue) {
                        rightWinSet.innerHTML = redPoint;
                        isWinnerLeftSide = true;
                      } else {
                        leftWinSet.innerHTML = redPoint;
                        isWinnerLeftSide = false;
                      }

                      if (gameSet == 3) {
                        if (redPoint == 2 || bluePoint == 2) {
                          showEnd();
                        }
                      } else if (gameSet == 5) {
                        if (redPoint == 3 || bluePoint == 3) {
                          showEnd();
                        }
                      } else if (gameSet == 7) {
                        if (redPoint == 4 || bluePoint == 4) {
                          showEnd();
                        }
                      } else {
                        if (setCounter <= gameSet) {
                          showSetNumberText.innerHTML = `${setCounter} / ${gameSet}`;
                          showSetNumber.style.display = "flex";
                          setTimeout(function () {
                            showSetNumber.classList.remove(
                              "animate__fadeInDown"
                            );
                            showSetNumber.classList.add("animate__fadeOutUp");
                            setTimeout(function () {
                              showSetNumber.style.display = "none";
                              showSetNumber.classList.remove(
                                "animate__fadeOutUp"
                              );
                              showSetNumber.classList.add(
                                "animate__fadeInDown"
                              );
                            }, 900);
                          }, 2000);
                        } else {
                          showEnd();
                        }
                      }

                      redWinBox = [];
                      blueWinBox = [];
                      gameData.forEach(function (item) {
                        item.color = "";
                        item.click = false;
                      });
                    } else if (
                      (blueWinBox.includes("box1") &&
                        blueWinBox.includes("box2") &&
                        blueWinBox.includes("box3")) ||
                      (blueWinBox.includes("box4") &&
                        blueWinBox.includes("box5") &&
                        blueWinBox.includes("box6")) ||
                      (blueWinBox.includes("box7") &&
                        blueWinBox.includes("box8") &&
                        blueWinBox.includes("box9")) ||
                      (blueWinBox.includes("box1") &&
                        blueWinBox.includes("box4") &&
                        blueWinBox.includes("box7")) ||
                      (blueWinBox.includes("box2") &&
                        blueWinBox.includes("box5") &&
                        blueWinBox.includes("box8")) ||
                      (blueWinBox.includes("box3") &&
                        blueWinBox.includes("box6") &&
                        blueWinBox.includes("box9")) ||
                      (blueWinBox.includes("box1") &&
                        blueWinBox.includes("box5") &&
                        blueWinBox.includes("box9")) ||
                      (blueWinBox.includes("box3") &&
                        blueWinBox.includes("box5") &&
                        blueWinBox.includes("box7"))
                    ) {
                      setCounter++;
                      bluePoint++;
                      isWinnerRed = false;

                      boxes.forEach(function (box) {
                        box.classList = "";
                        box.classList.add("box", "empty", "emptyCross");
                      });

                      if (IsBlue) {
                        leftWinSet.innerHTML = bluePoint;
                        isWinnerLeftSide = true;
                      } else {
                        rightWinSet.innerHTML = bluePoint;
                        isWinnerLeftSide = false;
                      }

                      if (gameSet == 3) {
                        if (redPoint == 2 || bluePoint == 2) {
                          showEnd();
                        }
                      } else if (gameSet == 5) {
                        if (redPoint == 3 || bluePoint == 3) {
                          showEnd();
                        }
                      } else if (gameSet == 7) {
                        if (redPoint == 4 || bluePoint == 4) {
                          showEnd();
                        }
                      } else {
                        if (setCounter <= gameSet) {
                          showSetNumberText.innerHTML = `${setCounter} / ${gameSet}`;
                          showSetNumber.style.display = "flex";
                          setTimeout(function () {
                            showSetNumber.classList.remove(
                              "animate__fadeInDown"
                            );
                            showSetNumber.classList.add("animate__fadeOutUp");
                            setTimeout(function () {
                              showSetNumber.style.display = "none";
                              showSetNumber.classList.remove(
                                "animate__fadeOutUp"
                              );
                              showSetNumber.classList.add(
                                "animate__fadeInDown"
                              );
                            }, 900);
                          }, 2000);
                        } else {
                          showEnd();
                        }
                      }
                      redWinBox = [];
                      blueWinBox = [];
                      gameData.forEach(function (item) {
                        item.color = "";
                        item.click = false;
                      });
                    } else {
                      let isAllClick = gameData.every(function (item) {
                        return item.click == true;
                      });
                      if (isAllClick) {
                        leftRound = false;
                        if (leftPlayer == "red") {
                          boxes.forEach(function (box) {
                            box.classList = "";
                            box.classList.add("box", "empty", "emptyCircle");
                          });
                        } else {
                          boxes.forEach(function (box) {
                            box.classList = "";
                            box.classList.add("box", "empty", "emptyCross");
                          });
                        }
                        redWinBox = [];
                        blueWinBox = [];
                        gameData.forEach(function (item) {
                          item.color = "";
                          item.click = false;
                        });
                      }
                    }
                    box.classList.add("clicked");
                  }
                });
              });
            }, 900);
          }, 2000);
        });
      }
    });
  }
}

getNameForTwoPlayerGame.style.display = "flex";
TPGnameButton.addEventListener("click", startGame);
