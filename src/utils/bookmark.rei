type bookmarkInput;
type bookmarkOutput;

let parseBookmarkTree: list(bookmarkInput) => list(bookmarkOutput);
let processBookmarks: string => Js.Json.t;
