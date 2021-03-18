import React, {useEffect, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setChat, setContact} from '../redux/actions/chat';
import io from '../helpers/socket';
import jwtdecode from 'jwt-decode';

export default function Root(props) {
  const dispatch = useDispatch();
  const token = useSelector((c) => c.auth.token);
  const id = useSelector((c) => c.chat.id);
  const search = useSelector((c) => c.search);
  const chat = useSelector((c) => c.chat);

  useEffect(() => {
    // io.onAny(() => {
    //   io.once('Send_Message', (msg) => {
    //     console.log(msg);
    //     dispatch(setChat(token, id));
    //   });
    // });

    if (token) {
      dispatch(setContact(token, chat.page, search.isASC, search.keyword));
      // dispatch(setChat(token, id));
    }
    if (id && token) {
      const decode = jwtdecode(token);
      // this.fetchData();
      io.onAny(() => {
        io.once(`Update_Contact_${decode.id}`, (msg) => {
          console.log(msg);
          dispatch(setContact(token, chat.page, search.isASC, search.keyword));
        });
      });
      io.onAny(() => {
        io.once(`Send_Message_${decode.id}`, (msg) => {
          console.log(msg);
          dispatch(setChat(token, id));
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token, id]);

  return <Fragment>{props.children}</Fragment>;
}