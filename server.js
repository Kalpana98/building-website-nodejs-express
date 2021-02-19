const express = require('express');
const path = require('path');
const routes = require('./routes');

const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const app = express();
const port = 3000;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['asasdftgvgfhh', 'inuihidvbhvf'],
  })
);

//template engine
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');
// OR
// app.set('view engine', 'html');
// app.engine('html', require('hbs').__express);

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

app.use(express.static(path.join(__dirname, 'static')));

app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});
