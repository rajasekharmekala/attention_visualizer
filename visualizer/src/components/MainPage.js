import React from 'react'
import _ from 'lodash'
import getHText from './jpallete'
const MainPage = (props) => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [score1, setScore1] = React.useState("");
  const [score2, setScore2] = React.useState("");
  const [text, setText] = React.useState("");
  const [words, setWords] = React.useState(["None"]);
  const [word1Idx, setWord1Idx] = React.useState([]);
  const [word2Idx, setWord2Idx] = React.useState([]);
  const [model1, setModel1] = React.useState("gpt2");
  const [model2, setModel2] = React.useState("gpt2");

  const onTextChange = (e) => {
    let text = e.target.value
    setText(text)
  }

  const updateData = () => {
    if (model1.length != 0 && model2.length != 0) {
      console.log("clicked")
      let url = `http://127.0.0.1:5000/attn/get_data?text=${text}&model1=${model1}&model2=${model2}`

      setLoading(true)
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setError(data.error)
          setWords(data.words)
          setScore1(data.score1)
          setScore2(data.score2)
          setLoading(false)
        }).catch(err=> console.log(err))
    }

  }
  return (
    <React.Fragment>
      <section>
        <div>
          <p>Enter the Text: </p>
          <textarea style={{ "width": "75%" }} onChange={onTextChange} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <p>Model: 1</p>
              <select onChange={(e)=> {setModel1(e.target.value)}}>
                <option value="gpt2">GPT2</option>
                <option value="Vivek/GPT2_GSM8k">Vivek/GPT2_GSM8k</option>
              </select>
            </div>

            <div>
              <p>Words:</p>
              <select onChange={(e)=> {setWord1Idx(e.target.value)}}>
                {_.map(words, word=> <option value={word} >{word}</option> )}
              </select>
            </div>

          </div>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <p>Model: 2</p>
              <select onChange={(e)=> {setModel2(e.target.value)}}>
                <option value="gpt2">GPT2</option>
                <option value="Vivek/GPT2_GSM8k">Vivek/GPT2_GSM8k</option>
              </select>
            </div>

            <div>
              <p>Words:</p>
              <select onChange={(e)=> {setWord2Idx(e.target.value)}}>
                {_.map(words, word=> <option value={word} >{word}</option> )}
              </select>
            </div>

          </div>
        </div>
        <button style={{  backgroundColor: 'black',
          color: 'white',
          fontSize: '20px',
          padding: '10px 60px',
          borderRadius: '5px',
          margin: '10px',
          cursor: 'pointer'}}
        onClick={updateData}>Submit</button>
      </section>
      <section>
        <div className='w-screen h-screen grid grid-rows-2 text-white text-4xl md:grid-cols-2'>
          <div className=' w-full h-full bg-blue-800 md:h-screen'>
            <p ref={s=> s && (s.innerHTML = getHText(words, score1[word1Idx] ))}></p>
          </div>

          {/* page 2 */}
          <div className='w-full h-full bg-black md:h-screen'>
            <p ref={s=> s && (s.innerHTML = getHText(words, score2[word2Idx] ))}></p>
          </div>
        </div>
      </section>
    </React.Fragment >
  )
}

export default MainPage