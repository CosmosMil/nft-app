import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as dotenv from "dotenv";
import User from "../models/userModels";
dotenv.config();

const passportConfig = () => {
  const myStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
    // try {
    //   const user = await User.findById(jwt_payload.sub);
    //   return user ? done(null, user) : done(null, false);
    // } catch (error) {
    //   return done(error, false)
    // }
    User.findById(jwt_payload.sub)
      .then((user) => {
        return user ? done(null, user) : done(null, false);
      })
      .catch((error) => {
        return done(error, false);
      });
  });
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(myStrategy);
};

export default passportConfig;
