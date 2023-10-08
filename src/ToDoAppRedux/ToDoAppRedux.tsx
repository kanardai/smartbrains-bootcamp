/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LinkComponent } from '../components/LinkComponent';
import { urls } from '../utils/urls';
import { colors } from '../utils/theme';
import { Div_ContainerPage } from '../components/Components';
import { H3_Month } from '../components/Components';
import { Helmet } from 'react-helmet';
import { TodoAppRedux } from './ToDoApp';
import { Provider } from 'react-redux';
import { store } from '../utils/store';

export const ToDoAppRedux = () => {
  return (
    <Div_ContainerPage
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <Helmet>
        <title>AD - ToDo App</title>
      </Helmet>
      <H3_Month>TODOS</H3_Month>

      <Provider store={store}>
        <TodoAppRedux />
      </Provider>

      <LinkComponent to={urls.mainpage} color={colors.highlight}>
        GO HOME
      </LinkComponent>
    </Div_ContainerPage>
  );
};
