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
  blogShow: {url: 'blogs/show', dont_cache: true},

  submitCompatibilityTestResponses: {url: 'user/compatibility-test'},
  compatibilityTestResult: {url: 'user/compatibility-test/results'},
  deleteTest: {
    url: 'user/compatibility-test/delete',
  },
  respondToCompatibilityTestInvite: {
    url: 'user/compatibility-test-invite/update',
  },
  getCompatibilityTests: {
    url: 'user/compatibility-tests',
    dont_cache: true,
  },
  getCompatibilityTestQuestions: {
    url: 'compatibility-test/questions',
    dont_cache: true,
  },

  getAllQuestions: {url: 'questions/all', dont_cache: true},
  searchUser: {url: 'search/users'},
  getTriviaQuestions: {url: 'questions/trivia', dont_cache: true},
  getTipsOfTheDay: {url: 'tips', dont_cache: true},
  getRelationshipMeterQuestions: {
    url: 'questions/relationship_meter',
    dont_cache: true,
  },

  postTriviaAnswers: {url: 'questions/trivia/answers'},
  postRelationshipMeterAnswers: {url: 'questions/relationship_meter/answers'},

  getAllAdviceQuestions: {url: 'advice/all'},
  getAdviceQuestion: {url: 'advice/{id}/show'},
  postAdviceQuestion: {url: 'advice/store'},
  postAdviceResponse: {url: 'advice/response/store'},
  updateAdviceResponse: {url: 'advice/response/update'},
  deleteAdviceResponse: {url: 'advice/response/delete'},

  voteOnResponse: {url: 'user/responses/vote'},

  getAdvertisements: {url: 'advertisements', cache_age: 24},

  ProfileImageUpload: {url: 'matchmaking/image-upload'},
  myConnections: {url: 'matchmaking/profiles'},
  pendingConnections: {url: 'matchmaking/pending-profiles'},
  getMatchProfile: {url: 'matchmaking/profile/'},
  myProfile: {url: 'matchmaking/my-profile'},
  checkMatchProfile: {url: 'matchmaking/profile/check'},
  createMatchProfile: {url: 'matchmaking/profile/add'},
  updateMatchProfile: {url: 'matchmaking/profile/update'},
  verifyMatchProfile: {url: 'matchmaking/profile/verify'},
  searchMatchProfile: {url: 'matchmaking/profile/search'},
  deleteMatchProfile: {url: 'matchmaking/profile/delete'},

  sendProfileRequest: {url: 'matchmaking/request/send'},
  acceptProfileRequest: {url: 'matchmaking/request/accept'},
  declineProfileRequest: {url: 'matchmaking/request/decline'},
  disconnectProfileRequest: {url: 'matchmaking/request/disconnect'},

  getChats: {url: 'chats'},
  createChat: {url: 'chat/create'},
  deleteChat: {url: 'chat/delete'},
  getChatMessages: {url: 'chat/messages'},
  sendMessage: {url: 'chat/message/send'},
  updateMessage: {url: 'chat/message/update'},
  deleteMessage: {url: 'chat/message/delete'},
  checkSubscriptions: {url: 'check-subscription'},
  newInstalls: {url: 'new-installs'},
  shareClicks: {url: 'share-clicks'},
  userSessions: {url: 'user-sessions'},
  reportRequest: {url: 'report-users'},
};
export default EndPoints;
