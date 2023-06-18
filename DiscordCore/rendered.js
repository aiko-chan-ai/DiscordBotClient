const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}


const minimizeBtn = document.getElementById('mini');
minimizeBtn.addEventListener('click', () => {
  console.log('hello')
})