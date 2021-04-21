import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.js'
import User from "../models/userModel.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        avatar: user.avatar
    })
  } else{
      res.status(401)
      throw new Error ('Email o contraseña inválida.')
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body

  const userExists = await User.findOne({ email })

  if(userExists) {
    res.status(400)
    throw new Error('El usuario ya existe.')
  }

  const user = await User.create({
      name,
      email,
      password,
      avatar
  })

  if(user){
      res.status(201).json({

        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        avatar: user.avatar

      })
  } else{
      res.status(400)
      throw new Error('Datos de usuario inválidos')
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user){
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar
      })
  } else {
    res.status(404)
    throw new Error('Usuario no encontrado.')
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user){
     user.name = req.body.name || user.name
     user.email = req.body.email || user.email
     user.avatar = req.body.avatar || user.avatar
     if(req.body.password) {
        user.password = req.body.password
     }

     const updatedUser = await user.save()

     res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
      avatar: updatedUser.avatar
  })
     
  } else {
    res.status(404)
    throw new Error('Usuario no encontrado.')
  }
});

export { authUser, registerUser, getUserProfile, updateUserProfile };
