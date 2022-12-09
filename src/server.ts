import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import SimpleWebImage from 'simple-web-image'

dotenv.config()

const app = express()
const port = process.env.PORT

const config = {
  drives: {
    local: {
      rootDir: './tmp/simple-web-image',
    },
  },
}

const simple = new SimpleWebImage(config)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

app.post('/image/upload', async (req: Request, res: Response) => {
  try {
    await simple.drive('local').put(req, './tmp/output/simple-web-image/image-name')
    res.send("upload success")
  } catch (err) {
    res.send("upload fail")
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`)
})
