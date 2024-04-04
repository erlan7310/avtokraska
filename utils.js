const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const cleanSrcInContent = (content) => {
  return content.replace(/src="(\.\.\/)+(.+?)"/g, (match, p1, p2) => {
    if (p2.startsWith('uploads/')) {
      return `src="/${p2}"`;
    } else {
      return `src="/uploads/${p2}"`; 
    }
  });
}

const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text;
  }
}

const extractTextFromHTML = (html) => {
  const dom = new JSDOM(html);
  return dom.window.document.body.textContent || "";
}

const calculatePageRange = (currentPage, totalPages) => {
  let startPage, endPage;
  
  if (totalPages <= 4) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 4;
    } else if (currentPage + 1 >= totalPages) {
      startPage = totalPages - 3;
      endPage = totalPages;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 2;
    }
  }
  
  return Array.from({ length: (endPage - startPage) + 1 }, (_, i) => i + startPage);
}

module.exports = {
  cleanSrcInContent,
  formatDate,
  truncateText,
  extractTextFromHTML,
  calculatePageRange
}