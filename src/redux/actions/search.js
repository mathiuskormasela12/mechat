// ==== Search
export const search = (keyword) => ({
  type: 'SET_SEARCH',
  payload: {
    keyword,
  },
});

export const sort = () => ({
  type: 'SET_SORT',
});
