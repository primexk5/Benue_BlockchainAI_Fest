const { User } = require('../models');


async function getAllUsers(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          total: count,
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (err) {
    console.error('[AdminController] getAllUsers error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch users.',
    });
  }
}



async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error('[AdminController] getUserById error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user.',
    });
  }
}


async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found.`,
      });
    }

    await user.destroy();

    return res.status(200).json({
      success: true,
      message: `User with ID ${id} has been successfully deleted.`,
    });
  } catch (err) {
    console.error('[AdminController] deleteUser error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete user.',
    });
  }
}

module.exports = { 
  getAllUsers,
  getUserById,
  deleteUser 
};
