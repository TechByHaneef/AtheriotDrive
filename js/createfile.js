function createFile(name, parentId = null) {

    const id = crypto.randomUUID();

    const file = {
        id: id,
        name: name,
        kind: "file",
        mimeType: "text/plain",
        size: 0,
        parentId: parentId,
        createdAt: Date.now()
    };

    const transaction = window.atheriotDB.transaction(
        ["items", "blobs"],
        "readwrite"
    );

    // Save file information
    transaction.objectStore("items").add(file);

    // Create and save empty file content
    transaction.objectStore("blobs").add({
        id: id,
        data: new Blob(
            [""],
            {
                type: "text/plain"
            }
        )
    });

    transaction.oncomplete = () => {
        console.log("File created:", name);
    };

    transaction.onerror = () => {
        console.error("Error creating file");
    };

}