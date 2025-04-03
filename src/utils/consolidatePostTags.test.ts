import { consolidatePostTags } from './consolidatePostTags';

describe('consolidatePostTags', () => {
  it('joins tag names with commas', () => {
    const tags = [
      { tag: 'javascript', friendlyName: 'JavaScript' },
      { tag: 'react', friendlyName: 'React' },
      { tag: 'typescript', friendlyName: 'TypeScript' }
    ];
    
    const result = consolidatePostTags(tags);
    expect(result).toBe('javascript,react,typescript');
  });

  it('returns an empty string for empty array', () => {
    const result = consolidatePostTags([]);
    expect(result).toBe('');
  });

  it('returns a single tag for a single-item array', () => {
    const tags = [{ tag: 'gatsby', friendlyName: 'Gatsby' }];
    
    const result = consolidatePostTags(tags);
    expect(result).toBe('gatsby');
  });

  it('ignores friendlyName and only uses tag property', () => {
    const tags = [
      { tag: 'javascript', friendlyName: 'JS' }, // friendlyName doesn't match tag
      { tag: 'react', friendlyName: 'React.js' } // friendlyName doesn't match tag
    ];
    
    const result = consolidatePostTags(tags);
    expect(result).toBe('javascript,react');
  });
});
