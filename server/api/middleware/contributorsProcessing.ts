import User from '../models/User.js'

const contributorsOnCreateTrip = async (contributors: string[]) => {
    //array of User documents who's userName appears in the contributors array
    const users = await User.find({ userName: { $in: contributors}})

    //extracting the userNames of those User documents 
    const foundNames = users.map(u => u.userName);

    //handle userNames submitted that are not users
    const missing = contributors.filter(name => !foundNames.includes(name));
    if (missing.length > 0){
        console.warn(`${missing[0]} does not exist as a user of Triply.`)
    }

    const userIds = users.map(u => u._id)
    return userIds;
}

export { contributorsOnCreateTrip };