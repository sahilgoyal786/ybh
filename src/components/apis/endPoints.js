const EndPoints = {
  register: {url: 'register'},
  login: {url: 'login'},
  forgotPassword: {url: 'forgot-password'},
  verifyOTP: {url: 'verify-otp'},
  verifyEmail: {url: 'verify-email'},
  resendVerifyEmailOTP: {url: 'resend-verify-email-otp'},
  setPassword: {url: 'password-reset'},
  profileUpdate: {url: 'user/profile/update'},
  passwordUpdate: {url: 'update-password'},

  votingImages: {url: 'voting-images', cache_age: 0.5},
  castVote: {url: 'voting-images'},
  leaderBoard: {url: 'leader-board'},

  latestPhotos: {url: 'recent-images', dont_cache: true},
  storeLikes: {url: 'voting-images'},
  uploadImage: {url: 'images-upload'},
  myPhotos: {url: 'user/photos', dont_cache: true},
  deletePhoto: {url: 'user/photos/delete'},

  tokenUpdate: {url: 'user/device-token/update'},

  getLatestBlog: {url: 'blogs?page_size=1', cache_age: 1},
  blogs: {url: 'blogs', dont_cache: true},

  getAllQuestions: {url: 'questions/all', dont_cache: true},
  getTriviaQuestions: {url: 'questions/trivia', dont_cache: true},
  getTipsOfTheDay: {url: 'tips', dont_cache: true},
  getRelationshipMeterQuestions: {
    url: 'questions/relationship_meter',
    dont_cache: true,
  },

  postTriviaAnswers: {url: 'questions/trivia/answers'},
  postRelationshipMeterAnswers: {url: 'questions/relationship_meter/answers'},

  getAllAdviceQuestions: {url: 'advice/all'},
  postAdviceQuestion: {url: 'advice/store'},
  postAdviceResponse: {url: 'advice/response/store'},
  updateAdviceResponse: {url: 'advice/response/update'},
  deleteAdviceResponse: {url: 'advice/response/delete'},

  voteOnResponse: {url: 'user/responses/vote'},

  getAdvertisements: {url: 'advertisements', cache_age: 24},
};

export default EndPoints;
