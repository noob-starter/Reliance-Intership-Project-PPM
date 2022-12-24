import { User } from "../models/Daily_production";
import { GradeUser } from "../models/Grade_Master";
import { ProductUser } from "../models/Product_master";
import { PalletUser } from "../models/Pallet_master";
import { LoginUsers } from "../models/User_Master";

// Get all users
export const getUsers = async (request, response) => {
  // Step -1 // Test API

  try {
    // finding something inside a model is time taking, so we need to add await
    const users = await User.find();
    const gradesUser = await GradeUser.find();
    const productsUser = await ProductUser.find();
    const palletX = await PalletUser.find();
    const login = await LoginUsers.find();

    const valuesNew = {
      grades: [...gradesUser],
      users: [...users],
      products: [...productsUser],
      pallets: [...palletX],
      logins: [...login],
    };

    response.status(200).json(valuesNew);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Save data of the user in database
export const addUser = async (request, response) => {
  // retrieve the info of user from frontend

  await User.findOne(
    { productionId: request.body.productionId },
    (err, user) => {
      if (user) {
        response.send({ message: `User Exists`, user });
      } else {
        const user = request.body;

        ProductUser.find(
          { productDesc: request.body.productId },
          (err, userMX) => {
            if (userMX) {
              PalletUser.findOne(
                {
                  productId: user.productId,
                  grade: user.grade,
                  noOfRolls: { $lte: userMX[0].maxRolls },
                },
                (err, userY) => {
                  if (userY) {
                    if (userMX.maxRolls === userY.noOfRolls) {
                      userY.status = "c";
                    }
                    var val;
                    val = userY.noOfRolls;
                    val = parseInt(val) + 1;
                    val = val.toString();
                    userY.noOfRolls = val;
                    userY.end_dt = request.body.production_dt;
                    const tempUserY = new PalletUser(userY);
                    try {
                      tempUserY.save();
                      User.find({}, (err, userX) => {
                        if (userX) {
                          var val;
                          val = userX[0].productionId;
                          val = parseInt(val) + 1;
                          val = val.toString();
                          user.productionId = val;
                          user.tareWeight = user.grossWeight - user.netWeight;
                          user.trackNo = "100000";
                          user.palletNo = tempUserY.palletNo;
                          console.log("Hello");
                          const newUserx = new User(user);
                          try {
                            newUserx.save();
                            response.status(201).json(newUser);
                          } catch (error) {
                            response
                              .status(409)
                              .json({ message: error.message });
                          }
                        }
                      })
                        .sort({ _id: -1 })
                        .limit(1);
                    } catch (error) {
                      response.status(409).json({ message: error.message });
                    }
                  } else {
                    var initialValue = {
                      palletNo: "200001",
                      productId: request.body.productId,
                      noOfRolls: "1",
                      grade: request.body.grade,
                      status: "o",
                      batch: request.body.batch,
                      created_dt: request.body.production_dt,
                      created_by: request.body.packedBy,
                      start_dt: request.body.production_dt,
                      end_dt: request.body.production_dt,
                    };

                    PalletUser.find({}, (err, userXY) => {
                      if (userXY) {
                        var val;
                        val = userXY[0].palletNo;
                        val = parseInt(val) + 1;
                        val = val.toString();
                        initialValue.palletNo = val;
                        initialValue.palletNo = val;

                        const newUser = new PalletUser(initialValue);
                        try {
                          newUser.save();
                          User.find({}, (err, userX) => {
                            if (userX) {
                              var val;
                              val = userX[0].productionId;
                              val = parseInt(val) + 1;
                              val = val.toString();
                              user.productionId = "100001";
                              user.tareWeight =
                                user.grossWeight - user.netWeight;
                              user.trackNo = "100000";
                              user.palletNo = initialValue.palletNo;
                              const newUserx = new User(user);
                              try {
                                newUserx.save();
                                response.status(201).json(newUser);
                              } catch (error) {
                                response
                                  .status(409)
                                  .json({ message: error.message });
                              }
                            }
                          })
                            .sort({ _id: -1 })
                            .limit(1);
                        } catch (error) {
                          response.status(409).json({ message: error.message });
                        }
                      }
                    })
                      .sort({ _id: -1 })
                      .limit(1);
                  }
                }
              );
            }
          }
        );
      }
    }
  )
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
  user.tareWeight = user.grossWeight - user.netWeight;
  user.tareWeight = user.tareWeight.toString();
  var val;
  user.trackNo <= "199999"
    ? (val = parseInt(user.trackNo) + 1)
    : (val = "100000");
  user.trackNo = val;
  console.log(user);

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
