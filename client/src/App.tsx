import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import 'animate.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export interface Language {
  _id:            string;
  id:             string;
  title:          string;
  description:    string;
  url:            string;
  language_short: string;
  code:           string;
}

function Home() {
  const [willLeave, setLeave] = useState(false);
  const navigation = useNavigate();

  return (
    <div className="h-full flex flex-col gap-1 items-center justify-center overflow-hidden">
      <Icon icon="ant-design:code-outlined" className={`text-neutral-50 w-20 h-20 mb-4 animate__animated ${!willLeave ? "animate__fadeInUp animate__delay-1s" : "animate__fadeOutDown"}`} />
      <h1 className={`uppercase text-neutral-50 font-semibold text-5xl tracking-[0.18em] ml-3 animate__animated ${!willLeave ? "animate__fadeInUp animate__delay-1s" : "animate__fadeOutDown"}`}>hello world</h1>
      <h1 className={`uppercase text-neutral-50 font-medium text-xl tracking-[0.18em] animate__animated ${!willLeave ? "animate__fadeInUp animate__delay-1s" : "animate__fadeOutDown"}`}>in 1080 languages</h1>
      <div className="flex gap-4 mt-8">
        <button onClick={() => { setLeave(true); setTimeout(() => {
          navigation('/browse');
        }, 1000); }} className={`w-80 py-4 pt-[1.1rem] uppercase bg-white border-white border-[2.4px] text-neutral-700 flex justify-center font-semibold text-lg tracking-[0.18em] animate__animated ${!willLeave ? "animate__fadeInLeft animate__delay-1s" : "animate__fadeOutLeft"}`}>browse</button>
        <a href="/" className={`w-80 py-4 pt-[1.1rem] uppercase border-white border-[2.4px] text-white flex justify-center font-semibold text-lg tracking-[0.18em] animate__animated ${!willLeave ? "animate__fadeInRight animate__delay-1s" : "animate__fadeOutRight"}`}>language list</a>
      </div>
      <div className="opacity-5 w-[90vh] h-[90vh] mb-4 z-[-1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Icon icon="ant-design:code-outlined" className={`text-neutral-50 animate__animated w-full h-full ${!willLeave ? "animate__fadeInUp animate__delay-0.5s" : "animate__fadeOutDown"}`} />
      </div>
    </div>
  )
}

function Browse() {
  const [data, setData] = useState<Language[]>([]);
  useEffect(() => {
    fetch("http://localhost:3001/languages")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      });
  }, [])

  return <div className="h-full w-full overflow-y-auto overflow-x-hidden flex flex-col items-center gap-8 py-32">
    {data.length > 0 && data.slice(0, 20).map((e) => <div className="w-3/4 border-2 border-white">
      <div className="w-full bg-white py-2 px-3 font-medium tracking-widest text-neutral-700 text-lg">
        {e.title}
        {e.description.length > 0 && <p className="font-normal text-sm tracking-wide mt-2 mb-1">{e.description}</p>}
      </div>
      <div className="text-white p-4">
      <SyntaxHighlighter language={e.title.toLowerCase()} style={anOldHope} customStyle={{
        backgroundColor: "rgb(64, 64, 64)",
      }}>
            {e.code}
        </SyntaxHighlighter>
      </div>
    </div>)}
  </div>
}

function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
    </Routes>
  </Router>
}

export default App
