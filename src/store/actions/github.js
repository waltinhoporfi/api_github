export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_REPOS = "SET_USER_REPOS";

export const setUserInfo = (user) => {
  return {
    type: SET_USER_INFO,
    user: user
  };
};

export const setUserInfoRepos = (repos) => {

    const order = (a, b) => {
      if (a.star > b.star) return -1;
      if (a.star <  b.star) return 1;

      return 0;
    }
    let ordered_repos = repos.sort(order);
    return {
      type: SET_USER_REPOS,
      repos: ordered_repos
    };
  };