let storage = function () {
    function store(key, data) {
        if (arguments > 1) {
            localStorage[key] = JSON.stringify(data);
        }
    }

    function load(key) {
        let data = localStorage.getItem(key);
        return JSON.parse(data);
    }
}