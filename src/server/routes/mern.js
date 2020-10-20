import express from 'express';

const mernApi = (app) => {
  const router = express.Router();
  app.use('*', router);

  router.get('*', (req, res) => {
    res.send(
      `
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="styles/main.css" type="text/css">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site MERN Task" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
        <link href="https://fonts.googleapis.com/css?family=Raleway:400,900|Roboto:300,400,700&display=swap" rel="stylesheet">
        <title>MERN Tasks</title>
      </head>

      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <script src="assets/app.js" type="text/javascript" ></script>
      </body>

      </html>`,
    );
  });
};

export default mernApi;
