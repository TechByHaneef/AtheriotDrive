function createFolder(name, parentId = null) {

    const folder = {
        id: crypto.randomUUID(),
        name: name,
        kind: "folder",
        parentId: parentId,
        createdAt: Date.now()
    };

    const transaction = window.atheriotDB.transaction(
        "items",
        "readwrite"
    );

    const store = transaction.objectStore("items");

    store.add(folder);

    transaction.oncomplete = () => {
        console.log("Folder created:", name);
    };

    transaction.onerror = () => {
        console.error("Error creating folder");
    };

}