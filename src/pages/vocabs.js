import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Vocab, Header, Loading } from '../components';

export const GET_VOCABS = gql`
  query GetVocabList {
    vocabs {
      keyword
      shortDef
      cambridgeDef
      englishDef
      yahooDef
      isAdded
    }
  }
`;

const Vocabs = () => {
  const {
    data, 
    loading, 
    error, 
  } = useQuery(GET_VOCABS);

  if (loading) return <Loading />;
  if (error || !data) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header />
      {data.vocabs &&
        data.vocabs.map(({
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
        ))}
    </Fragment>
  );
}

export default Vocabs;
