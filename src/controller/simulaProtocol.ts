export class SimulaProtocol {
  public async getProtocol (): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const protocol = Math.floor(100000000 + Math.random() * 900000000)
        resolve({ protocol })
      }, 3000)
    })
  }
}
