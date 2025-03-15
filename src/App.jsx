import { useState, useCallback, useEffect, useRef } from "react";
import "./index.css";

function App() {
  const [length, setLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook

  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*-_+={}[]~`";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPassworToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-2xl text-center bg-gray-800 p-5 rounded-lg  text-orange-500">
        <h1 className="text-3xl text-white">Password Generator</h1>

        <div className=" rounded-l-2xl rounded-r-2xl mt-5 ">
          <input
            className="h-10 bg-white w-[85%] pl-4 rounded-l-2xl border-none outline-none font-semibold"
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPassworToClipBoard}
            className="bg-blue-700 h-10 w-[15%] rounded-r-2xl"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 pl-3 mt-3">
          <div className="flex justify-center items-center gap-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex justify-center items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onClick={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex justify-center items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charaterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charaterInput">Charactors</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
