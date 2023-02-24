const { db } = require("./firebase");
function leadZero(number) {
    if (number < 10) {
        return "0" + number;
    } else {
        return number;
    }
}
async function fetchProfileInfo(uid) {
    const collection = db.collection("users");
    console.log(uid)
    try {
        const profile = await collection.doc(uid).get();
        const { birthday, ...userData } = profile.data();
        const birthdayDate = new Date(birthday);
        const nextBirthdayDate = `${new Date().getFullYear()}-${leadZero(
            birthdayDate.getMonth() + 1
        )}-${leadZero(birthdayDate.getDay())}`;
        return {
            id: uid,
            birthday: nextBirthdayDate,
            ...userData,
        };
    } catch (e) {
        throw new Error("Error while fetching profile: " + e.message);
    }
}

module.exports = {
    fetchProfileInfo,
};
