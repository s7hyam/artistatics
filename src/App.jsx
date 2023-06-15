import "./App.css";
import { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");

  // Getting The Access Token
  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "3519e56f616444849b095dd52efed9b9",
        client_secret: "761ad404209d48a883b76f9a75c60f0a",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setToken(data.access_token);
      });
  }, []);

  useEffect(() => {}, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Getting Search Value
    if (token !== null) {
      fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=artist&include_external=audio`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
          redirect: "follow",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => console.error(error));
    }
    setQuery("");
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Navbar query={query} onSubmit={handleSubmit} onChange={handleChange} />
      <div className="bg-black text-white min-h-screen">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-24 max-w-7xl m-auto px-4">
          {data
            ? data.artists.items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className=" m-auto flex w-full h-full border-primary border-2  bg-zinc-900 text-white p-4 rounded-md"
                  >
                    <img
                      src={item.images[0]?.url}
                      alt={item.name}
                      className=" w-[120px] h-[120px] object-cover border-2 border-primary rounded-full "
                    />
                    <div className="ml-4">
                      <h3 className="mt-2 text-xl">{item.name}</h3>
                      <p className="flex  items-center ">
                        <BsPeopleFill className="text-primary" /> &nbsp;{" "}
                        {item.followers.total}
                      </p>
                      <p>Rank: {item.popularity}</p>
                    </div>
                  </div>
                );
              })
            : "Search Your favourite artist"}
        </div>
      </div>
    </>
  );
}

export default App;
