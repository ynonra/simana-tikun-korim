export function validatePageNumber(pageNumber) {
  return pageNumber > 245 ? 245 : pageNumber < 1 ? 1 : pageNumber;
}
