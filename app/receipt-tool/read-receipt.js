import axios from 'axios'

export const getAll = async () => {
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
    const documents = response.data.documents

    const info = documents.map(document => [document.total, document.vendor.category])

    console.log(info)
    return info
}


export const upload = async (file) => {
    let data = JSON.stringify({
        "file_data": file,
        "country": "CA"
      });
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
        data : data
    }
    const response = await axios(config)
    console.log(response.data)
    return response.data
}