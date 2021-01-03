type bookmarkInput = {
  id: string,
  parentId: option(string),
  index: option(int),
  dateAdded: int,
  title: string,
  url: option(string),
  dateGroupModified: option(int),
  children: option(list(bookmarkInput)),
};

type bookmarkOutput = {
  id: string,
  title: string,
  url: string,
};

module Decode = {
  let rec bookmarkInput = json => Json.Decode.{
    id: json |> field("id", string),
    parentId: json |> optional(field("parentId", string)),
    index: json |> optional(field("index", int)),
    dateAdded: json |> field("dateAdded", int),
    title: json |> field("title", string),
    url: json |> optional(field("url", string)),
    dateGroupModified: json |> optional(field("dateGroupModified", int)),
    children: json |> optional(field("children", list(bookmarkInput))),
  };

  let all = Json.Decode.array(bookmarkInput);
};

module Encode = {
  let bookmarkOutput = (b) => {
    Json.Encode.(
      object_([
        ("id", string(b.id)),
        ("title", string(b.title)),
        ("url", string(b.url)),
      ])
    );
  };

  let all = Json.Encode.array(bookmarkOutput);
};

let rec parseBookmarkTree = (bookmarks) => {
  List.fold_left((output, currentBookmarkTree) => {
    let childBookmarks = ref([]);

    switch currentBookmarkTree.children {
    | None => { childBookmarks := []; };
    | Some(children) => { childBookmarks := children; };
    };
  
    switch ((List.length(childBookmarks^), currentBookmarkTree.url)) {
    | (0, None) => output
    | (0, Some(url)) => output @ [{ id: currentBookmarkTree.id, title: currentBookmarkTree.title, url }]
    | (_, None) => output @ parseBookmarkTree(childBookmarks^)
    | (_, Some(url)) => output @ [{ id: currentBookmarkTree.id, title: currentBookmarkTree.title, url }] @ parseBookmarkTree(childBookmarks^)
    };
  }, [], bookmarks);
};

let processBookmarks = (bookmarksJson) => {
  let bookmarksList: list(bookmarkInput) = bookmarksJson
  |> Json.parseOrRaise
  |> Decode.all
  |> Array.to_list;

  let bookmarks = parseBookmarkTree(bookmarksList);

  bookmarks |> Array.of_list |> Encode.all;
};
