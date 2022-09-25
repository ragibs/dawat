import "./Search.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import Header from "../../component/Header/Header";

function Search() {
  const [data, setData] = useState([]);
  const { cityId } = useParams();

  //to properly format the search word
  const searchFunction = (word) => {
    let obj = word.split("");
    let rest = obj.slice(1);
    let finalWord = obj[0].toUpperCase() + rest.join("").toLowerCase();
    return finalWord;
  };

  let searchWord = searchFunction(cityId);

  //collection ref
  const colRef = collection(db, "listings");

  //queries

  const q = query(colRef, where("city", "==", `${searchWord}`));

  useEffect(() => {
    getSearch();
  }, [cityId]);

  const getSearch = () => {
    getDocs(q)
      .then((snapshot) => {
        let searchList = [];
        snapshot.docs?.forEach((doc) => searchList.push({ ...doc.data() }));
        setData(searchList);
      })
      .catch((error) => console.log(error));
  };

  console.log(data);

  // if (data === null || undefined || {}) {
  //   return <h1> Loading ...</h1>;
  // }

  return (
    <>
      <Header />
      <h1 className="search__result-header">
        {data.length} invites were found with the search criteria {searchWord}
      </h1>
      <div className="searchlist__container">
        {data?.map((content) => (
          <Link
            key={content.listingId}
            to={`/${content.listingId}`}
            className="search-card"
          >
            <header className="search-card-header">
              <h2 className="search-card-h2">{content.title}</h2>
              <p>{content.hostBio}</p>
            </header>
            <div className="search-card-host">
              <img
                className="search-host-avatar"
                src={content.hostAvatar}
                alt=""
              />
              <div className="search-host-name">
                <div className="search-host-name-prefix">{content.city}</div>
                {content.hostFName} {content.hostLName}
              </div>
            </div>
            <div className="search__price-container">
              <h2 className="search__price">From ${content.price}</h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Search;
