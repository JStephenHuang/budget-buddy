const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))

app.get('/upload', async(req, res) => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.veryfi.com/api/v8/partner/documents',
      headers: { 
        'Accept': 'application/json', 
        'CLIENT-ID': 'vrfIodcVWgMi1C0TjWuXflYWndIMVcg172keV3A', 
        'AUTHORIZATION': 'apikey peizheg:4b36ee9e8451ef3028ca767693f5ceb1', 
      }
    }

    const response = await axios(config)
    res.json(response.data).end()
  } catch (error) {
    console.error('Error:', error);
    res.status(404)
  }
})

app.post('/upload', async(req, res) => {
  try {
    const fileData = req.body.file_data

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.veryfi.com/api/v8/partner/documents',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'CLIENT-ID': 'vrfIodcVWgMi1C0TjWuXflYWndIMVcg172keV3A', 
        'AUTHORIZATION': 'apikey peizheg:4b36ee9e8451ef3028ca767693f5ceb1', 
      },
      data: { file_data: fileData }
    };

    const response = await axios(config);
    res.json(response.data).end();
  } catch (error) {
    console.error('Error:', error);
    res.status(404)
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});