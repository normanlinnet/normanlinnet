import React from 'react';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    maxWidth: 472,
    margin: '16px auto',
  },
  avatar: {
    backgroundColor: blue[300],
  },
  cardContent: {
    paddingTop: 0,
  },
});

const Vocab = ({
  keyword,
  shortDef,
  englishDef,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardActionArea component={Link} to={`/vocab/${keyword}`}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {keyword.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={ <h5>{keyword}</h5>}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="body2" color="textSecondary" component="p">
              {shortDef || englishDef}
            </Typography>
          </CardContent>
        </CardActionArea>
    </Card>
  );
}

export default Vocab;
