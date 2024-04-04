import { useEffect, useState } from "react";

// This is seperate code for Adding Images
interface FileDragDrop {
  image?: File;
  setimage: (value: File) => void;
}

const FileDragDrop: React.FC<FileDragDrop> = ({ image, setimage }) => {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [isDragging, setIsDragging] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [fileReader, setFileReader] = useState<FileReader>();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Instantiate the FileReader on the client side after DOM is hydrated
    if (!fileReader && typeof window !== "undefined") {
      setFileReader(new FileReader());
    }
    setImgError(imgError);
  }, [fileReader]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      e.relatedTarget === undefined ||
      e.currentTarget.contains(e.relatedTarget as Node)
    ) {
      return;
    }

    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const newFile = e.dataTransfer.files[0];
    const fileExtension = newFile.name.split(".").pop()?.toLowerCase();

    if (/^image\//.test(newFile.type)) {
      setUploadedFile(newFile);
      setimage(newFile);
    } else {
      alert("Invalid file format. Only image files are accepted.");
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const newFile = (e.target as HTMLInputElement).files?.[0];
      if (newFile && /^image\//.test(newFile.type)) {
        setUploadedFile(newFile);
        setimage(newFile);
        if (fileReader) {
          fileReader.onload = (event: any) => {
            if (event.target) {
              if (typeof event.target.result === "string") {
                setImageSrc(event.target.result);
              }
            }
          };
          fileReader.readAsDataURL(newFile);
        }
      } else {
        alert("Invalid file format. Only image files are accepted.");
      }
    };
    input.click();
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border dark:border-2 sm:text-lg dark:bg-slate-800 border-opacity-50 border-black text-base rounded-xl cursor-pointer w-auto min-h-[10rem] flex items-center justify-center flex-col flex-nowrap dark:text-white  dark:border-white dark:border-opacity-[0.35] rounded-xl-lg `}
    >
      {uploadedFile && (
        <div>You can drop another image to replace the older one</div>
      )}
      {imageSrc && (
        <img src={imageSrc} alt="Selected Image" height={400} width={400} />
      )}
      {uploadedFile ? (
        <div> {`${uploadedFile.name}`} </div>
      ) : (
        "Click or drag and drop your image here"
      )}
    </div>
  );
};

export default FileDragDrop;
