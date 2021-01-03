import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography } from "@material-ui/core";

import Container from '@material-ui/core/Container';

import CircularProgress from '@material-ui/core/CircularProgress';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import './Newtab.scss';

import { processBookmarks } from '../../utils/bookmark.bs';

export default class NewTab extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      is_loading: true,
      data: null
    };

    this.classes = makeStyles((theme) => ({
      root: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
      },
    }));
  }

  componentDidMount() {
    this.loadAndRender();
  }

  loadAndRender() {
    chrome.bookmarks.getTree((result) => {
      const bookmarksData = processBookmarks(JSON.stringify(result));
      setTimeout(() => {
        this.setState({
          is_loading: false,
          data: bookmarksData
        });
      }, 500);
    });
  }

  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
            My Bookmarks
            </Typography>
          </Toolbar>
        </AppBar>
        <Container fixed>
          {
            this.state.is_loading
            ? <div className="loader-container"><CircularProgress /></div>
            : <List component="nav" aria-label="bookmarks">
                {
                  this.state.data.map((bookmark) => {
                    return (
                      <ListItem key={bookmark.id} button component="a" target="_blank" href={bookmark.url}>
                        <ListItemIcon>
                          <BookmarkIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={bookmark.title} />
                      </ListItem>
                    )
                  })
                }
              </List>
          }
        </Container>
      </div>
    );
  }
}
