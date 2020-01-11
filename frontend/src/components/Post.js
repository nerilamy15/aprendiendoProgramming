import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Typography, Card, CardMedia, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Post = ({ name, email, post, date }) => {
  const useStyles = makeStyles(() => ({
    card: {
      marginBottom: 10,
      animation: "drop 1s ease"
    },
    test: {
      marginLeft: 150
    }
  }));
  const classes = useStyles();
  const { card, test } = classes;

  dayjs.extend(relativeTime);

  return (
    <>
      <Card className={card}>
        <CardMedia>
          <CardContent className={test}>
            <Typography
              color="primary"
              variant="h6"
              component={Link}
              target="_blank"
              to={`/users/${name}`}
            >
              {name}
            </Typography>
            <Typography variant="h6">{email}</Typography>
            <Typography variant="subtitle1">{post}</Typography>
            <Typography variant="caption">{dayjs(date).fromNow()}</Typography>
          </CardContent>
        </CardMedia>
      </Card>
    </>
  );
};

export default Post;
