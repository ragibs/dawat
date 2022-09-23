import "./Search.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";

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
    <div>
      {data?.map((content) => (
        <Link key={content.listingId} to={`/${content.listingId}`}>
          <ul>
            <li>{content.city}</li>
            <li>{content.hostBio}</li>
            <li>{content.country}</li>
            <li>{content.description}</li>
          </ul>
        </Link>
      ))}
    </div>
  );
}

export default Search;
