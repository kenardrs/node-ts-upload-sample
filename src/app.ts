import express from 'express'
import multer from 'multer'
import { SimulaProtocol } from './controller/simulaProtocol'
// import cors from 'cors'

class App {
  public express: express.Application
  private fileTypes: string[]
  private sp = new SimulaProtocol()

  public constructor () {
    this.fileTypes = [
      'image/gif',
      'image/png',
      'image/jpeg',
      'application/pdf'
    ]
    this.express = express()
    this.middleware()
    this.routes()
  }

  private middleware (): void {
    this.express.use(express.json())
    // this.express.use(cors)
  }

  private async sendFile (protocol: number, buffer: Buffer): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ protocol, buffer })
      }, 3000)
    })
  }

  private routes (): void {
    const upload = multer({})

    this.express.get('/', (req, res) => {
      return res.send('Hello Word')
    })

    this.express.post(
      '/upload',
      upload.single('file'),
      async (req: express.Request, res: express.Response) => {
        const { file, body } = req

        if (Object.keys(body).length === 0) {
          return res
            .status(401)
            .send({ erro: 'O formulário de dados está vazio' })
        }

        if ((file.size > 1024 * 1024 * 4)) {
          return res.status(401).send({
            erro: 'O arquivo de imagem enviado é maior do que o permitido, max: 4MB'
          })
        }

        if (!this.fileTypes.includes(file.mimetype)) {
          return res.status(401).send({
            erro: 'O tipo de arquivo de imagem enviado não é permitido'
          })
        }
        let res1

        res1 = await this.sp.getProtocol()
        console.log({ protocol: res1.protocol })
        res1 = await this.sendFile(res1.protocol, file.buffer)
        console.log({ res1 })
        return res
          .status(200)
          .send({ body, message: `${file.originalname} enviada com sucesso`, protocol: res1.protocol })
      }
    )
  }
}

export default new App().express
