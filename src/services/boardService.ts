export const boardService = {
  // async getBoards(request: Request): Promise<Board[]> {
  //   const boards = await WebClient.get<BoardResponse[]>({
  //     baseUrl: boardConfig.baseUrl,
  //     path: boardConfig.boards,
  //     headers: request.headers as Record<string, string>
  //   })
  //   const boardIds = boards.map(board => board.boardId)
  //   const widgets = await widgetService.getWidgetsByBoardIds(request, boardIds)
  //   return boards.map(board => {
  //     return { ...board, widgets: widgets.filter(widget => widget.boardId === board.boardId) } as Board
  //   })
  // },
  //
  // createNewBoard(request: Request): Promise<Board> {
  //   return WebClient.post<Board>({
  //     baseUrl: boardConfig.baseUrl,
  //     path: boardConfig.boards,
  //     headers: request.headers as Record<string, string>,
  //     body: request.body as Record<string, string>
  //   })
  // },
  //
  // updateBoardName(request: Request): Promise<Board> {
  //   return WebClient.put<Board>({
  //     baseUrl: boardConfig.baseUrl,
  //     path: boardConfig.updateBoardName,
  //     headers: request.headers as Record<string, string>,
  //     body: request.body as Record<string, string>,
  //     uriVariables: { boardId: request.params.boardId }
  //   })
  // },
  //
  // getSecretKey(request: Request): Promise<BoardSecretKeyResponse> {
  //   return WebClient.get<BoardSecretKeyResponse>({
  //     baseUrl: authConfig.baseUrl,
  //     path: boardConfig.baseUrl + boardConfig.secretKey,
  //     headers: request.headers as Record<string, string>,
  //     uriVariables: { boardId: request.params.boardId } as Record<string, string>
  //   })
  // },
  //
  // updateSecretKey(request: Request): Promise<BoardSecretKeyResponse> {
  //   return WebClient.put<BoardSecretKeyResponse>({
  //     baseUrl: authConfig.baseUrl,
  //     path: boardConfig.baseUrl + boardConfig.secretKey,
  //     headers: request.headers as Record<string, string>,
  //     uriVariables: { boardId: request.params.boardId } as Record<string, string>
  //   })
  // }
} as const
