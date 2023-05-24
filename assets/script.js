const inpt_user = document.getElementById('usuario');
const inpt_reserva  = document.getElementById('reserva');
const inpt_hotel  = document.getElementById('hotel');
const inpt_quarto  = document.getElementById('quarto');
const post = document.getElementById('postlist');
const reservar = document.getElementById('reserve');
const formulario = document.getElementById('formulario')

let output = ``

const carregarElemento = posts =>{
  const usuarios = posts;

  usuarios.forEach(usuario => {
    output += `
    <div class="card mt-5" id="cardReserva">
      <div class="card-body">
        <h5 class="card-title">Reserva Confirmada</h5>
        <p class="card-text" id="cardUsuario"> ${usuario.nome} </p>
        <p class="card-text" id="cardDataReserva">${usuario.reserva}</p>
        <p class="card-text" id="cardHotel">${usuario.hotel}</p>
        <p class="card-text" id="cardQuarto">${usuario.quarto}</p>
      </div>
    </div>
      `
post.innerHTML = output;
  });
}



fetch('http://localhost:3000/usuarios')
.then(response => response.json()) 
.then(data => {
  carregarElemento(data)
  
})
.catch(error => {
  console.error('Ocorreu um erro ao buscar os dados:', error);
});


// Criando reservas

formulario.addEventListener('submit', e => {
  e.preventDefault()
  
  fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
    .then(response => response.json())
    .then(data => {
      const dataArr = [];
      dataArr.push(data);
      carregarElemento(dataArr)
    })
    .catch(error => console.log(error)); 
});