import { useEffect, useState } from "react";
import "./App.css";
import { axiosClient } from "./api/axios";
import { PageableCharacterType } from "./types/character.type";

function App() {
  const [personagens, setPersonagens] = useState<PageableCharacterType>();
  const [buscaNome, setBuscaNome] = useState("");

  async function filtrandoPersonagens() {
    await axiosClient
      .get<PageableCharacterType>(
        `https://rickandmortyapi.com/api/character/?name=${buscaNome}`
      )
      .then((request) => {
        setPersonagens(request.data);
      });
  }

  return (
    <div className="caixa">
      <div>
        <>
          <form className="nomeFiltro" onSubmit={filtrandoPersonagens}>
            <span>Nome:</span>
            <input type = "texto" onChange = {(event) => setBuscaNome(event.target.value)}/>
            <button type="submit" disabled={!nameFilter}>Filtrar</button>
          </form>
        </>
      </div>
      <h1></h1>
      <div className=""></div>
    </div>
  );
}

export default App;
