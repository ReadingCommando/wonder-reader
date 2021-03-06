// Page turning engine 2.0

const turnPage = (
  currentPageIndex,
  centerfolds,
  pageCount,
  pagesLength,
  polarity,
  cb
) => {
  // centerfolds for singlePaging ( [2, 5, 11]  )
  // currentPageIndex for currentPage, which will make a new var newPageIndex ( Num )
  // pageCount for number of pages turned ( 2 || 1 )
  // pagesLength for full comic scope ( 18 )
  // polarity for left or right ( 1 || -1 )

  const isCenterfold = index => centerfolds.includes(index);

  let newPageIndex = null;
  let pagesToDisplay = null;

  if (currentPageIndex + pageCount * polarity >= pagesLength - 1) {
    newPageIndex = pagesLength - 1;
    pagesToDisplay = 1;
  } else if (currentPageIndex + pageCount * polarity < 0) {
    newPageIndex = 0;
    pagesToDisplay = isCenterfold(0) || isCenterfold(1) ? 1 : 2;
  } else if (pageCount === 1) {
    newPageIndex = currentPageIndex + polarity;
    pagesToDisplay = 1;
  } else if (polarity > 0) {
    if (isCenterfold(currentPageIndex)) {
      newPageIndex = currentPageIndex + 1;
      pagesToDisplay =
        isCenterfold(currentPageIndex + 1) || isCenterfold(currentPageIndex + 2)
          ? 1
          : 2;
    } else if (isCenterfold(currentPageIndex + 1)) {
      newPageIndex = currentPageIndex + 1;
      pagesToDisplay = 1;
    } else if (
      isCenterfold(currentPageIndex + 2) ||
      isCenterfold(currentPageIndex + 3)
    ) {
      newPageIndex = currentPageIndex + 2;
      pagesToDisplay = 1;
    } else {
      newPageIndex = currentPageIndex + 2;
      pagesToDisplay = 2;
    }
  } else if (
    isCenterfold(currentPageIndex - 1) ||
    isCenterfold(currentPageIndex - 2)
  ) {
    newPageIndex = currentPageIndex - 1;
    pagesToDisplay = 1;
  } else {
    newPageIndex = currentPageIndex - 2;
    pagesToDisplay = 2;
  }

  // one last check if a single edge case with ( 2 === pagesToDisplay ) with a single page view;
  pagesToDisplay = Math.min(pagesToDisplay, pageCount);
  cb(newPageIndex, pagesToDisplay);
};

export default turnPage;
