/* eslint-disable */

import { DefaultBodyType, http, HttpResponse } from 'msw';

const handlers = [
  http.post('https://abc.com/api/', async () => {
    // Simulate a 2-second delay before responding
    const newPost: DefaultBodyType = await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    return HttpResponse.json(newPost, { status: 201 });
  }),
];

export { handlers };
