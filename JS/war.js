function main() {
    renderGame()
    window.sessionStorage.setItem("playerDeck", [])
    window.sessionStorage.setItem("computerDeck", [])
    window.sessionStorage.setItem("playP", [])
    window.sessionStorage.setItem("playC", [])
    window.sessionStorage.setItem("discard", [])
    var decks = window.prompt("how many decks do you want in the game?", 1)
    var cards = genCards(decks)
    dealCards(cards)
    loop()
    houseChck()
}

function houseChck() {
    var el = document.getElementById("house")
    if(el.checked == true) {
        window.sessionStorage.setItem("house", true)
        lockrules()
    }
}

function lockrules() {
    document.getElementById("house").checked = true
    setTimeout(() => {
        lockrules()
    }, 1);
}

function renderGame() {
    //container
    var con = document.getElementById("con")
    //hold
    var holder = document.createElement("div")
    holder.style.display = "flex"
    holder.style.flexDirection = "column"
    //computer cards
    var oppCards = document.createElement("div")
    oppCards.style.width = "70vw"
    oppCards.style.height = "33vh"
    oppCards.style.float = "top"
    var cardsC = document.createElement("div")
    cardsC.style.width = "15%"
    cardsC.style.height = "80%"
    cardsC.style.marginLeft = "45%"
    cardsC.style.marginTop = "2%"
    var cardsImg = document.createElement("img")
    cardsImg.classList.add("cback")
    cardsImg.src = "Media/Images/cardback.jfif"
    cardsC.appendChild(cardsImg)
    oppCards.appendChild(cardsC)
    //playarea
    var playArea = document.createElement("div")
    playArea.style.width = "70vw"
    playArea.style.height = "34vh"
    playArea.id = "play"
    playArea.style.display = "flex"
    var play = document.createElement("div") 
    play.id = "player"
    play.style.width = "15%"
    play.style.marginLeft = "34.5%"
    play.style.marginTop = "3.5%"
    play.style.height = "80%"
    playArea.appendChild(play)
    var play2 = document.createElement("div") 
    play2.id = "computer"
    play2.style.width = "15%"
    play2.style.marginLeft = "6%"
    play2.style.marginTop = "3.5%"
    play2.style.height = "80%"
    playArea.appendChild(play2)
    //player cards
    var cards = document.createElement("div")
    cards.style.width = "70vw"
    cards.style.height = "33vh"
    cards.style.float = "top"
    var cardsP = document.createElement("div")
    cardsP.style.width = "15%"
    cardsP.style.height = "80%"
    cardsP.style.marginLeft = "45%"
    var cardImg = document.createElement("img")
    cardImg.classList.add("cback")
    cardImg.src = "Media/Images/cardback.jfif"
    cardImg.setAttribute("onclick", "play()")
    cardImg.style.cursor = "pointer"
    cardsP.style.marginTop = "2%"
    cardsP.appendChild(cardImg)
    cards.appendChild(cardsP)
    //cardcount1
    var cardCount1 = document.createElement("div")
    cardCount1.style.width = "10vw"
    cardCount1.style.height = "100vh"
    cardCount1.style.float = "left"
    cardCount1.style.textAlign = "center"
    var c1H = document.createElement("div")
    c1H.style.marginTop = "48vh"
    var pText = document.createElement("h2")
    pText.innerHTML = "Player"
    var c1Num = document.createElement("h3")
    c1Num.id = "plaNum"
    c1Num.innerHTML = "Count: 0"
    c1H.appendChild(pText)
    c1H.appendChild(c1Num)
    cardCount1.appendChild(c1H)
    //cardcount2
    var cardCount2 = document.createElement("div")
    cardCount2.style.width = "10vw"
    cardCount2.style.height = "100vh"
    cardCount2.style.float = "right"
    cardCount2.style.textAlign = "center"
    var c2H = document.createElement("div")
    c2H.style.marginTop = "48vh"
    var cText = document.createElement("h2")
    cText.innerHTML = "Computer"
    var c2Num = document.createElement("h3")
    c2Num.id = "comNum"
    c2Num.innerHTML = "Count: 0"
    c2H.appendChild(cText)
    c2H.appendChild(c2Num)
    cardCount2.appendChild(c2H)
    holder.appendChild(oppCards)
    holder.appendChild(playArea)
    holder.appendChild(cards)
    con.appendChild(cardCount1)
    con.appendChild(holder)
    con.appendChild(cardCount2)
}

