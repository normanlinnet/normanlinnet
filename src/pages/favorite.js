import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Loading, Header, Vocab } from '../components';

export const VOCAB_DATA = gql`
  fragment VocabData on Vocab {
    __typename
    keyword
    shortDef
    englishDef
    isAdded
  }
`;

export const GET_MY_FAVORITES = gql`
  query GetMyFavorites {
    me {
      id
      email
      favorites {
        ...VocabData
      }
    }
  }
  ${VOCAB_DATA}
`;

const Favorite = () => {
  const { 
    data, 
    loading, 
    error 
  } = useQuery(
    GET_MY_FAVORITES,
    { fetchPolicy: "network-only" }
  );

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header>My Favorites</Header>
      {data.me && data.me.favorites.length ? (
        data.me.favorites.map(({
          keyword,
          shortDef,
          englishDef,
        }) => (
          <Vocab
            key={keyword}
            keyword={keyword}
            shortDef={shortDef}
            englishDef={englishDef}
          />
        ))
      ) : (
        <p>You don't have any favorites</p>
      )}
    </Fragment>
  );
}

export default Favorite;
