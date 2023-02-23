const { db } = require("./firebase");
function leadZero(number) {
    if (number < 10) {
        return "0" + number;
    } else {
        return number;
    }
}
async function fetchAllBirthdays(uid) {
    const collection = db.collection("users");
    try {
        const snapshot = await collection.get();
        const users = snapshot.docs.map((user) => {
            const { birthday, ...userData } = user.data();
            const birthdayDate = new Date(birthday);
            const nextBirthdayDate = `${new Date().getFullYear()}-${leadZero(
                birthdayDate.getMonth() + 1
            )}-${leadZero(birthdayDate.getDay())}`;
            return {
                id: user.id,
                birthday: nextBirthdayDate,
                ...userData,
            };
        });

        return users;
    } catch (e) {
        throw new Error("Error while fetching birthdays: " + e.message);
    }
}

module.exports = {
    fetchAllBirthdays,
};