function del() {
    var player = document.getElementById("player")
    var computer = document.getElementById("computer")
    for(var i = 0; i < player.children.length; i++) {
        player.children[0].remove()
    }
    for(var i = 0; i < computer.children.length; i++) {
        computer.children[0].remove()  
    }
} 

function genCards(decks) {
    /*
    a = ace
    j = jack
    q = queen
    k = king
    H = hearts
    S = spades
    C = clubs
    D = diamonds
    */
    const CARDARR = ["aH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "0H", "jH", "qH", "kH", "aS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "0S", "jS", "qS", "kS", "aC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "0C", "jC", "qC", "kC", "aD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "0D", "jD", "qD", "kD"]
    var cards = []
    for(var i = 0; i < decks; i++) {
        for(var j = 0; j < 52; j++) {
            cards.push(CARDARR[j])
            cards = shuffle(cards)
        }
    }
    return cards
}

function dealCards(cards) {
    var pDeck = []
    var cDeck = []
    var last = 1
    for(var i = 0; i < cards.length; i++) {
        if(last == 1) {
            pDeck.push(cards[i])
            last = 0
        } else {
            cDeck.push(cards[i])
            last = 1
        }
    }
    window.sessionStorage.setItem("playerDeck", JSON.stringify(pDeck))
    window.sessionStorage.setItem("computerDeck", JSON.stringify(cDeck))
}

function loop() {
    displayCounts()
    winChck()
    houseChck()
    setTimeout(() => {
        loop()
    }, 10);
}

function displayCounts() {
    var pDeck = JSON.parse(window.sessionStorage.getItem("playerDeck"))
    var cDeck = JSON.parse(window.sessionStorage.getItem("computerDeck"))
    var pCount = 0
    var cCount = 0
    for(var i = 0; i < pDeck.length; i++) {
        pCount++
    }
    for(var i = 0; i < cDeck.length; i++) {
        cCount++
    }
    document.getElementById("plaNum").innerHTML = `Count: ${pCount}`
    document.getElementById("comNum").innerHTML = `Count: ${cCount}`
}

function winChck() {
    var pDeck = window.sessionStorage.getItem("playerDeck")
    var cDeck = window.sessionStorage.getItem("computerDeck")
    if(pDeck -= "" || cDeck == "") {
        if(pDeck == "") {
            window.alert("player Wins")
        } else if(cDeck == "") {
            window.alert("computer Wins")
        }
    } 
}

function play() {
    var player = document.getElementById("player")
    var computer = document.getElementById("computer")
    if(player.children.length != 0) {
        del()
    } else if(computer.children.length != 0) {
        del()
    }
    var pDeck = JSON.parse(window.sessionStorage.getItem("playerDeck"))
    var cDeck = JSON.parse(window.sessionStorage.getItem("computerDeck"))
    if(pDeck.length == 0) {
        recycle()
    } else if(cDeck.length == 0) {
        recycle()
    }
    try {
        var playP = JSON.parse(window.sessionStorage.getItem("playP"))
        var playC = JSON.parse(window.sessionStorage.getItem("playC"))
    } catch (error) {
        
    }
    if(playP == undefined) {
        playP = []
    }
    if(playC == undefined) {
        playC = []
    }

    var card1 = pDeck[0]
    var card2 = cDeck[0]
    player.setAttribute("card", card1)
    computer.setAttribute("card", card2)
    playP.push(pDeck[0])
    playC.push(cDeck[0])
    pDeck.shift()
    cDeck.shift()
    window.sessionStorage.setItem("playC", JSON.stringify(playC))
    window.sessionStorage.setItem("playP", JSON.stringify(playP))
    window.sessionStorage.setItem("playerDeck", JSON.stringify(pDeck))
    window.sessionStorage.setItem("computerDeck", JSON.stringify(cDeck))
    var card1El = makeCard(card1)
    var card2El = makeCard(card2)
    card1El.classList.add("cards")
    card2El.classList.add("cards")
    spawnCard(card1El, card2El)
    var winner = check()
    take(winner)
}

