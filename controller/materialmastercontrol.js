import { User } from "../models/Material_master";

// Get all users
export const getUsers = async (request, response) => {
  // Step -1 // Test API

  try {
    // finding something inside a model is time taking, so we need to add await
    const users = await User.find();
    response.status(200).json(users);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Save data of the user in database
export const addUser = async (request, response) => {
  // retrieve the info of user from frontend
  await User.findOne({ materialId: request.body.materialId }, (err, user) => {
    if (user) {
      response.send({ message: `Already Exists` });
    } else {
      const user = request.body;
      User.find({}, (err, userX) => {
        if (userX) {
          var val;
          val = userX[0].materialId;
          val = parseInt(val) + 1;
          val = val.toString();
          user.materialId = val;
          const newUser = new User(user);
          try {
            newUser.save();
            response.status(201).json(newUser);
          } catch (error) {
            response.status(409).json({ message: error.message });
          }
        }
      })
        .sort({ _id: -1 })
        .limit(1);
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};

// Get a user by id
export const getUserById = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Save data of edited user in the database
export const editUser = async (request, response) => {
  let user = await User.findById(request.params.id);
  user = request.body;

  const editUser = new User(user);
  try {
    await User.updateOne({ _id: request.params.id }, editUser);
    response.status(201).json(editUser);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

// deleting data of user from the database
export const deleteUser = async (request, response) => {
  try {
    await User.deleteOne({ _id: request.params.id });
    response.status(201).json("User deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
