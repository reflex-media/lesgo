import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import { searchIndex } from 'lesgo/utils/opensearch';
import app from 'config/app';
import isEmpty from 'lesgo/utils/isEmpty';

type Arguments = {
  uid?: string;
  name?: string;
  gender?: string;
  profileText?: string;
  favoriteMovieTitle?: string;
  favoriteMovieDirector?: string;
  favoriteMovieGenre?: string;
  city?: string;
  state?: string;
  country?: string;
};

type Query = {
  bool: {
    must?: {
      term?: {
        uid?: string;
        gender?: string;
        'location.city'?: string;
        'location.state'?: string;
        'location.country'?: string;
      };
      nested?: {
        query?: {
          term?: {
            'favoriteMovies.genre'?: string;
          };
          match?: {
            'favoriteMovies.director'?: string;
          };
        };
        path: string;
      };
      bool?: {
        should?: {
          match_phrase: {
            'profile.aboutMe'?: string;
            'profile.headline'?: string;
          };
        }[];
      };
      match?: {
        name?: string;
      };
    }[];
  };
};

const originalHandler = async (
  event: APIGatewayProxyEvent & { input: Arguments }
) => {
  const { input } = event;

  let query: Query = {
    bool: {},
  };

  const {
    uid,
    name,
    gender,
    profileText,
    favoriteMovieDirector,
    favoriteMovieGenre,
    city,
    state,
    country,
  } = input;

  const mustMatch = [];

  if (!isEmpty(uid)) {
    mustMatch.push({
      term: {
        uid,
      },
    });
  }

  if (!isEmpty(gender)) {
    mustMatch.push({
      term: {
        gender,
      },
    });
  }

  if (!isEmpty(name)) {
    mustMatch.push({
      match: {
        name,
      },
    });
  }

  if (!isEmpty(city)) {
    mustMatch.push({
      term: {
        'location.city': city,
      },
    });
  }

  if (!isEmpty(state)) {
    mustMatch.push({
      term: {
        'location.state': state,
      },
    });
  }

  if (!isEmpty(country)) {
    mustMatch.push({
      term: {
        'location.country': country,
      },
    });
  }

  if (!isEmpty(profileText)) {
    mustMatch.push({
      bool: {
        should: [
          {
            match_phrase: {
              'profile.aboutMe': profileText,
            },
          },
          {
            match_phrase: {
              'profile.headline': profileText,
            },
          },
        ],
      },
    });
  }

  if (!isEmpty(favoriteMovieGenre)) {
    mustMatch.push({
      nested: {
        query: {
          term: {
            'favoriteMovies.genre': favoriteMovieGenre,
          },
        },
        path: 'favoriteMovies',
      },
    });
  }

  if (!isEmpty(favoriteMovieDirector)) {
    mustMatch.push({
      nested: {
        query: {
          match: {
            'favoriteMovies.director': favoriteMovieDirector,
          },
        },
        path: 'favoriteMovies',
      },
    });
  }

  query = {
    ...query,
    bool: {
      ...query.bool,
      must: mustMatch,
    },
  };

  const resp = await searchIndex(query);
  return resp;
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