function makeCard(card) {
    console.log(card)
    var src = document.getElementById(card).src
    var el = document.createElement("img")
    el.src = src
    return el
}

function spawnCard(c1, c2) {
    var player = document.getElementById("player")
    var computer = document.getElementById("computer")
    player.appendChild(c1)
    computer.appendChild(c2)
    check()
}

function check() {
    var house = window.sessionStorage.getItem("house")
    var player = document.getElementById("player")
    var computer = document.getElementById("computer")
    var cardP = player.getAttribute("card")
    var cardC = computer.getAttribute("card")   
    var teirP = cardP.charAt(0)
    var teirC = cardC.charAt(0)
    console.log(cardP, cardC)
    var valP
    var valC
    var winner
    if(house == undefined) {
        house = false
    }
    switch(teirP) {
        case "a":
            valP = 100
        break;
        case "k":
            valP = 30
        break;
        case "q":
            valP = 20
        break;
        case "j":
            valP = 15
        break;
        case "0":
            valP = 10
        break;
        case "9":
            valP = 9
        break;
        case "8":
            valP = 8
        break;
        case "7":
            valP = 7
        break;
        case "6":
            valP = 6
        break;
        case "5":
            valP = 5
        break;
        case "4":
            valP = 4
        break;
        case "3":
            valP = 3
        break;
        case "2":
            valP = 2
        break;
    }    
    switch(teirC) {
        case "a":
            valC = 100
        break;
        case "k":
            valC = 30
        break;
        case "q":
            valC = 20
        break;
        case "j":
            valC = 15
        break;
        case "0":
            valC = 10
        break;
        case "9":
            valC = 9
        break;
        case "8":
            valC = 8
        break;
        case "7":
            valC = 7
        break;
        case "6":
            valC = 6
        break;
        case "5":
            valC = 5
        break;
        case "4":
            valC = 4
        break;
        case "3":
            valC = 3
        break;
        case "2":
            valC = 2
        break;
    }
    if(valC == valP) {
        winner = "war"
    } else if(valP > valC) {
        if(house == true) {
            if(valP == 2 && valC == 100) {
                winner = "player"
            } else if(valC == 2 && valP == 100) {
                winner = "computer"
            } else if(valP == 3 && valC == 30) {
                winner = "player"
            } else if(valC == 3 && valP == 30) {
                winner = "computer"
            } else if(valP == 4 && valC == 20) {
                winner = "player"
            } else if(valC == 4 && valP == 20) {
                winner = "computer"
            } else if(valP == 5 && valC == 15) {
                winner = "player"
            } else if(valC == 5 && valP == 15) {
                winner = "computer"
            } else if(valP < 11 && valP > valC) {
                winner = "player"
            } else if(valC < 11 && valC > valP) {
                winner = "computer"
            }
        } else {
            if(valP > valC) {
                winner = "player"
            } else if(valC > valP) {
                winner = "computer"
            } else if(valP == valC) {
                winner = "war"
            }
        }
    } else if(valC > valP) {
        if(house == true) {
            if(valP == 2 && valC == 100) {
                winner = "player"
            } else if(valC == 2 && valP == 100) {
                winner = "computer"
            } else if(valP == 3 && valC == 30) {
                winner = "player"
            } else if(valC == 3 && valP == 30) {
                winner = "computer"
            } else if(valP == 4 && valC == 20) {
                winner = "player"
            } else if(valC == 4 && valP == 20) {
                winner = "computer"
            } else if(valP == 5 && valC == 15) {
                winner = "player"
            } else if(valC == 5 && valP == 15) {
                winner = "computer"
            } else if(valP < 11 && valP > valC) {
                winner = "player"
            } else if(valC < 11 && valC > valP) {
                winner = "computer"
            }
        } else {
            if(valP > valC) {
                winner = "player"
            } else if(valC > valP) {
                winner = "computer"
            } else if(valP == valC) {
                winner = "war"
            }
        }
    } else if(valC == valP) {
        winner = "war"
    }
    return winner
}

