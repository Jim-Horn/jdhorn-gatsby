interface PostTag {
  tag: string;
  friendlyName: string;
}
const consolidatePostTags = (postTags: PostTag[]) => {
  const tags = postTags.map((tag: PostTag) => tag.tag);
  return tags.join(',');
};
export { consolidatePostTags };
