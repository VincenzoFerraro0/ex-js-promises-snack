//! 🏆 Snack 1
//? Ottieni il titolo di un post con una Promise.
//* Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}
// 🎯 Bonus: Ottieni l'intero post con l'autore
// Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.

function getPostTitle(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(response => response.json())
      .then(post => resolve(post.title))  // solo titolo
      .catch(reject);
  });
}

getPostTitle(1)
  .then(title => console.log("Titolo:", title))
  .catch(error => console.error("Errore:", error));

function getPost(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(response => response.json())
      .then(post => {
        fetch(`https://dummyjson.com/users/${post.userId}`)
          .then(response => response.json())
          .then(user => resolve({ ...post, user }))
          .catch(reject);
      })
      .catch(reject);
  });
}

getPost(1)
  .then(postCompleto => console.log("Post Completo: ", postCompleto))
  .catch(error => console.error("Errore:", error))

//! 🏆 Snack 2
//? Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.
// 🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
// Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".

function lanciaDado() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('sto lanciando il dado')
      if (Math.random() < 0.2) {
        reject("Il dado si è incastrato!");
      } else {
        const dado = Math.floor(Math.random() * 6) + 1
        resolve(dado);
      }
    }, 3000)
  })
}

lanciaDado()
  .then(risultato => console.log(risultato))
  .catch(error => console.error(error))


function creaLanciaDado() {
  let ultimoRisultato = null;
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if (Math.random() < 0.2) {
          reject("Il dado si è incastrato!");
        } else {
          const dado = Math.floor(Math.random() * 6) + 1;
          if (dado === ultimoRisultato) {
            console.log("Incredibile!");
          }
          ultimoRisultato = dado;
          resolve(dado);
        }
      }, 3000);
    });
  };
}


const lancia = creaLanciaDado(); // Salviamo la funzione restituita da creaLanciaDado()

// Poi chiamiamo lancia() quando vogliamo fare il lancio
lancia()
  .then(risultato => console.log(risultato))
  .catch(error => console.error(error));


// Poi chiamiamo lancia() quando vogliamo fare il lancio
lancia()
  .then(risultato => console.log(risultato))
  .catch(error => console.error(error));
