import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Vocabs from './vocabs';
import Vocab from './vocab';
import Favorite from './favorite';
import { Footer, PageContainer } from '../components';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Vocabs path="/" />
          <Vocab path="vocab/:keyword" />
          <Favorite path="favorite" />
        </Router>
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
