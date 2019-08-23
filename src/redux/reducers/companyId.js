const company_id = (state = 0, action) => {
  const { type, company_id } = action
  switch (type) {
    case 'SET_COMPANYID':
      return company_id
    default:
      return state
  }
}

export default company_id