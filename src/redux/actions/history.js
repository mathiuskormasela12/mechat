// ===== history
// import all modules
import http from '../../services/Services';

export const setHistory = (token, keyword, isASC) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING',
    });
    try {
      const {data} = await http.getChatHistory(token, {
        keyword,
        sort: !isASC ? 'ASC' : 'DESC',
        page: 1,
      });

      dispatch({
        type: 'SET_LOADING',
      });

      if (data.pageInfo.currentPage <= data.pageInfo.totalPage) {
        dispatch({
          type: 'SET_HISTORY',
          payload: {
            histories: data.results,
          },
        });

        dispatch({
          type: 'SET_HISTORY_PAGE',
        });
      }
    } catch (err) {
      dispatch({
        type: 'SET_LOADING',
      });
      dispatch({
        type: 'SET_HISTORY',
        payload: {
          histories: [],
        },
      });
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: err.response.data.message,
        },
      });
      console.log(err.message);
    }
  };
};

export const setHistoryNext = (token, id, page, isASC, keyword) => {
  return async (dispatch) => {
    try {
      const {data} = await http.getChatList(token, id, {
        keyword: keyword,
        sort: isASC ? 'ASC' : 'DESC',
        page: page,
      });

      if (data.pageInfo.currentPage <= data.pageInfo.totalPage) {
        dispatch({
          type: 'SET_HISTORY_NEXT',
          payload: {
            histories: data.results,
          },
        });
        dispatch({
          type: 'SET_HISTORY_PAGE',
        });
      }
    } catch (err) {
      dispatch({
        type: 'SET_HISTORY_NEXT',
        payload: {
          histories: [],
        },
      });
      console.log(err.message);
    }
  };
};
