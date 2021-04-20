import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Ro',
        email: 'ro@example.com',
        password: bcrypt.hashSync('123456', 10),
        avatar: "ejemplo"
    },
    {
        name: 'Yoli',
        email: 'yoli@example.com',
        password: bcrypt.hashSync('123456', 10),
        avatar: "ejemplo"
    },
]

export default users