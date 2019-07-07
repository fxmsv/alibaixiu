module.exports = async (req, res) => {
	if (req.session && req.session.userInfo && req.session.userInfo.role == 'admin') {
		const s = `var isLogin = true; var userId=\"${req.session.userInfo._id}\"; var role= "admin"`
		res.send(s)
	} else if (req.session && req.session.userInfo && req.session.userInfo.role == 'normal') {
		const s = `var isLogin = true; var userId=\"${req.session.userInfo._id}\"; var role= "normal"`
		res.send(s)
	} else {
		res.send('var isLogin = false')
	}
};
