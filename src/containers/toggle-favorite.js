import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';

import { GET_VOCAB_DETAILS } from '../pages/vocab';

const useStyles = makeStyles({
  root: {
    maxWidth: 472,
    margin: '16px auto',
  },
});

const ADD_FAV = gql`
  mutation AddFavorite($keyword: String!) {
    addFavorite(keyword: $keyword) {
    	success
      keyword
    }
  }
`;

const REMOVE_FAV = gql`
  mutation RemoveFavorite($keyword: String!) {
    removeFavorite(keyword: $keyword) {
    	success
      keyword
    }
  }
`;

const ToggleFavorite = ({ keyword, isAdded }) => {
  const classes = useStyles();

  const [mutate, { error }] = useMutation( isAdded ? REMOVE_FAV : ADD_FAV,
    {
      variables: { keyword },
      refetchQueries: [
        {
          query: GET_VOCAB_DETAILS,
          variables: { keyword },
        },
      ]
    }
  );

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <Button
      className={classes.root}
      variant={isAdded ? 'contained' : 'outlined'}
      color="primary"
      onClick={() => mutate()}
    >
      {isAdded
        ? 'Remove from favorites'
        : 'Add to favorites'}
    </Button>
  );
}

export default ToggleFavorite;
