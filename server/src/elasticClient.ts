import { Client } from '@elastic/elasticsearch'

const elasticClient: Client = new Client({
  nodes: ["http://es01:9200", "http://es02:9201"],
})

// elasticClient.info()
//   .then(async response => {
//     console.log('success', response.statusCode);
//     const result = await elasticClient.search({
//       index: 'r7',
//       query: {
//         match: {
//           subtype: 'a'
//         }
//       }
//     })
//     console.log('result', result)
//     console.log('count', result.hits.hits)
//   })
//   .catch(error => {
//     console.error('error', error)
//   })

export default  elasticClient