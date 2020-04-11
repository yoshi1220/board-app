export const boardActionNames = {
  ADD_POST: 'ADD_POST'
}

export const boardActions = {
  addPost: (name, email, title, content) => {
    return  {
      type: boardActionNames.ADD_POST,
      payload: {
        data: name,
        email: email,
        title, title,
        content, content
      }
    }
  }
}