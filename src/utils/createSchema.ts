import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "../modules/user/Register";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/user/Me";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";


export const createSchema = () => 
  buildSchema({
    resolvers: [
      RegisterResolver,
      ChangePasswordResolver,
      ConfirmUserResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      ForgotPasswordResolver,
    ],
    authChecker: ({ context: { req }}) => {
      return !!req.session.userId;
    }
})