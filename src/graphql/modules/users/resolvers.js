const generator = require("../../../helpers/generator");

module.exports = {
  User: {
    async tasks(user, _, { dataSources }) {
      return await dataSources.taskService.getTasks(user.id);
    },
  },
  Query: {
    async user(_, { login }, { dataSources }) {
      const userFound = await dataSources.userService.getUser(login);

      if (userFound) {
        userFound.token = generator.createToken(userFound.id);
        return userFound;
      }

      const {
        login: loginGit,
        avatar_url,
      } = await dataSources.githubService.getUser(login);

      const newUser = await dataSources.userService.addUser({
        login: loginGit,
        avatar_url,
      });

      newUser.token = generator.createToken(newUser.id);

      return newUser;
    },
  },
};
