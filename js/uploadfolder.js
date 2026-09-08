async function uploadFolder(files, parentId = null) {

    const folderMap = new Map();

    for (const file of files) {

        const path = file.webkitRelativePath;

        const parts = path.split("/");

        // Remove the file name
        parts.pop();

        let currentParentId = parentId;
        let currentPath = "";


        for (const folderName of parts) {

            currentPath += folderName + "/";


            if (!folderMap.has(currentPath)) {

                const folderId = crypto.randomUUID();


                const folder = {
                    id: folderId,
                    name: folderName,
                    kind: "folder",
                    parentId: currentParentId,
                    createdAt: Date.now()
                };


                await saveFolder(folder);


                folderMap.set(
                    currentPath,
                    folderId
                );

            }


            currentParentId =
                folderMap.get(currentPath);

        }


        await uploadFile(
            file,
            currentParentId
        );

    }

}