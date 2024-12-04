import Message from "../models/message.model.js";
import User from "../models/user.model.js";

const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    //find all user except the loggedin user and passowrd
    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error " });
  }
};

const getMessages = async (req, res) => {
  try {
    //changing id to usertochatid value
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error " });
  }
};

const sendMessage = async(req,res) => {
    try {
        const { text,image} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image : imageUrl,
        })
        await newMessage.save();

        //infuture todo realtime functionality goes here => socket.io

    res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("Error in getUsersForSidebar:", error.message);
        res.status(500).json({ error: "Internal server error " });   
    }
}

export { getUserForSidebar, getMessages , sendMessage};
