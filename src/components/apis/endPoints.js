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

  votingImages: {url: 'voting-images', cache_age: 4},
  castVote: {url: 'voting-images'},
  leaderBoard: {url: 'leader-board'},

  latestPhotos: {url: 'recent-images', dont_cache: true},
  storeLikes: {url: 'voting-images'},
  uploadImage: {url: 'images-upload'},
  myPhotos: {url: 'user/photos', dont_cache: true},
  deletePhoto: {url: 'user/photos/delete'},

  blogs: {url: 'blogs', cache_age: 48},

  getTriviaQuestions: {url: 'questions/trivia', dont_cache: true},
  getRelationshipMeterQuestions: {
    url: 'questions/relationship_meter',
    dont_cache: true,
  },

  postTriviaAnswers: {url: 'questions/trivia/answers'},
  postRelationshipMeterAnswers: {url: 'questions/relationship_meter/answers'},

  getAllAdviceQuestions: {url: 'advice/all'},
  postAdviceQuestion: {url: 'advice/store'},
  postAdviceResponse: {url: 'advice/response/store'},

  voteOnResponse: {url: 'user/responses/vote'},
};

export default EndPoints;
