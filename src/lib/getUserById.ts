export default async function getUserById(userId: number) {


    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    // if (!res.ok) throw new Error('faild to fetch the data');
    if (!res.ok) return undefined;

    return res.json();
}