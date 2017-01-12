var ncmb,Comments,comment;
ons.ready(function() {
	// Nifty Cloud Mobile Backendの接続準備
	ncmb = new NCMB("アプリケーションキー","クライアントキー");
	Comments = ncmb.DataStore("Comments");
    comment = new Comments();
    showComments();
});

// 直近のコメント一覧を表示する
function showComments() {
	document.getElementById("modal").show();
	// リストを初期化
    var list = document.getElementById("timeline");
    var htmlStr = '';
    
    // 直近のコメントから、100件分取得する
    Comments
    .order("createDate", true)
    .fetchAll()
    .then(function (items) {
        // 1件ずつリストに追加する
        items.forEach(function (item) {
            htmlStr += createListItem(item);
		});
		list.innerHTML = htmlStr;
		document.getElementById("modal").hide();
    }, function (err) {
        alert("error:" + JSON.stringify(err));
        document.getElementById("modal").hide();
    });
}

// １件分のメモを表すHTML要素を作成
function createListItem(data) {
	var style = "";
	var clickEvent = "";
	
	// 自分の書き込みだった場合
    if(data.uuid == device.uuid) {
    	style = "color:blue";
    }	
    
    var item = "<ons-list-item modifier='longdivider' class='item' " + clickEvent + ">"
            + "<p class='comment' style='" + style + "'>" + data.comment + "</p>"
        	+ "</ons-list-item>";
    return item;
}

// 追加ボタンを押したときの処理
function showNewPage() {
	document.getElementById("navi").pushPage("new.html");
}

// コメント追加処理
function addComment() {
	// Niftyにデータ登録
    comment.set("comment", document.getElementById("add-comment").value)
    .set("uuid", device.uuid)
    .save(function () {
        showComments();
        document.getElementById("navi").popPage();
    }, function (err) {
        alert("error:" + JSON.stringify(err));
    });
}

