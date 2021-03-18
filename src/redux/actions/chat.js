import http from '../../services/Services';

export const setChat = (token, id) => {
  return async (dispatch) => {
    try {
      const {data} = await http.getChatList(token, id, {
        keyword: '',
        sort: 'ASC',
        page: 1,
      });

      if (data.pageInfo.currentPage <= data.pageInfo.totalPage) {
        dispatch({
          type: 'SET_CHAT',
          payload: {
            chats: data.results,
          },
        });

        dispatch({
          type: 'SET_PAGE',
        });
      }
    } catch (err) {
      dispatch({
        type: 'SET_CHAT',
        payload: {
          chats: [],
        },
      });
      console.log(err.message);
    }
  };
};

export const setChatNext = (token, id, page, isASC, keyword) => {
  return async (dispatch) => {
    try {
      const {data} = await http.getChatList(token, id, {
        keyword: keyword,
        sort: isASC ? 'ASC' : 'DESC',
        page: page,
      });

      if (data.pageInfo.currentPage <= data.pageInfo.totalPage) {
        dispatch({
          type: 'SET_CHAT_NEXT',
          payload: {
            chats: data.results,
          },
        });
        dispatch({
          type: 'SET_PAGE',
        });
      }
    } catch (err) {
      dispatch({
        type: 'SET_CHAT_NEXT',
        payload: {
          chats: [],
        },
      });
      console.log(err.message);
    }
  };
};

export const setContact = (token, page, isASC, keyword) => {
  return async (dispatch) => {
    try {
      const {data} = await http.getContactList(token, {
        keyword: keyword,
        sort: isASC ? 'ASC' : 'DESC',
        page: page,
        by: 'contact_name',
      });

      // if (data.pageInfo.currentPage <= data.pageInfo.totalPage) {
      //   dispatch({
      //     type: 'SET_CONTACT',
      //     payload: {
      //       contacts: data.results,
      //     },
      //   });
      // }
      dispatch({
        type: 'SET_CONTACT',
        payload: {
          contacts: data.results,
        },
      });
    } catch (err) {
      console.log('================ PAGE', page);
      // console.log(err.response.data.message);
      dispatch({
        type: 'SET_CONTACT',
        payload: {
          contacts: [],
        },
      });
      dispatch({
        type: 'SET_MESSAGE_CONTACT',
        payload: {
          message: err.response.data.message,
        },
      });
      console.log(err.message);
    }
  };
};

export const setId = (id) => ({
  type: 'SET_ID',
  payload: {
    id,
  },
});

export const setChatList = (chats) => {
  return {
    type: 'SET_CHAT_LIST',
    payload: {
      chatList: chats,
    },
  };
};

// return {
//   type: 'SET_CHAT',
//   payload: {
//     chats,
//   },
// };
