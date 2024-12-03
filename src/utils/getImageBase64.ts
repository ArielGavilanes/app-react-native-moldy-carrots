// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getImageBase64(image: any) {
  const buffer = image;
  return 'data:image;base64,' + buffer;
}
