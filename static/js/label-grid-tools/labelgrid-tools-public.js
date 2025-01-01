export function initializeLabelGridTools($) {
  "use strict";

  var loadedga = null;
  var loadedfbq = null;
  var loadedgtag = null;

  if (typeof ga === "function") loadedga = true;
  if (typeof gtag === "function") loadedgtag = true;
  if (typeof fbq === "function") loadedfbq = true;

  // Analytics for links
  $("#releaselinks").on("click", ".linkTop A", function (e) {
    if (loadedga && typeof $(this).data("service") != "undefined")
      ga(getGa("send"), {
        hitType: "event",
        eventCategory: "link-service",
        eventAction: $(this).attr("href"),
        eventLabel: $(this).data("service"),
      });
    if (loadedgtag && typeof $(this).data("service") != "undefined")
      gtag("event", "link-service", {
        action: $(this).attr("href"),
        service: $(this).data("service"),
      });
    if (loadedfbq && typeof $(this).data("service") != "undefined")
      fbq("trackCustom", "ServiceLinkClick", {
        service: $(this).data("service"),
        toUrl: $(this).attr("href"),
        release: $(location).attr("href"),
      });
  });

  // Release list search filter
  $("#lg_release_filter_genre").on("change", function () {
    document.getElementById("lg_release_list_filter").submit();
  });

  $("#lg_release_filter_record_label").on("change", function () {
    document.getElementById("lg_release_list_filter").submit();
  });
}

function getGa(name) {
  if (typeof ga.getAll === "function") {
    var trackers = ga.getAll();
    var firstTracker = trackers[0];
    if (typeof firstTracker !== "undefined") {
      var trackerName = firstTracker.get("name");
      return trackerName + "." + name;
    } else {
      return name;
    }
  } else {
    return name;
  }
}

var iTunesLiveTile = {
  _callback: function () { },
  _fullUrl: function (id, langCode) {
    var SEARCH_URL_PRE = "https://itunes.apple.com/lookup?id=";
    var SEARCH_URL_POST =
      "&country=" + langCode + "&callback=iTunesLiveTile._prepareData";
    return SEARCH_URL_PRE + id + SEARCH_URL_POST;
  },
  get: function (id, langCode, callback) {
    _callback = callback;
    jQuery.getScript(this._fullUrl(id, langCode));
  },
  _prepareData: function (data) {
    var item = data.results[0];
    _callback(item);
  },
};
