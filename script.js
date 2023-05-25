const inpt_user = document.getElementById('usuario');
const inpt_reserva  = document.getElementById('reserva');
const inpt_hotel  = document.getElementById('hotel');
const inpt_quarto  = document.getElementById('quarto');
const post = document.getElementById('postlist');
const reservar = document.getElementById('reserve');
const formulario = document.getElementById('formulario');
const deletar = document.getElementById('btn-deletar');
const atualizar = document.getElementById('btn-atualizar');


let output = ``

const carregarElemento = posts =>{
  const usuarios = posts;

  usuarios.forEach(usuario => {
    output += `
    <div class="card mt-5" id="cardReserva">
      <div class="card-body" data-id=${usuario.id}>
        <h5 class="card-title">Reserva Confirmada</h5>
        <p class="card-text" id="cardUsuario"> ${usuario.nome} </p>
        <p class="card-text" id="cardDataReserva">${usuario.reserva}</p>
        <p class="card-text" id="cardHotel">${usuario.hotel}</p>
        <p class="card-text" id="cardQuarto">${usuario.quarto}</p>
        <button type="button" id="btn-atualizar" class="btn btn-success">Atualizar</button>
        <button type="button" id="btn-deletar" class="btn btn-danger">Excluir</button>
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

post.addEventListener('click', e => {
  console.log(e.target.id)
  e.preventDefault();
  var del = e.target.id == 'btn-deletar'
  var att = e.target.id == 'btn-atualizar'

  var id = e.target.parentElement.dataset.id


  if(del){
    fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(() => location.reload())
  }

  if (att) {
    const parent = e.target.parentElement;
    let nome = parent.querySelector('#cardUsuario').textContent;
    let hotel = parent.querySelector('#cardHotel').textContent;
    let quarto = parent.querySelector('#cardQuarto').textContent;
    let reserva = parent.querySelector('#cardDataReserva').textContent;

    inpt_user.value = nome;
    inpt_hotel.value = hotel;
    inpt_reserva.value = reserva;
    inpt_quarto.value = quarto;

  }

  reservar.addEventListener('click', e => {
    e.preventDefault()
    fetch(`http://localhost:3000/usuarios/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: inpt_user.value,
        reserva: inpt_reserva.value,
        hotel: inpt_hotel.value,
        quarto: inpt_quarto.value
      })
    }).then(res => res.json())
    .then(() => location.reload()).catch(error => console.log(error))
  })

})


// Criando reservas

formulario.addEventListener('submit', e => {
  e.preventDefault()

  console.log(inpt_user.value)
  
  fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: inpt_user.value,
      reserva: inpt_reserva.value,
      hotel: inpt_hotel.value,
      quarto: inpt_quarto.value
    })
  })
    .then(response => response.json())
    .then(data => {
      const dataArr = [];
      dataArr.push(data);
      carregarElemento(dataArr)
    })
    .catch(error => console.log(error)); 
});