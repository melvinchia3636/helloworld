/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import 'animate.css';
import {
  BrowserRouter as Router, Routes, Route, useNavigate, useLocation,
  Link,
} from 'react-router-dom';

export interface ILanguage {
  _id: string;
  id: string;
  title: string;
  description: string;
  url: string;
  language_short: string;
  code: string;
}

function Home() {
  const [willLeave, setLeave] = useState(false);
  const navigation = useNavigate();

  return (
    <div className="h-full flex flex-col gap-1 items-center justify-center overflow-hidden">
      <Icon icon="ant-design:code-outlined" className={`text-yellow-400 w-20 h-20 mb-4 animate__animated ${!willLeave ? 'animate__fadeInUp animate__delay-1s' : 'animate__fadeOutDown'}`} />
      <h1 className={`uppercase text-yellow-400 text-center font-semibold text-4xl tracking-[0.18em] ml-3 animate__animated ${!willLeave ? 'animate__fadeInUp animate__delay-1s' : 'animate__fadeOutDown'}`}>hello world</h1>
      <h1 className={`uppercase text-yellow-400 font-medium text-lg tracking-[0.18em] animate__animated ${!willLeave ? 'animate__fadeInUp animate__delay-1s' : 'animate__fadeOutDown'}`}>in 1080 languages</h1>
      <div className="flex flex-col gap-4 mt-8">
        <button
          type="button"
          onClick={() => {
            setLeave(true); setTimeout(() => {
              navigation('/browse');
            }, 1000);
          }}
          className={`w-80 py-4 pt-[1.1rem] uppercase bg-yellow-400 border-yellow-400 border-[2.4px] text-neutral-700 flex justify-center font-semibold tracking-[0.18em] animate__animated ${!willLeave ? 'animate__fadeInLeft animate__delay-1s' : 'animate__fadeOutLeft'}`}
        >
          browse
        </button>
        <button
          type="button"
          onClick={() => {
            setLeave(true); setTimeout(() => {
              navigation('/languages');
            }, 1000);
          }}
          className={`w-80 py-4 pt-[1.1rem] uppercase border-yellow-400 border-[2.4px] text-yellow-400 flex justify-center font-semibold tracking-[0.18em] animate__animated ${!willLeave ? 'animate__fadeInRight animate__delay-1s' : 'animate__fadeOutRight'}`}
        >
          language list

        </button>
      </div>
      <div className="opacity-5 w-[90vw] h-[90vw] mb-4 z-[-1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Icon icon="ant-design:code-outlined" className={`text-yellow-400 animate__animated w-full h-full ${!willLeave ? 'animate__fadeInUp animate__delay-0.5s' : 'animate__fadeOutDown'}`} />
      </div>
    </div>
  );
}

function FAB({ callback }: { callback: () => any }) {
  return (
    <button type="button" onClick={callback} className="fixed bottom-0 right-0 p-2 border-2 border-yellow-400 m-8">
      <Icon icon="uil:angle-up" className="w-8 h-8 text-yellow-400" />
    </button>
  );
}

function Language({ e }: {e: ILanguage}) {
  return (
    <div id={`lang-${e.id}`} className="my-8 selection:bg-neutral-900 selection:text-yellow-400 animate__animated flex flex-col animate__fadeInUp">
      <div className="inline-flex flex-row items-end mt-1">
        <span className="min-w-[8rem] inline-flex justify-center text-black-darker pl-4 pr-4 text-base font-medium bg-yellow-400 pt-0.5" style={{ letterSpacing: '1px', transform: 'translateY(1px)', clipPath: 'polygon(calc(100% - 8px) 0px, 100% 8px, 100% 100%, 0px 100%, 0px 0px)' }}>{e.title}</span>
        <span className="h-[4px] w-24 bg-yellow-400" style={{ transform: 'translateY(1px)', clipPath: 'polygon(calc(100% - 4px) 0px, 100% 4px, 100% 100%, 0px 100%, 0px 0px)' }} />
      </div>
      <div className="border-2 relative border-yellow-400 flex flex-col">
        {e.description.length > 0 && (
        <div className="w-full bg-yellow-400 py-2 px-3 font-medium tracking-widest text-neutral-900 text-xl">
          <p className="font-normal tracking-wide my-2 text-base">{e.description}</p>
        </div>
        )}
        <div className="text-yellow-400 overflow-x-auto p-4 selection:text-neutral-900 selection:bg-yellow-400">
          <pre>
            <code>
              {e.code}
            </code>
          </pre>
        </div>
        <button type="button" className="absolute bottom-0 right-0 text-yellow-400 m-4">
          <Icon icon="uil:copy" className="w-6 h-6" />
        </button>
      </div>
      <i className="absolute right-0 bottom-[-3px] h-[3px] w-[35%] rounded-bl-md bg-yellow-400" />
    </div>
  );
}

