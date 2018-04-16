
export default function showDialog(dialogEl) {
    $(dialogEl).modal("show");

    return new Promise((res, reject) => {
        dialogEl.querySelector(".modal-footer > .yes").addEventListener("click", res);
        dialogEl.querySelector(".modal-footer > .no").addEventListener("click", reject);
    });
}
