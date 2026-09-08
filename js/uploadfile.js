function uploadFile(file, parentId = null) {

    const id = crypto.randomUUID();

    const fileData = {
        id: id,
        name: file.name,
        kind: "file",
        mimeType: file.type,
        size: file.size,
        parentId: parentId,
        createdAt: Date.now()
    };

    const transaction = window.atheriotDB.transaction(
        ["items", "blobs"],
        "readwrite"
    );

    // Save file information
    transaction.objectStore("items").add(fileData);

    // Save actual file
    transaction.objectStore("blobs").add({
        id: id,
        data: file
    });

    transaction.oncomplete = () => {
        console.log("File uploaded:", file.name);
    };

    transaction.onerror = () => {
        console.error(
            "Error uploading file:",
            transaction.error
        );
    };

}