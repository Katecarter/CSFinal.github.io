const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      const button = document.createElement('button');
      button.textContent = 'Add to cart';
      button.onclick = function() {
        localStorage.setItem("movie", movie.title);
        const addItemToShoppingCart = document.getElementById('shoppingCart');
        const div = document.createElement('div');
        div.textContent = movie.title;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove ' + movie.title + ' from cart';
        addItemToShoppingCart.appendChild(div);
        addItemToShoppingCart.appendChild(removeButton);
        removeButton.onclick = function() {
          addItemToShoppingCart.removeChild(div);
          addItemToShoppingCart.removeChild(removeButton);
        }
      }

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(button);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();

function toggleShoppingCart(){
  const toggleOpen = document.getElementById('shoppingCart');
  if(toggleOpen.style.height === '0px'){
    toggleOpen.style.transition = "height 0.2s linear 0s"
    toggleOpen.style.height = '200px';
  }else{
    toggleOpen.style.height = '0px';
  }
}

function addToShoppingCart(){

}
