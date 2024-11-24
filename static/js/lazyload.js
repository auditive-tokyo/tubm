export function initializeLazyLoad() {
    return new Promise((resolve) => {
        // ライブラリが読み込まれるのを待つ
        const checkLibrary = setInterval(() => {
            if (window.LazyLoad) {
                clearInterval(checkLibrary);

                window.lazyLoadOptions = [{
                    elements_selector: "img[data-lazy-src],.rocket-lazyload,iframe[data-lazy-src]",
                    data_src: "lazy-src",
                    data_srcset: "lazy-srcset",
                    data_sizes: "lazy-sizes",
                    class_loading: "lazyloading",
                    class_loaded: "lazyloaded",
                    threshold: 300,
                    callback_loaded: function (element) {
                        if (element.tagName === "IFRAME" && element.dataset.rocketLazyload == "fitvidscompatible") {
                            if (element.classList.contains("lazyloaded")) {
                                if (typeof window.jQuery != "undefined") {
                                    if (jQuery.fn.fitVids) {
                                        jQuery(element).parent().fitVids();
                                    }
                                }
                            }
                        }
                    }
                }, {
                    elements_selector: ".rocket-lazyload",
                    data_src: "lazy-src",
                    data_srcset: "lazy-srcset",
                    data_sizes: "lazy-sizes",
                    class_loading: "lazyloading",
                    class_loaded: "lazyloaded",
                    threshold: 300,
                }];

                // 新しいLazyLoadインスタンスを作成
                new window.LazyLoad(window.lazyLoadOptions[0]);
                new window.LazyLoad(window.lazyLoadOptions[1]);

                window.addEventListener('LazyLoad::Initialized', function (e) {
                    const lazyLoadInstance = e.detail.instance;

                    if (window.MutationObserver) {
                        const observer = new MutationObserver(function (mutations) {
                            let image_count = 0;
                            let iframe_count = 0;
                            let rocketlazy_count = 0;

                            mutations.forEach(function (mutation) {
                                for (let i = 0; i < mutation.addedNodes.length; i++) {
                                    if (typeof mutation.addedNodes[i].getElementsByTagName !== 'function') {
                                        continue;
                                    }

                                    if (typeof mutation.addedNodes[i].getElementsByClassName !== 'function') {
                                        continue;
                                    }

                                    const images = mutation.addedNodes[i].getElementsByTagName('img');
                                    const is_image = mutation.addedNodes[i].tagName == "IMG";
                                    const iframes = mutation.addedNodes[i].getElementsByTagName('iframe');
                                    const is_iframe = mutation.addedNodes[i].tagName == "IFRAME";
                                    const rocket_lazy = mutation.addedNodes[i].getElementsByClassName('rocket-lazyload');

                                    image_count += images.length;
                                    iframe_count += iframes.length;
                                    rocketlazy_count += rocket_lazy.length;

                                    if (is_image) {
                                        image_count += 1;
                                    }

                                    if (is_iframe) {
                                        iframe_count += 1;
                                    }
                                }
                            });

                            if (image_count > 0 || iframe_count > 0 || rocketlazy_count > 0) {
                                lazyLoadInstance.update();
                            }
                        });

                        const b = document.getElementsByTagName("body")[0];
                        const config = { childList: true, subtree: true };

                        observer.observe(b, config);
                    }
                }, false);
                resolve();
            }
        }, 100);
    });
}