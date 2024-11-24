export function coolTagCloudToggle(element) {
    const parent = element.closest('.cool-tag-cloud');
    parent.querySelector('.cool-tag-cloud-inner').classList.toggle('cool-tag-cloud-active');
    parent.querySelector('.cool-tag-cloud-load-more').classList.toggle('cool-tag-cloud-active');
}
