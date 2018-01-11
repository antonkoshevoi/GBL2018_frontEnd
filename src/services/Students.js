
import studentsJson from '../data/json/students.json';

let datalink = '../data/json/students.json';

export function getAllStudents(data = {}) {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

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