const spaces = require("./spaces.json");

const initialData = {
  layout: undefined,
  networkStatus: undefined,
  conversations: {
    conversations: {
      byId: spaces,
      loadingById: {},
      errorById: {}
    },
    allConversations: {
      data: [],
      loading: false
    }
  },
  currentUser: undefined,
  currentConversation: undefined
};
export default initialData;
