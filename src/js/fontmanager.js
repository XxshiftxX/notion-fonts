const changeFont = (selector, font) => {
  $(selector).css('font-family', font);
  $(selector).find('div').each(function () {
    const style = $(this).attr('style');
    if (!style || style.includes(font)) {
      return;
    }
    const fontFamilyRegex = /font-family: ([^;]*);/;
    if (!style.match(fontFamilyRegex)) {
      return;
    }
    const applied = style.replace(fontFamilyRegex, `font-family: ${font}, $1`);
    $(this).attr('style', applied);
    $(this).change(function () { $(this).attr('style', applied); });
  })
}

const addWebFont = (name, url) => {
  const font = new FontFace(name, `url(${url})`);
  font.load();
  document.fonts.add(font);
}

whale.runtime.onMessage.addListener((req, sender, res) => {
  addWebFont('Noto Sans', '//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff');
  addWebFont('Cafe24', 'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Oneprettynight.woff');
  addWebFont('GGB', 'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/GyeonggiBatang.woff');
  addWebFont('MPLUS', 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap');


  let checkExist = setInterval(() => {
    if ($('.notion-page-content').length) {
      changeFont('.notion-page-content', 'GGB, MPLUS, D2Coding');
      changeFont('.notion-page-block', 'GGB, MPLUS, D2Coding');
      changeFont('.notion-collection_view_page-block', 'GGB, MPLUS, D2Coding');
      clearInterval(checkExist);
    }
    else if ($('.notion-collection_view_page-block').length) {
      changeFont('.notion-collection_view_page-block', 'GGB, MPLUS, D2Coding');
    }
  }, 100);
});