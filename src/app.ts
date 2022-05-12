import express from 'express'
import multer from 'multer'
// import os from 'node:os'
// import cors from 'cors'

class App {
  public express: express.Application
  //   private upload: multer.Multer

  public constructor () {
    this.express = express()
    this.middleware()
    this.routes()
  }

  private middleware (): void {
    this.express.use(express.json())
    // this.express.use(cors)
  }

  private routes (): void {
    const upload = multer({ })

    this.express.get('/', (req, res) => {
      return res.send('Hello Word')
    })

    this.express.post('/upload', upload.single('file'), (req, res) => {
      const title = req.body.title
      const file = req.file
      const encoded = req.file.buffer.toString('base64')
      console.log('title', title)
      console.log('file', file)
      console.log('encoded{', encoded, '}')
      //   console.log(file.filename)
      return res.sendStatus(200)

    //   return res.sendStatus(200).send({ Arquivo: file.filename, tamanho: file.size, mensagem: 'enviado com sucesso' })
    })
  }
}

export default new App().express
