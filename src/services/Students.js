
import studentsJson from '../data/json/students.json';
import { env } from '../configs/env'


const header = new Headers({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'multipart/form-data'
});

const ENV_URL = env.url;



export function getAllStudents(data = {}) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    return studentsJson;

    // return fetch(datalink)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         console.log(responseJson);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
}



export function save(data) {
    let sentData = {
        method:"POST",
        mode: 'cors',
        header: header
    };

    return fetch(ENV_URL + 'students/store',sentData)
}