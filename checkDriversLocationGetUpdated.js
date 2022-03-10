/**
 * Edit EVN, SLUG, EMAIL, PASSWORD
 * Run:
 * $ node checkDriversLocationGetUpdated.js
 */
const EVN = "staging";
const SLUG = "yojee";
const EMAIL = "yojee@staging.com";
const PASSWORD = "yojeestaging";
/**
 * 
 */
const BACKEND_URL = `https://umbrella-${EVN}.yojee.com`;

const request = require("request-promise");

const getWorkersLocationGetUpdate = async () => {

  var options = {
    url: `${BACKEND_URL}/api/v3/auth/signin`,
    method: "POST",
    headers: {
      company_slug: SLUG,
      "content-type": "application/json;charset=UTF-8",
    },
    body: `{"email":"${EMAIL}","password":"${PASSWORD}"}`,
  };

  let jwt_tokens_access_token = null;

  function login(error, response, body) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      jwt_tokens_access_token = info.data.jwt_tokens.access_token;
    }
  }

  await request(options, login);

  // Request 2: Get Workers
  var headers = {
    authorization: `Bearer ${jwt_tokens_access_token}`,
    company_slug: SLUG,
    "content-type": "application/json;charset=UTF-8",
  };

  var options = {
    url: `${BACKEND_URL}/api/v3/dispatcher/workers?page_size=1000&page=1&sort=last_seen&order=desc`,
    headers: headers,
  };

  var workerDataFilter;

  function getworkers(error, response, body) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      workerData = info.data;
      // console.log(workerData);

      workerDataFilter = workerData.filter((worker) => {
        return (worker.last_seen - worker.location_updated_at > (30 * 60 * 1000)) || (worker.location_updated_at === null);
      });
    }
  }

  await request(options, getworkers);

  workerDataFilter.forEach(worker => 
    console.log(worker.name)
  )

  return workerDataFilter;
};

getWorkersLocationGetUpdate()
