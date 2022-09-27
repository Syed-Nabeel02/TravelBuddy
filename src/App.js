import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getData } from "./api/index.js";

import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [crd, setCrd] = useState({});
  const [bounds, setBounds] = useState({});

  const [childClicked, setChildClicked] = useState(null);
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        setCrd({ lat: latitude, lng: longitude })
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFiltered(filteredPlaces);
    console.log(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    console.log(crd);
    console.log(bounds);
    if (bounds.sw && bounds.ne) {
      setLoading(true);
      getData(type, bounds.ne, bounds.sw).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        console.log(data);
        setFiltered([]);
        setLoading(false);
      });
    }
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCrd={setCrd} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filtered.length ? filtered : places}
            childClicked={childClicked}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: "flex",
          }}
        >
          <Map
            setCrd={setCrd}
            setBounds={setBounds}
            crd={crd}
            places={filtered.length ? filtered : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
