const { withPlaiceholder } = require('@plaiceholder/next');

module.exports = withPlaiceholder({
  images: {
    domains: [
      'cdn2.thecatapi.com',
      '30.media.tumblr.com',
      '29.media.tumblr.com',
      '28.media.tumblr.com',
      '27.media.tumblr.com',
      '26.media.tumblr.com',
      '25.media.tumblr.com',
      '24.media.tumblr.com',
      '23.media.tumblr.com',
      '22.media.tumblr.com',
      '21.media.tumblr.com',
      '20.media.tumblr.com',
    ],
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/andantez/image/fetch/',
  },
});
