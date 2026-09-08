function uploadPhotos(files, parentId = null) {

    const imageFiles = Array.from(files).filter(
        file => file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {

        console.log("No photos selected");

        return;
    }


    for (const file of imageFiles) {

        uploadFile(
            file,
            parentId
        );

    }


    console.log(
        imageFiles.length +
        " photo(s) uploaded"
    );

}