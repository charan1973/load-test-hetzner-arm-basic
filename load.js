import faker from "k6/x/faker";
import http from 'k6/http';

export const options = {
    scenarios: {
      constant_request_rate: {
        executor: 'constant-arrival-rate',
        rate: 500,
        timeUnit: '1s',
        duration: '10m',
        preAllocatedVUs: 100,
        maxVUs: 100,
      },
    },
  };

export default function () {
    const data = JSON.stringify({
        "first_name": faker.person.firstName(), 
        "last_name": faker.person.lastName(), 
        "email": faker.person.email(), 
        "age": faker.number.uint8()
    })
    http.post('http://37.27.89.131/users', data, {"headers": {"Content-Type": "application/json"}})
    http.get('http://37.27.89.131/users')
    http.del('http://37.27.89.131/users/' + faker.person.email())
    // console.log(hello, res)
}
