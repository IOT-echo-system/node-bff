export type Request = {
  params: Record<string, string | undefined>
  app: { locals: any }
  body: Record<string, any> | undefined
}
export type Response = { send: (responseData: any) => void; setStatus: (status: number) => Response }
export type RequestHandler = (req: Request, res: Response) => any
export type ApiResponse = { statusCode: number; headers: Record<string, string>; body: string }
