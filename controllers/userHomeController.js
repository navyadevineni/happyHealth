const db = require('../database');

exports.getUserHome = (req, res) => {
    let userId = req.session.userId;
    const homeQuery = `Select * from happyhealth.usermetricstbl where UserId = ${userId};`;
    db.query(homeQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result, '--------db userMetrics table result');
            const { stepCount, sleepHours, water, meTime, fruits, veggies } = result[0];
            res.render('userViews/userHome', {
                layout: 'layouts/userLayout', title: 'User Home',
                stepCount, sleepHours, water, meTime, fruits, veggies
            });
        }
    });


};


exports.getUserStep = (req, res) => {
    res.render('userViews/userStep', { layout: 'layouts/userLayout', title: 'User Step' });
};

exports.postUserStep = (req, res) => {
    const userId = req.session.userId;
    const { num_steps, goal } = req.body;
    let errors;
    if (!num_steps || !goal) {
        console.log(`inside if statement ${num_steps}`);
        errors = 'Please enter all fields';
        res.render('userViews/userStep', { layout: 'layouts/userLayout', title: 'User Step', errors });
    }
    var stepQuery = `UPDATE happyhealth.usermetricstbl SET stepCount = ${num_steps}, stepGoal = ${goal} WHERE userId = ${userId};`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });

};


exports.getUserSleep = (req, res) => {
    res.render('userViews/userSleep', { layout: 'layouts/userLayout', title: 'User Sleep' });

};

exports.postUserSleep = (req, res) => {
    let userId = req.session.userId;
    const { num_hours, goal } = req.body;
    console.log(`inside post user sleep`);
    let errors;
    if (!num_hours || !goal) {
        console.log(`inside if statement ${num_hours}`);
        errors = 'Please enter all fields';
        res.render('userViews/userSleep', { layout: 'layouts/userLayout', title: 'User Sleep' });
    }
    var stepQuery = `UPDATE happyhealth.usermetricstbl
        SET sleepHours = ${num_hours}, sleepGoal = ${goal} WHERE userId = ${userId};`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });

};

exports.getUserProfile = (req, res) => {
    res.render('userViews/userProfile', {
        layout: 'layouts/userLayout', title: 'User Profile'
    });
};

exports.postUserProfile = (req, res) => {
    let userId = req.session.userId;
    console.log("profile details " + req.body);
    const { name, Gender, dob, age, email, currentWeight, desiredWeight, height, myList, country, state } = req.body;
    console.log(`details` + name);
    let errors;
    if (!name || !Gender || !dob || !age || !email || !currentWeight || !desiredWeight || !height || !myList || !country || !state) {
        console.log(`inside if statement ${currentWeight}`);
        errors = 'Please enter all fields';
        res.render('userSleep', { errors });
    }
    const profileQuery = `UPDATE happyhealth.usertbl
        SET email = '${email}', fullName = '${name}',averageActivityLevel='${myList}',gender='${Gender}',dateOfBirth='${dob}',age='${age}',
        currentWeight='${currentWeight}',desiredWeight='${desiredWeight}',height='${height}',country='${country}',state='${state}'
        WHERE userId = '${userId}';`;
    db.query(profileQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });

};


exports.getUserHydration = (req, res) => {
    res.render('userViews/userHydration', { layout: 'layouts/userLayout', title: 'User Hydration' });
};

exports.postUserHydration = (req, res) => {
    let userId = req.session.userId;
    const { num_glasses, goal } = req.body;
    console.log(`inside post user hyration`);
    let errors;
    if (!num_glasses || !goal) {
        console.log(`inside if statement ${num_glasses}`);
        errors = 'Please enter all fields';
        res.render('userHydration', { errors });
    }
    var hydrationQuery = `UPDATE happyhealth.usermetricstbl
        SET water = ${num_glasses}, waterGoal = ${goal} WHERE userId = ${userId} ;`;
    db.query(hydrationQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });
};
exports.getUserFruits = (req, res) => {
    res.render('userViews/userFruits', { layout: 'layouts/userLayout', title: 'User Fruits' });
    //res.render("userFruits");
};

exports.getUserVegetables = (req, res) => {
    res.render('userViews/userVegetables', { layout: 'layouts/userLayout', title: 'User Vegetables' });
};



exports.getUserChallenges = (req, res) => {
    res.render('userViews/userChallenges', {
        layout: "layouts/userLayout",
        title: "User Management"
    });
};


exports.getUserMoreChallenges = (req, res) => {
    res.render('userViews/user_more_challenges', {
        layout: "layouts/userLayout",
        title: "User Management"
    });
};


exports.getUserTrack = (req, res) => {
    res.render('userViews/userTrack', { layout: 'layouts/userLayout', title: 'User Track' });
};

/*exports.postUserTrack = (req, res) => {
    let userId = req.session.userId;
    const { meditation, goal } = req.body;
    console.log(`inside post user track`);
    let errors;
    console.log(meditation, goal);
    if (!meditation || !goal) {
        console.log(`inside if statement ${meditation}`);
        errors = 'Please enter all fields';
        res.render('userViews/userTrack', { layout: 'layouts/userLayout', title: 'User Track'});
    }
    var stepQuery = `UPDATE happyhealth.usermetricstbl
        SET meTime = ${meditation}, meTimeGoal = ${goal} WHERE userId = ${userId};`;
    db.query(stepQuery, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/userHome');
        }
    });

}; */


// exports.getUserVegetables = (req, res) => {
//     res.render("userVegetables");
// };


