"use strict";
var input = $("#input");
var output = $("#output");
// set highlight
marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});
function render() {
    var dirty = marked(input.val());
    // sanitize the output HTML
    var clean = DOMPurify.sanitize(dirty);
    output.html(clean);
}
$(input).on("keyup paste", function () { return render(); });
$(window).on("load", function () {
    var data = localStorage.getItem("markdown-text");
    if (data == null) {
        return;
    }
    input.val(data);
    render();
});
$(window).on("unload", function () {
    var text = input.val();
    localStorage.setItem("markdown-text", text);
});
$("#btn-copy").on("click", function () {
    /* Select the text field */
    input.trigger("select");
    /* Copy the text inside the text field */
    document.execCommand("copy");
});
