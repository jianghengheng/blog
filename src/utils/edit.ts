import { uploadImg } from "../api/article";


export const onImageUpload = async (files:File, api: { replaceSelection: (arg0: string) => void; }) => {
 const data= await  uploadImg({file:files})
  const url = `/api/${data}`

  const insertedMarkdown =
    `**![](${url})**` +
    `<!--rehype:style=display: flex; justify-content: center; width: 100%; max-width: 500px; margin: auto; margin-top: 4px; margin-bottom: 4px; --></br>`;
  if (!insertedMarkdown) return;

  api.replaceSelection(insertedMarkdown);
};
export const onImageUpload_DnD = async (files: File, setMarkdown: (arg0: (prev: any) => string) => void) => {
  const data= await  uploadImg({file:files})
  const url = `/api/${data}`
  const insertedMarkdown =
    `**![](${url})**` +
    `<!--rehype:style=display: flex; justify-content: center; width: 100%; max-width: 500px; margin: auto; margin-top: 4px; margin-bottom: 4px; --></br>`;
  if (!insertedMarkdown) return;

  setMarkdown((prev: string) => prev + insertedMarkdown);
};

export const extractYouTubeId = (url: string) => {
  const pattern = /(?:https?:\/\/(?:www\.)?)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|u\/\w\/|playlist\?list=)|youtu\.be\/)([^#]{11})/;

  const match = url.match(pattern);

  if (match && match[1]) return match[1];
  return;
};

export const onImageDrop = async (dataTransfer: { items: string | any[]; files: { item: (arg0: number) => any; }; }, setMarkdown: any) => {
  const files = [];

  for (let index = 0; index < dataTransfer.items.length; index++) {
    const file = dataTransfer.files.item(index);
    if (file) files.push(file);
  }

  await Promise.all(
    files.map(async (file) => onImageUpload_DnD(file, setMarkdown))
  );
};


