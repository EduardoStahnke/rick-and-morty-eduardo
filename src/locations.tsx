import { useEffect, useState } from "react";
import { axiosClient } from "./api/axios";
import { PageableLocationType } from "./types/location.type";
import { Link } from "react-router-dom";
import "./locations.css";

function Locations() {
  const [locations, setLocations] = useState<PageableLocationType>();
  const [searchLocal, setSearchLocal] = useState("");
  const [loading, setLoading] = useState(false);

  async function getLocations() {
    setLoading(true);
    await axiosClient
      .get<PageableLocationType>(`/location`)
      .then((request) => {
        setLocations(request.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getLocations();
  }, []);

  async function pagesCharacters(url: string) {
    await axiosClient
      .get<PageableLocationType>(url)
      .then((request) => {
        setLocations(request.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function locationsFilter(event: { preventDefault: () => void }) {
    event.preventDefault();
    await axiosClient
      .get<PageableLocationType>(
        `https://rickandmortyapi.com/api/location/?name=${searchLocal}`
      )
      .then((request) => {
        setLocations(request.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="block">
      {loading ? (
        <span className="messageLoading">Loading, please wait...</span>
      ) : !locations ? (
        <span className="messageNoLocations">No locations to display.</span>
      ) : (
        <>
          <div className="filter">
            <form className="filterLocal" onSubmit={locationsFilter}>
              <span>
                <strong>Location Name: </strong>
              </span>
              <input
                type="text"
                value={searchLocal}
                onChange={(event) => setSearchLocal(event.target.value)}
                placeholder="Ex: Earth"
              />
              <button className="searchButton">Search</button>
            </form>
          </div>

          <div className="locations">
            {locations.results.map((local) => (
              <div className="locationsInformation" key={local.id}>
                <ul>
                  <li>
                    <p className="locationName">
                      <strong> Location: </strong>
                      {local.name}
                    </p>
                  </li>
                  <li>
                    <p className="locationType">
                      <strong>Location Type: </strong>
                      {local.type}
                    </p>
                  </li>
                  <li>
                    <p className="locationDimension">
                      <strong>Dimension: </strong>
                      {local.dimension}
                    </p>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <div className="pages">
            <button
              onClick={() => pagesCharacters(locations.info.prev)}
              disabled={!locations.info.prev}
            >
              Previous
            </button>
            <button
              onClick={() => pagesCharacters(locations.info.next)}
              disabled={!locations.info.next}
            >
              Next
            </button>
          </div>
          <div className="backButton">
            <button>
              <strong>
                <Link to="/">Back</Link>
              </strong>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Locations;
