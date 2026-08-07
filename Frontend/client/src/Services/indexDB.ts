import { openDB } from "idb";

const dbPromise = openDB(
    "devtales-db",
    1,
    {
        upgrade(db) {
            db.createObjectStore(
                "drafts"
            )
        }
    }
)

export async function saveDraft(
    key: string,
    value: string
) {
    const db = await dbPromise;

    await db.put(
        "drafts",
        value,
        key
    );
}

export async function getDraft (
    key: string
) {
    const db = await dbPromise;

    return db.get(
        "drafts",
        key
    );
}