const cleanSrcInContent = (content) => {
  return content.replace(/src="(\.\.\/)+(.+?)"/g, (match, p1, p2) => {
    if (p2.startsWith('uploads/')) {
      return `src="/${p2}"`;
    } else {
      return `src="/uploads/${p2}"`; 
    }
  });
}

module.exports = {
  cleanSrcInContent
}