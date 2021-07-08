import { Resolver, Mutation, Arg } from "type-graphql";
import { redis } from "../../redis";
import { User } from "../../entity/User";
import { v4 } from "uuid";
import { sendEmail } from "../../utils/sendEmail";
import { forgetPasswordPrefix} from "../constants/rediPrefiexes";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
  ): Promise<boolean> {
		const user = await User.findOne({ where: { email }});

    if(!user){
      return true;
    }
    const token = v4();
    await redis.set(forgetPasswordPrefix + token, user.id, "ex", 60 * 60 * 24);
    await sendEmail(email, `http://locahost:3000/change-password/${token}`);
    return true;
	}
}
