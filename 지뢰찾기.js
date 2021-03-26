document.querySelector('#exec').addEventListener('click', function () {
    var col = parseInt(document.querySelector('#hor').value);
    var row = parseInt(document.querySelector('#ver').value);
    var mineCount = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

    // 지뢰위치 뽑기
    var mine = Array(row*col).fill()
        .map(function (element, index) {
        return index;
    });
    var bumb = [];
    while (mine.length > 80) {
        var moveValue = mine.splice(Math.floor(Math.random() * mine.length), 1)[0];
        bumb.push(moveValue);
    }

    // 지뢰테이블 만들기
    var dataset = [];
    var tbody = document.querySelector('#table tbody');
    for (var i = 0; i < row; i += 1) {
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for (var j = 0; j < col; j += 1) {
            arr.push(1);
            var td = document.createElement('td');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    console.log(dataset);

    // 지뢰심기기
    for (var k = 0; k < bumb.length; k += 1) { // 예 60 -> 7번째줄 0번째칸
        var bumbRow = Math.floor(bumb[k] / 10);   // 예 6(=실제로는 7번째 줄)
        var bumbCol = bumb[k] % 10; // 예 0(=실제로는 0번째 칸)

        // tbody의 자식태그에 접근가능(처음children은 tr 두번째 children은 td)
        tbody.children[bumbRow].children[bumbCol].textContent = 'X'; // 화면
        dataset[bumbRow][bumbCol] = 'X'; // 따로 관리하는 2차원배열
    }
})