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
        'CLIENT-ID': 'vrf1oZgHUxnMyXzpIB6UbPtyrKSSI5dGWX676U7', 
        'AUTHORIZATION': 'apikey cedricdara:caa4e9db3896a04a9719c1859270ffe4'
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
        'CLIENT-ID': 'vrf1oZgHUxnMyXzpIB6UbPtyrKSSI5dGWX676U7', 
        'AUTHORIZATION': 'apikey cedricdara:caa4e9db3896a04a9719c1859270ffe4'
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