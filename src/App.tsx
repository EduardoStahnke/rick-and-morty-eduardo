import { useEffect, useState } from "react";
import { axiosClient } from "./api/axios";
import { PageableCharacterType } from "./types/character.type";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState<PageableCharacterType>();
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);

  async function getCharacters() {
    setLoading(true);
    await axiosClient
      .get<PageableCharacterType>(`/character`)
      .then((request) => {
        setCharacters(request.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getCharacters();
  }, []);

  async function pagesCharacters(url: string) {
    await axiosClient
      .get<PageableCharacterType>(url)
      .then((request) => {
        setCharacters(request.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function characterFilter(event: { preventDefault: () => void }) {
    event.preventDefault();
    await axiosClient
      .get<PageableCharacterType>(
        `https://rickandmortyapi.com/api/character/?name=${searchName}`
      )
      .then((request) => {
        setCharacters(request.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="block">
      {loading ? (
        <span className="messageLoading">Loading, please wait...</span>
      ) : !characters ? (
        <span className="messageNoCharacters">No characters to display.</span>
      ) : (
        <>
          <div className="filter">
            <form className="filterName" onSubmit={characterFilter}>
              <span>
                <strong>Character Name: </strong>
              </span>
              <input
                type="text"
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
                placeholder="Ex:Rick"
              />
              <button className="searchButton">Search</button>
            </form>
          </div>

          <div className="characters">
            {characters.results.map((character) => (
              <div className="charactersInformation" key={character.id}>
                <img
                  className="characterImage"
                  src={character.image}
                  alt={character.name}
                />
                <ul>
                  <li>
                    <p className="characterName">
                      <strong> Name: </strong>
                      {character.name}
                    </p>
                  </li>
                  <li>
                    <p className="characterStatus">
                      <strong>Status: </strong>
                      {character.status}
                    </p>
                  </li>
                  <li>
                    <p className="characterSpecies">
                      <strong>Species: </strong>
                      {character.species}
                    </p>
                  </li>
                  <li>
                    <p className="characterGender">
                      <strong>Gender: </strong>
                      {character.gender}
                    </p>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <div className="pages">
            <button
              onClick={() => pagesCharacters(characters.info.prev)}
              disabled={!characters.info.prev}
            >
              Previous
            </button>
            <button
              onClick={() => pagesCharacters(characters.info.next)}
              disabled={!characters.info.next}
            >
              Next
            </button>
          </div>
          <div className="backButton">
            <button>
              <Link to="/">Back</Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
