import { useState } from 'react';
import './App.css'

function App() {
  const [response, setResponse] = useState(null)
  const [inputText, setInputText] = useState('')

  const handleSubmit = async(e) => {
     e.preventDefault()

     let res = await fetch('http://localhost:4000/chatbot', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({prompt : inputText })
     })

     let finalResponse = await res.json()
     setResponse(finalResponse)

  }

  const handleChange =(e) => {
    setInputText(e.target.value)
  }

  return (
    <div className="App">
    <h3 className='text-center' style={{fontSize : '48px' , marginTop : '50px'}} >Custom ChatGPT</h3>
  <form style={{marginTop : '80px'}}>
  <textarea type="text" name="name" class="question" id="nme" required autocomplete="off" value={inputText} onChange = { handleChange } />
  <label for="nme" style={{fontSize : '28px'}}><span>What's your question?</span></label>
  <div style={{display : 'flex' , width : '80%' , justifyContent: 'space-between'}}>
  <div></div>
  <button onClick={handleSubmit} className="button">Submit</button>
  </div>
</form>

    {response && <div>
      <div style={{marginTop : 100}}>
       <h3 style={{fontSize : '30px'}} > Response</h3>
       <p style={{fontSize : '24px', fontWeight: 300}}>{response.message && response.message.text }</p>
       </div>
      </div>
       }
    </div>
  );
}

export default App;
