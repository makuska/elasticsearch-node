import express, {Express} from 'express'

const app: Express = express()

app.listen(8080, (): void => {
  console.log('Server listening on port 8080')
  console.log("hello world")
})

app.get('/hello-world', (): string => {
  return 'Hello world!'
})