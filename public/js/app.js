const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')


msgTwo.textContent = ''

weatherForm.addEventListener('submit', (e) =>{
    msgOne.textContent = 'Loading ...'
    e.preventDefault()
    const locations = search.value
    fetch('http://localhost:3000/weather?adress='+locations).then((response)=>{
        response.json().then((data)=>{
            msgOne.textContent =''
            if(data.error){
                msgOne.textContent = data.error
            }else{
                msgOne.textContent ='Location : '+ data[0].adress 
                msgTwo.textContent = data[0].forecastdata
            }
        })
    })
})

