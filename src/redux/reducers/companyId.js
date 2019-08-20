const companyId = (state = 0, action) => {
  const { type, id } = action
  switch (type) {
    case 'SET_COMPANYID':
      return id
    default:
      return state
  }
}

export default companyId