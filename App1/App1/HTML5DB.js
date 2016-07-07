var HTML5DB = {};
HTML5DB.indexedDB = {};
HTML5DB.indexedDB.db = null;

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

HTML5DB.indexedDB.onerror = function (e) { console.log(e); };

HTML5DB.indexedDB.open = function () {

    var version = 1;
    var request = window.indexedDB.open("db_example", version);

    request.onupgradeneeded = function (e) {

        var db = e.target.result;
        e.target.transaction.onerror = HTML5DB.indexedDB.onerror;
        var store = db.createObjectStore("object_store", { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = function (e) {
        HTML5DB.indexedDB.db = e.target.result;
        $('#lblMessages').innerHTML = 'Operation OK';
        HTML5DB.indexedDB.getAllRecords();
    };

    request.onerror = HTML5DB.indexedDB.onerror;
};

HTML5DB.indexedDB.addRecord = function (value) {

    var db = HTML5DB.indexedDB.db;
    var trans = db.transaction(["object_store"], "readwrite");
    var store = trans.objectStore("object_store");

    var data = {
        "value": value,
        "timeStamp": new Date($.now()).toLocaleTimeString()
    };

    var request = store.put(data);

    request.onsuccess = function (e) {
        HTML5DB.indexedDB.getAllRecords();
    };

    request.onerror = function (e) {
        console.log("Error Adding: ", e);
    };
};

HTML5DB.indexedDB.deleteRecord = function (id) {
    var db = HTML5DB.indexedDB.db;
    var trans = db.transaction(["object_store"], "readwrite");
    var store = trans.objectStore("object_store");

    var request = store.delete(id);

    request.onsuccess = function (e) {
        HTML5DB.indexedDB.getAllRecords();
    };

    request.onerror = function (e) {
        console.log("Error deleting: ", e);
    };
};

HTML5DB.indexedDB.getAllRecords = function () {

    $('#dbRecords tr').remove();

    var db = HTML5DB.indexedDB.db;
    var trans = db.transaction(["object_store"], "readwrite");
    var store = trans.objectStore("object_store");

    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = store.openCursor(keyRange);

    cursorRequest.onsuccess = function (e) {
        var result = e.target.result;
        if (!!result == false)
            return;

        renderRecord(result.value);
        result.continue();
    };

    cursorRequest.onerror = HTML5DB.indexedDB.onerror;
};

function renderRecord(record) {

    $("#dbRecords").find('tbody')
        .append($('<tr style="border:1px solid #000;border-collapse:collapse;">')
            .append($('<td style="border:1px solid #000;border-collapse:collapse;padding:8px;">')
                .append($('<span>')
                    .html(record.value)
                )
            )
            .append($('<td style="border:1px solid #000;border-collapse:collapse;padding:8px;">')
                .append($('<span>')
                    .html(record.timeStamp)
                )
            )
            .append($('<td style="border:1px solid #000;border-collapse:collapse;padding:8px;">')
                .append($('<a>')
                    .attr('href', 'javascript:HTML5DB.indexedDB.deleteRecord(' + record.id + ')')
                    .html('Delete')
            )
        ));
}

function addRecord() {

    var record = document.getElementById("txtRecordValue");
    HTML5DB.indexedDB.addRecord(record.value);
    record.value = "";
}

function openDB() {
    HTML5DB.indexedDB.open();
}

function getData() {

    $.ajax({
        url: "application.aspx/getData",
        type: "POST",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (json) {

            var records = json.d.Data.records;

            for (var i = 0; i < records.length; i++) {

                $('#dbRecords tr').remove();
                HTML5DB.indexedDB.addRecord(records[i].Data.value);
            }
        },
        error: function (e) {
            alert('ERROR: ' + e.status + ' : ' + e.statusText);
        }
    });
}