function take(winner) {
    var playC = JSON.parse(window.sessionStorage.getItem("playC"))
    var playP = JSON.parse(window.sessionStorage.getItem("playP"))
    var pDeck = JSON.parse(window.sessionStorage.getItem("playerDeck"))
    var cDeck = JSON.parse(window.sessionStorage.getItem("computerDeck"))
    if(winner == "war") {
        war()
    } else {
        if(winner == "player") {
            for(var i = 0; i < playC.length; i++) {
                pDeck.push(playC[i])
            }
            for(var i = 0; i < playP.length; i++) {
                pDeck.push(playP[i])
            }
        } else if(winner == "computer") {
            for(var i = 0; i < playP.length; i++) {
                cDeck.push(playP[i])
            }
            for(var i = 0; i < playC.length; i++) {
                cDeck.push(playC[i])
            }
        }
    } 
    playC = []
    playP = []
    window.sessionStorage.setItem("playP", JSON.stringify(playP))
    window.sessionStorage.setItem("playC", JSON.stringify(playC))
    window.sessionStorage.setItem("playerDeck", JSON.stringify(pDeck))
    window.sessionStorage.setItem("computerDeck", JSON.stringify(cDeck))
}

function war() {
    console.log("war")
    del()
    var playP = window.sessionStorage.getItem("playP")
    var playC = window.sessionStorage.getItem("playC")
    if(playP == "") {
        playP = []
    } else if(playC == "") {
        playC = []
    } else {
        playP = JSON.parse(playP)
        playC = JSON.parse(playC)
    }
    var pDeck = JSON.parse(window.sessionStorage.getItem("playerDeck"))
    var cDeck = JSON.parse(window.sessionStorage.getItem("computerDeck"))
    var discard = window.sessionStorage.getItem("discard")
    if(discard == "") {
        discard = []
    } else {
        discard = JSON.parse(discard)
    }
    var p1 = pDeck[0]
    var p2 = pDeck[1]
    var p3 = pDeck[2]
    var c1 = cDeck[0]
    var c2 = cDeck[1]
    var c3 = cDeck[2]
    discard.push(p1)
    discard.push(p2)
    discard.push(p3)
    discard.push(c1)
    discard.push(c2)
    discard.push(c3)
    for(var i = 0; i < playP.length; i++) {
        discard.push(playP[i])
    }
    for(var i = 0; i < playC.length; i++) {
        discard.push(playC[i])
    }
    playP = []
    playC = []
    window.sessionStorage.setItem("playP", [])
    window.sessionStorage.setItem("playC", [])
    pDeck.shift()
    pDeck.shift()
    pDeck.shift()
    cDeck.shift()
    cDeck.shift()
    cDeck.shift()
    var pCard = makeCard(pDeck[0])
    var cCard = makeCard(cDeck[0])
    pCard.setAttribute("card", pDeck[0])
    cCard.setAttribute("card", cDeck[0])
    pDeck.shift()
    cDeck.shift()
    pCard.classList.add("cards")
    cCard.classList.add("cards")
    console.log(pCard, cCard)
    spawnCard(pCard, cCard)
    var winner = check()
    console.log(winner)
    if(winner == "player") {
        for(var i = 0; i < discard.length; i++) {
            pDeck.push(discard[i])
        }
    } else if(winner == "computer") {
        for(var i = 0; i < discard.length; i++) {
            cDeck.push(discard[i])
        }
    }
    window.sessionStorage.setItem("playerDeck", JSON.stringify(pDeck))
    window.sessionStorage.setItem("discard", JSON.stringify(discard))
    window.sessionStorage.setItem("computerDeck", JSON.stringify(cDeck))
    if(winner == "war") {
        war()
    } else {
        discard = []
        window.sessionStorage.setItem("discard", [])
    }
}

const shuffle = (array) => { 
    return array.sort(() => Math.random() - 0.5); 
}; 

function del() {
    var player = document.getElementById("player")
    var computer = document.getElementById("computer")
    player.children[0].remove()
    computer.children[0].remove()
}