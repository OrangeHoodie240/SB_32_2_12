console.clear();

var baseUrl = 'http://numbersapi.com/';

 function getNumbersFact(...numbers){
     // returns an object where each number is a key and its value a fact.     

     let singleNum = false; 
     if(numbers.length === 1){
             singleNum = true;
     }

     numbers = numbers.reduce((a,b)=>{
        return a + ',' + b;  
     });
     console.log(baseUrl + numbers + '?json');
     return new Promise((resolve, _) =>{
        fetch(baseUrl + numbers + '?json', {'headers': {'Accept': 'application/json'}})
            .then(resp => {
                return resp.json(); 
            })
            .then(data => {
                if(singleNum){
                        resolve({[data.number]: data.text});
                }
                resolve(data)
            });
        });
 }

 const part_1 = document.querySelector('#part-1');
 const part_2 = document.querySelector('#part-2');
 const part_3 = document.querySelector('#part-3');

getNumbersFact(27).then(trivia => {
    part_1.innerText = trivia[27];
});

getNumbersFact(32, 42, 52).then(trivia => {
    part_2.innerHTML += trivia[32] + '<br />';
    part_2.innerHTML += trivia[42] + '<br />';
    part_2.innerHTML += trivia[52];

});

getNumbersFact(27).then(trivia => {
    part_3.innerHTML = trivia[27] + '<br />';
});
getNumbersFact(27).then(trivia => {
    part_3.innerHTML += trivia[27] + '<br />';
});
getNumbersFact(27).then(trivia => {
    part_3.innerHTML += trivia[27] + '<br />';
});
getNumbersFact(27).then(trivia => {
    part_3.innerHTML += trivia[27];
});


