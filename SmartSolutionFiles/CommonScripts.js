function downloadFromUrl(url, filename) {
    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = filename ?? '';
    //anchorElement.target = '_top';
    anchorElement.click();
    anchorElement.remove();
}

function setBodyClassArabic() {
    document.body.classList.toggle("changeAr")



}