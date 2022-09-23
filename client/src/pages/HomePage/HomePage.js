import "./HomePage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
    setSearch("");
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by city"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default HomePage;
