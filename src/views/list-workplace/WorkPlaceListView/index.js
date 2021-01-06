import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles,

} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const WorkPlaceListView = () => {
  const classes = useStyles();


  

  return (

    <Page
      className={classes.root}
      title="Cities"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results />
        </Box>
      </Container>
    </Page>
    
  );
};

export default WorkPlaceListView;
