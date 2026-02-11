(function () {
    var MIN_QUERY_LENGTH = 2;
    var MAX_RESULTS = 8;
    var SEARCH_INDEX_URL = "/index.json";
    var searchInstances = [];
    var fuse;
    var indexRequest;

    function normalizeItem(item) {
        return {
            title: item.title || "Untitled",
            permalink: item.permalink || "/",
            summary: item.summary || "",
            content: item.content || "",
            tags: Array.isArray(item.tags) ? item.tags : [],
            section: item.section || "",
            type: item.type || "",
            date: item.date || ""
        };
    }

    function loadSearchIndex() {
        if (fuse) {
            return Promise.resolve(fuse);
        }

        if (indexRequest) {
            return indexRequest;
        }

        indexRequest = fetch(SEARCH_INDEX_URL)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Failed to load search index: " + response.status);
                }
                return response.json();
            })
            .then(function (items) {
                var docs = Array.isArray(items) ? items.map(normalizeItem) : [];
                fuse = new Fuse(docs, {
                    includeScore: true,
                    ignoreLocation: true,
                    threshold: 0.35,
                    minMatchCharLength: 2,
                    keys: [
                        { name: "title", weight: 0.45 },
                        { name: "summary", weight: 0.25 },
                        { name: "content", weight: 0.2 },
                        { name: "tags", weight: 0.1 }
                    ]
                });
                return fuse;
            })
            .catch(function (error) {
                console.error(error);
                indexRequest = null;
                throw error;
            });

        return indexRequest;
    }

    function closeResults(instance) {
        instance.results.hidden = true;
        instance.results.innerHTML = "";
    }

    function openResults(instance) {
        instance.results.hidden = false;
    }

    function resultMeta(item) {
        var bits = [];
        if (item.section) {
            bits.push(item.section);
        }
        if (item.date) {
            bits.push(item.date);
        }
        return bits.join(" • ");
    }

    function createResultLink(item) {
        var link = document.createElement("a");
        link.className = "site-search-hit";
        link.href = item.permalink;

        var title = document.createElement("span");
        title.className = "site-search-hit-title";
        title.textContent = item.title;
        link.appendChild(title);

        var metaText = resultMeta(item);
        if (metaText) {
            var meta = document.createElement("span");
            meta.className = "site-search-hit-meta";
            meta.textContent = metaText;
            link.appendChild(meta);
        }

        if (item.summary) {
            var summary = document.createElement("span");
            summary.className = "site-search-hit-summary";
            summary.textContent = item.summary;
            link.appendChild(summary);
        }

        return link;
    }

    function setMessage(instance, message) {
        instance.results.innerHTML = "";
        var container = document.createElement("div");
        container.className = "site-search-state";
        container.textContent = message;
        instance.results.appendChild(container);
        openResults(instance);
    }

    function renderResults(instance, items, query) {
        instance.results.innerHTML = "";

        if (!items.length) {
            setMessage(instance, 'No results for "' + query + '"');
            return;
        }

        var list = document.createElement("ul");
        list.className = "site-search-list";

        items.forEach(function (item) {
            var row = document.createElement("li");
            row.className = "site-search-item";
            row.appendChild(createResultLink(item));
            list.appendChild(row);
        });

        instance.results.appendChild(list);
        openResults(instance);
    }

    function runSearch(instance) {
        var query = instance.input.value.trim();
        if (query.length < MIN_QUERY_LENGTH) {
            closeResults(instance);
            return;
        }

        var querySnapshot = query;
        loadSearchIndex()
            .then(function (searchEngine) {
                if (instance.input.value.trim() !== querySnapshot) {
                    return;
                }
                var matches = searchEngine.search(querySnapshot, { limit: MAX_RESULTS });
                var items = matches.map(function (match) {
                    return match.item;
                });
                renderResults(instance, items, querySnapshot);
            })
            .catch(function () {
                setMessage(instance, "Search is temporarily unavailable.");
            });
    }

    function attachSearch(root) {
        var input = root.querySelector("[data-search-input]");
        var results = root.querySelector("[data-search-results]");

        if (!input || !results) {
            return;
        }

        var instance = {
            root: root,
            input: input,
            results: results
        };
        searchInstances.push(instance);

        input.addEventListener("focus", function () {
            loadSearchIndex().catch(function () {});
            if (input.value.trim().length >= MIN_QUERY_LENGTH) {
                runSearch(instance);
            }
        });

        input.addEventListener("input", function () {
            runSearch(instance);
        });

        input.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeResults(instance);
                input.blur();
            }
        });
    }

    function initializeSearch() {
        if (typeof Fuse === "undefined") {
            console.error("Fuse.js did not load.");
            return;
        }

        var roots = document.querySelectorAll("[data-search]");
        roots.forEach(function (root) {
            attachSearch(root);
        });

        document.addEventListener("click", function (event) {
            searchInstances.forEach(function (instance) {
                if (!instance.root.contains(event.target)) {
                    closeResults(instance);
                }
            });
        });
    }

    document.addEventListener("DOMContentLoaded", initializeSearch);
})();
