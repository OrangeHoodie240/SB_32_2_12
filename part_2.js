console.clear();



function getDeck(){
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    return new Promise((resolve, _) => {
            fetch(url)
            .then(resp => resp.json())
            .then(data => {
                resolve(data);
            }); 
        });
}

function getCard(deck){
    const url = 'https://deckofcardsapi.com/api/deck/' + deck.deck_id + '/draw/?count=1';
    return new Promise((resolve, _)=>{
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                resolve(data);
            });
    });
}

function eventHandler(img, outOfCards){
    const deck = getDeck(); 
    return (evt)=>{
            deck.then(getCard)
               .then(data =>{
                    if(data.remaining === 0){
                        outOfCards.style.display = 'block';
                        evt.target.remove();
                        return;
                    }
                    img.src = data.cards[0].image;
               });
    };
}


// part 2 step 1
getDeck().then(getCard).then(({cards}) => console.log('Part 2 Step 2\n',cards[0].value,'of',cards[0].suit));


// part 2 step 2
getDeck()
    .then(deck => {
        const cards = [];
        getCard(deck)
            .then(data => {
                cards.push(data.cards[0]);
                return Promise.resolve(data);
            })
            .then(getCard)
            .then(data => {
                cards.push(data.cards[0]);
                console.log('Part 2 Step 2: ');
                for(let i = 0; i < cards.length; i++){
                    console.log(cards[i].value, 'of', cards[i].suit);
                }
            });
    }); 

// part 2 step 3
const cardBtn = document.querySelector('#card-button');
const outOfCards = document.querySelector('#out-of-cards');
const img = document.querySelector('#img');
cardBtn.addEventListener('click', eventHandler(img, outOfCards));

   