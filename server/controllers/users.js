import User from "../models/User.js"


// READ
export const getUser = async (req, res) => {
    try {
        // getting id from req.params
        const { id } = req.params

        // making a db call to find that id to grab the information of user that we need
        const user = await User.findById(id)

        // and then send it to frontend
        res.status(200).json(user)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const getUserFriends = async (req, res) => {
    try {
        // getting id from req.params
        const { id } = req.params

        const user = await User.findById(id)

        // here we use promise to make multiple api calls to database
        const friends = await Promise.all(
            // grab each id that user has and grab all the information from friend id
            user.friends.map((id) => User.findById(id))
        )

        // kind of change a lil bit in schema before sending back to frontend
        // make sure to get data in proper format for frontend
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        )

        res.status(200).json(formattedFriends)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// UPDATE
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        //if the friend id is included in main userid 
        if (user.friends.includes(friendId)) {
            // if the friendId is already a part of user then we want them to remove
            // we are basically removing when id is equal to friend id
            user.friends = user.friends.filter((id) => id !== friendId)
            // we have to remove there user from their friend list
            friend.friends = friend.friends.filter((id) => id !== id)
        }
        // and if they are not included then we add it by using push
        else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()

        // here we use promise to make multiple api calls to database
        const friends = await Promise.all(
            // grab each id that user has and grab all the information from friend id
            user.friends.map((id) => User.findById(id))
        )

        // kind of change a lil bit in schema before sending back to frontend
        // make sure to get data in proper format for frontend
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        )

        res.status(200).json(formattedFriends)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}