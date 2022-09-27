//the axios import helps to make api calls
import axios from "axios";

export const getData = async (type, ne, sw) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        method: "GET",
        // url: "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary",
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Key":
            "f4d34031ccmsh137582d8a06eaf4p108bf3jsnbf3ab8dcf645",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log("hiii");
  }
};
