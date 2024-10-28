import * as crypto from 'crypto';

export async function getNextId(model: any) {
    let id_find = await model.findOne({id: 0});
    if (!id_find) {
        let init = new model({id: 0, next_id: 2});
        await model.create(init);
        return 1;
    }
    let next_id = id_find.next_id;
    id_find.next_id = next_id + 1;
    await id_find.save();
    return next_id;
}

export async function encodePassword(password: string) {
    let password_encoded = password;
    for (let i=0; i<10; i++)
        password_encoded = crypto.createHash('sha256').update(password_encoded).digest('hex').toString();
    return password_encoded;
}