# real_api

[![npm release](https://img.shields.io/npm/v/real_api)](https://www.npmjs.com/package/real_api)
[![Documentation](https://img.shields.io/badge/view-Documentation-blue?label=Open)](https://docs.realistic3.com/)
[![License](https://img.shields.io/badge/License-CSL-green)](#license)


Render three.js scene at run time

![alt output2](https://usmanheart.oss-cn-hongkong.aliyuncs.com/rapi/real_api_three/imgs/output2.jpg)
![alt output2](https://usmanheart.oss-cn-hongkong.aliyuncs.com/rapi/real_api_three/imgs/output1.jpg)


## Installation
```bash
npm install real_api
```

## Documentation

[![Documentation](https://img.shields.io/badge/view-Documentation-blue?label=Open)](https://docs.realistic3.com/)

## Render a job

##### Step 1: Get your login data

* Login at https://realistic3.com/
* Get your `App Key` and `App Secret` under `Account`
* Get your `Product Key` and `Instance ID` under `Console`
* Kindly check the details at https://docs.realistic3.com/getting-started


##### Step 2: Get RealAPI scene
```js
import * as REAL from "real_api";

const realScene = await REAL.Scene(scene, camera);
```

##### Step 3: Create new job

* Example: https://docs.realistic3.com/using-rest-api-calls/new-job

```js
import * as REAL from "real_api";

const uri = `https://${REAL.Domain}/rapi/ask_service`;

const params = {
    "prodCred": {
        "insID": 0,
        "appKey": "ABC",
        "prodKey": "XYZ"
    },
    "ask": "new_job",
    "renderParams": {
        "expFrom": "3js"
    }
}

const response = await axios.post(uri, params);
```


##### Step 4: Upload scene

* Example: https://docs.realistic3.com/using-rest-api-calls/upload-job

```js
const request = await axios.put(uploadUri, realScene);
```


##### Step 5: Submit job

* Example: https://docs.realistic3.com/using-rest-api-calls/submit-job

```js
import * as REAL from "real_api";

const uri = `https://${REAL.Domain}/rapi/ask_service`;

const params = {
    "prodCred": {
        "insID": 0,
        "appKey": "ABC",
        "prodKey": "XYZ"
    },
    "ask": "submit",
    "service": {
        "jobID": jobID
    }
}

const response = await axios.post(uri, params);
```

## Check job status

* Using SOCKET: https://docs.realistic3.com/using-socket
* Using REST API: https://docs.realistic3.com/using-rest-api-calls
