export const boardActionNames = {
  ADD_POST: 'ADD_POST'
}

export const boardActions = {
  addPost: (data) => {
    return  {
      type: boardActionNames.ADD_POST,
      payload: {
        data: data
      }
    }
  }
}