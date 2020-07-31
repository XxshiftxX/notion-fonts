const changeFont = (selector, font) => {
    const root = $(selector);
    changeDOMFont(root, font);
    
    root.find('div').each(function () {

        changeDOMFont(this, font);
    })
};

const changeDOMFont = (element, font) => {
    const style = $(element).attr('style');
    const fontFamilyRegex = /font-family: ([^;]*);/;

    if (!style || style.includes(font) || !style.match(fontFamilyRegex)) {
        return;
    }
    
    const isCodeblock = $(element).parent().hasClass('notion-code-block');
    if (isCodeblock) font = 'd2coding';

    const applied = style.replace(fontFamilyRegex, `font-family: ${font}, $1;`);
    $(element).attr('style', applied);
};

const addWebFont = (name, url) => {
    if (document.fonts.check(`12px ${name}`)) return;

    const font = new FontFace(name, `url(${url})`);
    font.load();
    document.fonts.add(font);
}

whale.runtime.onMessage.addListener((req, sender, res) => {
    addWebFont('Noto Sans', '//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff');
    addWebFont('Cafe24', 'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Oneprettynight.woff');
    addWebFont('GGB', 'https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/GyeonggiBatang.woff');
    addWebFont('MPLUS', 'https://fonts.gstatic.com/s/mplusrounded1c/v10/VdGEAYIAV6gnpUpoWwNkYvrugw9RuPWDpq8A_4TPv30lLyDK_FIhT0K-oTdprA.16.woff2');

    const fonts = 'GGB, MPLUS, D2Coding'

    document.addEventListener('DOMNodeInserted', (event) => {
        event.path.forEach(element => changeDOMFont(element, fonts));
    });

    let checkExist = setInterval(() => {
        if ($('.notion-page-content').length) {
            changeFont('.notion-page-content', fonts);
            changeFont('.notion-page-block', fonts);
            changeFont('.notion-list-view', fonts);
            changeFont('.notion-collection_view_page-block', fonts);
            clearInterval(checkExist);
        }
        else if ($('.notion-list-view').length) {
            changeFont('.notion-page-content', fonts);
            changeFont('.notion-page-block', fonts);
            changeFont('.notion-list-view', fonts);
            changeFont('.notion-collection_view_page-block', fonts);
        }
        else if ($('.notion-app-inner').length) {
            changeFont('.notion-page-content', fonts);
            changeFont('.notion-page-block', fonts);
            changeFont('.notion-list-view', fonts);
            changeFont('.notion-collection_view_page-block', fonts);
        }
        else if ($('.notion-collection_view_page-block').length) {
            changeFont('.notion-page-content', fonts);
            changeFont('.notion-page-block', fonts);
            changeFont('.notion-list-view', fonts);
            changeFont('.notion-collection_view_page-block', fonts);
        }
    }, 100);

    res({});
});