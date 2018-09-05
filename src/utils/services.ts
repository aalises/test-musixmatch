import { defaultDate, RequestCredentials } from "../utils/utils";
import { stringify } from "querystring";

export function getLastAlbum() : Promise<Date>{
    const promise = new Promise<Date>((resolve,reject) => {
        fetch(`http://api.musixmatch.com/ws/1.1/artist.albums.get?${stringify(RequestParams)}`, {
            method: "GET",
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
        }).then(response => {
            response.json()
                .then(data => data.error ? reject(data.error.message) : resolve(getLastDate(data)))
                .catch(err => reject(err));
        }).catch(err => reject(err));
    });
    return promise;
}

//Gets the last date from the object returned
function getLastDate(data) : Date {
    console.log("Data:",data);
    return defaultDate;
}

const RequestParams = {
    apikey: `${RequestCredentials.apikey}`,
    artist_id: `${RequestCredentials.artist_id}`,
    s_release_date: "desc",
    g_album_name: 1,
}