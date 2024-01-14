const consolidatePostTags = (postTags: any) => {
  const tags = postTags.map((tag: any) => tag.tag);
  return tags.join(',');
};
export { consolidatePostTags };
