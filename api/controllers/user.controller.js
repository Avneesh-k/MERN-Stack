import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"

export const test = (req,res)=>{
    res.send("This is Api through controller")
}


const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!'));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,         // ⛔️ was assigning `req.body.password` — corrected here
                    avatar: req.body.avatar,
                }
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);  // ⛔️ typo: you wrote `reset` instead of `rest`
    } catch (error) {
        next(error);
    }
};

export default updateUser;
