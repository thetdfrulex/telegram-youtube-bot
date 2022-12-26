const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

// Replace YOUR_BOT_TOKEN with your bot's token
const bot = new TelegramBot('5954271515:AAH8rojzXWPvMEKs_RrgUe8LCRbhdRJSTxw', {polling: true});

// Replace YOUR_API_KEY with your YouTube Data API key
const API_KEY = 'AIzaSyBPv-aTTULpCvFORU4VAIsoqRc6hkh0ceA';

// Listen for any message
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Get the search term from the user's message
  const searchTerm = msg.text;

  // Make a request to the YouTube Data API with the search term
  request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=${API_KEY}`, (error, response, body) => {
    if (error) {
      // Handle error
      return;
    }

    const data = JSON.parse(body);
    const videos = data.items;

    // Send the list of videos to the user as a message
    videos.forEach((video) => {
      bot.sendMessage(chatId, `${video.snippet.title}\n${video.snippet.description}\nhttps://www.youtube.com/watch?v=${video.id.videoId}`);
    });
  });
});
