/** @format */
import { useEffect, useState, useRef } from "react";
import { Tables } from "./Tables";
export const Forms = () => {
  const [FormData, setFormData] = useState({});
  const [Body, setBody] = useState([]);
  const [query, setQuery] = useState("");
  const bool = useRef(true);
  const price = useRef(true);
  const order = useRef(true);

  useEffect(() => {
    getData();
  }, []);

  // display sorted data
  const getData = () => {
    fetch("http://localhost:3001/games")
      .then((d) => d.json())
      .then((res) => {
        res.sort((a, b) => {
          let aname = a.gamename.toUpperCase();
          let bname = b.gamename.toUpperCase();
          if (aname < bname) {
            return -1;
          }
          if (aname > bname) {
            return 1;
          }
          return 0;
        });
        setBody(res);
      });
  };

  //sort by name
  const sortByName = (val) => {
    if (order.current == true) {
      order.current = false;
    } else if (order.current == false) {
      order.current = true;
    }

    fetch("http://localhost:3001/games")
      .then((d) => d.json())
      .then((res) => {
        res.sort((a, b) => {
          let aname = a[val].toUpperCase();
          let bname = b[val].toUpperCase();
          if (aname < bname) {
            return -1;
          }
          if (aname > bname) {
            return 1;
          }
          return 0;
        });
        setBody(res);
      });
  };

  // submit the data
  const handleData = (e) => {
    const { name } = e.target;
    setFormData({ ...FormData, [name]: e.target.value });
  };

  //sorting the price
  const sortPrice = (val) => {
    if (price.current == true) {
      price.current = false;
    } else if (price.current == false) {
      price.current = true;
    }

    fetch(`http://localhost:3001/games`)
      .then((d) => d.json())
      .then((res) => {
        console.log(res);
        if (price.current) {
          res.sort((a, b) => a[val] - b[val]);

          setBody(res);
        } else {
          res.sort((a, b) => b[val] - a[val]);
          setBody(res);
        }
      });
  };

  //sorting the data
  const sort = (val) => {
    if (bool.current == true) {
      bool.current = false;
    } else if (bool.current == false) {
      bool.current = true;
    }

    fetch(`http://localhost:3001/games`)
      .then((d) => d.json())
      .then((res) => {
        console.log(res);
        if (bool.current) {
          res.sort((a, b) => a[val] - b[val]);

          setBody(res);
        } else {
          res.sort((a, b) => b[val] - a[val]);
          setBody(res);
        }
      });
  };

  const search = (val) => {
    console.log(val);
    fetch(`http://localhost:3001/games?gamename_like=${val}`)
      .then((d) => d.json())
      .then((res) => {
        console.log(res);
        setBody(res);
      });
  };
  return (
    <div>
      <h1>Game STore</h1>
      <form
        id="addgame"
        onSubmit={(e) => {
          e.preventDefault();
          fetch("http://localhost:3001/games", {
            method: "POST",
            body: JSON.stringify(FormData),
            headers: {
              "Content-type": "application/json",
            },
          }).then(getData);
        }}
      >
        <input
          type="text"
          onChange={handleData}
          name="gamename"
          placeholder="Game Name"
          required
        />
        <br />
        <input
          type="text"
          onChange={handleData}
          name="gameauthor"
          placeholder="Game Author"
          maxLength={8}
          required
        />
        <br />
        <input
          type="text"
          onChange={handleData}
          name="gameprice"
          placeholder="Game Price"
          maxLength={8}
          required
        />
        <br />
        <input
          type="text"
          onChange={handleData}
          name="gametags"
          placeholder="Game Tags"
          maxLength={8}
          required
        />
        <br />
        <input
          type="checkbox"
          name="forkids"
          onChange={handleData}
          value={true}
        />
        For Kids?
        <br />
        <textarea
          name="gamedesc"
          rows={3}
          cols={20}
          onChange={handleData}
          required
        ></textarea>
        <br />
        <select name="gamerating" onChange={handleData} required>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <br />
        <input type="Submit" value="ADD" name="submit" />
      </form>
      <hr />
      <h2>List</h2>
      <h3>Search:</h3>
      <input
        type="text"
        id="searchbox"
        name="searchbox"
        placeholder="Search Games"
        onChange={(e) => search(e.target.value)}
      />

      <br />
      <table id="table" border="2">
        <thead>
          <tr>
            <th>
              game name{" "}
              <button
                name="gamename"
                onClick={(e) => sortByName(e.target.name)}
              >
                Sort
              </button>
            </th>
            <th>game author</th>
            <th>
              game price{" "}
              <button
                id="sortbyprice"
                name="gameprice"
                onClick={(e) => sortPrice(e.target.name)}
              >
                Sort
              </button>
            </th>
            <th>game tags</th>
            <th>is for kids</th>
            <th>
              rating{" "}
              <button
                id="sortbyrating"
                name="gamerating"
                onClick={(e) => sort(e.target.name)}
              >
                Sort
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {Body.map((e) => (
            <Tables data={e} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
