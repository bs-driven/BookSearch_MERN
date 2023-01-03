const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");


const resolvers = {
    Query: {
      users: async () => {
        return User.find({});
      },
      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId });
      },

      me: async (parent, args, context) => {
        if (context.user) {
          return await User.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError("You are not logged in");
      },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
        
          const token = signToken(user);
          return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { user, token };
        },
        
        saveBook: async (parent, args, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              {
                $push:{savedBooks: args.input} 
              },
              {
                new: true,
                runValidators: true,
              }
    
            );
            return updatedUser;
            
          }
          throw new AuthenticationError("You are not logged in");
        },

        removeBook: async (parent, args, context) => {
            if (context.user) {
              return User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks:{_id: args.book}  } },
                { new: true }
              );
            }
            throw new AuthenticationError("You are not logged in")
          },
        },
      };

      module.exports = resolvers;