function Browse() {
  const [data, setData] = useState<ILanguage[]>([]);
  const [query, setQuery] = useState('');
  const [alphaFilter, setAlphaFilter] = useState('all');
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:3001/languages')
      .then((response) => response.json())
      .then((d) => {
        setData(d.sort((a: ILanguage, b: ILanguage) => a._id > b._id));
      });
  }, []);

  useEffect(() => {
    if (data.length && location.hash) {
      document.querySelector(location.hash)?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'start',
      });
    }
  }, [data]);

  return (
    <div className="flex scroll justify-center w-full h-full overflow-y-auto overflow-x-hidden">
      <div className="h-full w-3/4 items-center pt-32">
        <div className="w-full border-2 border-yellow-400 animate__animated animate__fadeInUp flex items-center p-4">
          <Icon icon="uil:search" className="w-8 h-8 text-yellow-400" />
          <input className="flex-1 bg-transparent focus:border-none focus:outline-none text-yellow-400 text-xl ml-4 tracking-widest placeholder-yellow-400" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter your search query" />
        </div>
        <div className="flex justify-between mt-4 flex-wrap animate__animated animate__fadeInUp">
          {['ALL', ...'#abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')].map((e) => <button type="button" className={`text-xl text-yellow-400 tracking-widest ${e.toLowerCase() !== alphaFilter ? 'opacity-60' : ' text-4xl font-bold'}`} onClick={() => setAlphaFilter(e.toLowerCase())}>{e}</button>)}
        </div>
        {data.length > 0 && data.filter((e) => alphaFilter === 'all' || (alphaFilter === '#' && e.title.toLowerCase()[0].match(/[^a-z]/)) || e.title.toLowerCase()[0] === alphaFilter).filter((e) => e.title.toLowerCase().includes(query.toLowerCase())).map((e) => <Language e={e} />)}
      </div>
      <FAB callback={() => document.querySelector('.scroll')?.scrollTo({ top: 0 })} />
    </div>
  );
}

function Languages() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<ILanguage[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/languages')
      .then((response) => response.json())
      .then((d) => {
        setData(d.sort((a: ILanguage, b: ILanguage) => a._id > b._id));
      });
  }, []);

  return (
    <div className="flex flex-col gap-20 pt-32 items-center px-64 w-full h-full overflow-y-auto overflow-x-hidden scroll">
      <div className="w-full border-2 border-yellow-400 animate__animated animate__fadeInUp flex items-center p-4">
        <Icon icon="uil:search" className="w-8 h-8 text-yellow-400" />
        <input className="flex-1 bg-transparent focus:border-none focus:outline-none text-yellow-400 text-xl ml-4 tracking-widest placeholder-yellow-400" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter your search query" />
      </div>
      {data.length > 0 && Array.from('#abcdefghijklmnopqrstuvwxyz').map((a) => (
        data.filter((e) => (a === '#' && e.title.toLowerCase()[0].match(/[^a-z]/)) || e.title.toLowerCase()[0] === a).filter((e) => e.title.toLowerCase().includes(query.toLowerCase())).length > 0 && (
        <div className="text-yellow-400 w-full">
          <div className="flex items-center gap-4">
            <h2 className="fuck-my-life text-5xl">{a.toUpperCase()}</h2>
            <div className="w-full border-b-2 border-yellow-400" />
          </div>
          <div className="grid grid-cols-3 mt-6 ml-0.5 gap-y-4 gap-x-12">{data.filter((e) => (a === '#' && e.title.toLowerCase()[0].match(/[^a-z]/)) || e.title.toLowerCase()[0] === a).filter((e) => e.title.toLowerCase().includes(query.toLowerCase())).map((e) => <Link to={`/browse#lang-${e.id}`} className="text-xl tracking-widest break-all hover:underline decoration-2">{e.title}</Link>)}</div>
        </div>
        )
      ))}
      <FAB callback={() => document.querySelector('.scroll')?.scrollTo({ top: 0 })} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/languages" element={<Languages />} />
      </Routes>
    </Router>
  );
}

export default App;
