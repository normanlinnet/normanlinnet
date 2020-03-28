import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Loading, Header } from '../components';
import { ToggleFavorite } from '../containers'

const useStyles = makeStyles({
  root: {
    maxWidth: 472,
    margin: '16px auto',
  },
});

export const GET_VOCAB_DETAILS = gql`
  query VocabDetails($keyword: String!) {
    vocab(keyword: $keyword) {
      keyword
      shortDef
      cambridgeDef
      englishDef
      yahooDef
      isAdded
    }
  }
`;


const Vocab = ({ keyword }) => {
  const classes = useStyles();

  const { 
    data, 
    loading, 
    error ,
  } = useQuery(
    GET_VOCAB_DETAILS, 
    { variables: { keyword } },
  );
  
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  const {
    shortDef,
    englishDef,
    cambridgeDef,
    yahooDef,
    isAdded,
  } = data.vocab;

  return (
    <Fragment>
      <Header>{keyword}</Header>

      <ToggleFavorite keyword={keyword} isAdded={isAdded}></ToggleFavorite>

      {shortDef && <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Definition
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {shortDef || englishDef}
          </Typography>
        </CardContent>
      </Card>}

      {cambridgeDef && <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Cambridge Dictionary
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {cambridgeDef}
          </Typography>
        </CardContent>
      </Card>}

      {yahooDef && <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Yahoo Dictionary
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {yahooDef}
          </Typography>
        </CardContent>
      </Card>}

    </Fragment>
  );
}

export default Vocab;
