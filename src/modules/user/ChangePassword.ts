import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { redis } from "../../redis";
import { User } from "../../entity/User";
import bcrypt from "bcryptjs";
import { forgetPasswordPrefix } from "../constants/rediPrefiexes";
import { ChangePasswordInput } from "./changePassword/changePasswordInput";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, {nullable: true})
  async changePassword(
    @Arg("data") {token, password}: ChangePasswordInput,
    @Ctx() ctx : MyContext
  ): Promise<User | null> {
    
    const userId = await redis.get(forgetPasswordPrefix + token);
    if(!userId){
      return null;
    }
    const user = await User.findOne(userId);
    if(!user){
      return null;
    }

    redis.del(forgetPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 12);
    await user.save();

    ctx.req.session!.userId = user.id
    return user;
	}
}
